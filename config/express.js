'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs-extra'),
	http = require('http'),
	https = require('https'),
	express = require('express'),
	morgan = require('morgan'),
	logger = require('./logger'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	compression = require('compression'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	multer = require('multer'),
	passport = require('passport'),
	raven = require('raven'),
	MongoStore = require('connect-mongo')(session),
	flash = require('connect-flash'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path'),
	device = require('express-device'),
	client = new raven.Client(config.DSN);

/**
 * Configure Socket.io
 */
var configureSocketIO = function (app, db) {
	// Load the Socket.io configuration
	var server = require('./socket.io')(app, db);

	// Return server object
	return server;
};

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.google_analytics_id = config.app.google_analytics_id;
	app.locals.title = config.app.title;
	app.locals.signupDisabled = config.signupDisabled;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.socketPort = config.socketPort;

	app.locals.bowerJSFiles = config.getBowerJSAssets();
	app.locals.bowerCssFiles = config.getBowerCSSAssets();
	app.locals.bowerOtherFiles = config.getBowerOtherAssets();

	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();

    //Setup Prerender.io
    app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		if(config.baseUrl === ''){
			config.baseUrl = req.protocol + '://' + req.headers.host;
		}
	    res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compression({
		// only compress files for the following content types
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		// zlib option for compression level
		level: 3
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Enable logger (morgan)
	app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');


	// Setting the app router and static folder
	app.use('/', express.static(path.resolve('./public')));
	app.use('/uploads', express.static(path.resolve('./uploads')));

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: new MongoStore({
	      mongooseConnection: db.connection,
	      collection: config.sessionCollection
	    }),
		cookie: config.sessionCookie,
		name: config.sessionName
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// setup express-device
	app.use(device.capture({ parseUserAgent: true }));

	// connect flash for flash messages
	app.use(flash());

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});


	// Add headers for Sentry

	app.use(function (req, res, next) {

	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', 'https://sentry.polydaic.com');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);

	    // Pass to next layer of middleware
	    next();
	});

	// Sentry (Raven) middleware
	// app.use(raven.middleware.express.requestHandler(config.DSN));

	// Should come before any other error middleware
	// app.use(raven.middleware.express.errorHandler(config.DSN));

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);
		client.captureError(err);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		client.captureError(new Error('Page Not Found'));
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	if (process.env.NODE_ENV === 'secure') {
		// Load SSL key and certificate
		var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
		var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

		// Create HTTPS Server
		var httpsServer = https.createServer({
			key: privateKey,
			cert: certificate
		}, app);

		// Return HTTPS server instance
		return httpsServer;
	}

	app = configureSocketIO(app, db);

	// Return Express server instance
	return app;
};
