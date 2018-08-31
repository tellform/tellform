'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
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
	passport = require('passport'),
	raven = require('raven'),
	MongoStore = require('connect-mongo')(session),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path'),
	client = new raven.Client(config.DSN),
	i18n = require('i18n');

var mongoose = require('mongoose');

/**
 * Configure Socket.io
 */
var configureSocketIO = function (app, db) {
	// Load the Socket.io configuration
	var server = require('./socket.io')(app, db);

	// Return server object
	return server;
};

var supportedLanguages = ['en', 'de', 'fr', 'it', 'es'];

function containsAnySupportedLanguages(preferredLanguages){
	for (var i = 0; i < preferredLanguages.length; i++) {
		var currIndex = supportedLanguages.indexOf(preferredLanguages[i]);
	    if (currIndex > -1) {
	        return supportedLanguages[currIndex];
	    }
	}
	return null;
}

var fs = require('fs')
var https = require('https')
var pkey = fs.readFileSync('/etc/letsencrypt/live/register.earlybird.camp/privkey.pem')
var cert = fs.readFileSync('/etc/letsencrypt/live/register.earlybird.camp/fullchain.pem')

module.exports = function(db) {

	// Initialize express app
	var app = express();
        var serv = https.createServer({key: pkey, cert: cert}, app)
        serv.listen(443)
        app.get('/form', (q, s) => s.redirect('https://register.earlybird.camp/view/#!/forms/5acb2d8e541901c14fa0d907'))
	var url = require('url');

	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.google_analytics_id = config.app.google_analytics_id;
	app.locals.title = config.app.title;
	app.locals.signupDisabled = true; //config.signupDisabled;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;

	app.locals.subdomainsDisabled = config.subdomainsDisabled;

	if(config.socketPortExternallyVisible){
		app.locals.socketPort = config.socketPort;
	} else {
		app.locals.socketPort = '';
	}

	if(config.socketUrl){
		app.locals.socketUrl = config.socketUrl;
	} 

	app.locals.bowerJSFiles = config.getBowerJSAssets();
	app.locals.bowerCssFiles = config.getBowerCSSAssets();
	app.locals.bowerOtherFiles = config.getBowerOtherAssets();

	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.formJSFiles = config.getFormJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();

	app.use(function (req, res, next) {
		var urlPath;
		if(!config.subdomainsDisabled) {
			var User = mongoose.model('User');
			var subdomainPath = '/subdomain/';
			var subdomains = req.subdomains;
			
			if (subdomains.slice(0, 4).join('.') + '' === '1.0.0.127') {
				subdomains = subdomains.slice(4);
			}

			// continue if no subdomains
			if (!subdomains.length) {
				return next();
			}
			
			urlPath = url.parse(req.url).path.split('/');
			if (urlPath.indexOf('static') > -1) {
				urlPath.splice(1, 1);
				req.root = req.protocol + '://' + config.baseUrl + urlPath.join('/');
				return next();
			}

			if (urlPath.indexOf('signup') > -1) {
				res.send(400); return;
			}

			if (urlPath.indexOf('users') > -1 && urlPath.indexOf('me') > -1) {
				return next();
			}

			if (subdomains.indexOf('stage') > -1 || subdomains.indexOf('admin') > -1) {
				return next();
			}

			if (subdomains.indexOf('api') > -1) {
				// rebuild url
				subdomainPath += 'api' + req.url;
				// TODO: check path and query strings are preserved
				// reassign url
				req.url = subdomainPath;
				return next();
			}

			User.findOne({username: req.subdomains.reverse()[0]}).exec(function (err, user) {

				if (err) {
					req.subdomains = null;
					// Error page
					return res.status(404).render('404', {
						error: 'Page Does Not Exist'
					});
				}
				if (user === null) {
					// Error page
					return res.status(404).render('404', {
						error: 'Page Does Not Exist'
					});
				}

				// rebuild url
				subdomainPath += subdomains.join('/') + req.url;

				// TODO: check path and query strings are preserved
				// reassign url
				req.url = subdomainPath;

				// Q.E.D.
				return next();
			});
		} else {

			urlPath = url.parse(req.url).path.split('/');
			if (urlPath.indexOf('static') > -1 && urlPath.indexOf('view') === urlPath.indexOf('static')-1) {
				urlPath.splice(1, 1);
				req.url = urlPath.join('/');
			}

			return next();
		}
	});

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
		level: 9
	}));

        //Setup i18n
    i18n.configure({
        locales: supportedLanguages,
        directory: __dirname + '/locales',
        defaultLocale: 'en',
        cookie: 'userLang'
    });

    app.use(i18n.init);

    app.use(function(req, res, next) {
        // express helper for natively supported engines
        res.locals.__ = res.__ = function() {
            return i18n.__.apply(req, arguments);
        };

        next();
    });

	// Set template engine as defined in the config files
	app.engine('server.view.pug', consolidate.pug);

	// Set views path and view engine
	app.set('view engine', 'server.view.pug');
	app.set('views', './app/views');

	// Enable logger (morgan)
	app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
		app.set('view cache', true);
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true,
		limit: '100mb'
	}));

	app.use(bodyParser.json({ limit: '100mb' }));
	app.use(methodOverride());

	// Use helmet to secure Express headers
	app.use(helmet.frameguard());
	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.use(helmet.ieNoOpen());
	app.use(helmet.dnsPrefetchControl());
	app.use(helmet.hidePoweredBy());


	// Setting the app router and static folder
	app.use('/static', express.static(path.resolve('./public')));
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


	//Visitor Language Detection
	app.use(function(req, res, next) {
		var acceptLanguage = req.headers['accept-language'];
		var languages, supportedLanguage;

		if(acceptLanguage){
			languages = acceptLanguage.match(/[a-z]{2}(?!-)/g) || [];
			supportedLanguage = containsAnySupportedLanguages(languages);
		}

		if(!req.user && supportedLanguage !== null){
			var currLanguage = res.cookie('userLang');

			if(currLanguage && currLanguage !== supportedLanguage || !currLanguage){
				res.clearCookie('userLang');
				res.cookie('userLang', supportedLanguage, { maxAge: 90000, httpOnly: true });
			}
		} else if(req.user && (!req.cookies.hasOwnProperty('userLang') || req.cookies['userLang'] !== req.user.language) ){
			res.cookie('userLang', req.user.language, { maxAge: 90000, httpOnly: true });
		}
		next();
	});

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// Add headers for Sentry
	app.use(function (req, res, next) {

	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', 'https://sentry.io');

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
	app.use(raven.middleware.express.requestHandler(config.DSN));

	// Should come before any other error middleware
	app.use(raven.middleware.express.errorHandler(config.DSN));

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) {
			return next();
		}

		// Log it
		client.captureError(err);

		// Error page
		res.status(500).render('500', {
		    __: i18n.__,
            error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		client.captureError(new Error('Page Not Found'));
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found',
            __: i18n.__
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
	return app
};
