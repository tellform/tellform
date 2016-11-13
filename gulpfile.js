var gulp = require('gulp');
var server = require('gulp-serv');
var gulpIstanbul = require('gulp-istanbul');
var protractor = require('gulp-protractor').protractor;
var webdriverUpdate = require("gulp-protractor").webdriver_update;
var path = require('path');
var through = require('through2');
var istanbul = require('istanbul');
var fs = require('fs');
var rimraf = require('gulp-rimraf');
var exec = require('child_process').exec;

/* this uses a pretty simple task chain setup to do the following 6 steps:
 */

/* 1. clean out the tmp and coverage directories */
gulp.task('test:clean', function(done) {
	return gulp.src(['tmp','e2e_coverage','lcov*'], { read: false })
		.pipe(rimraf({force:true}));
});

/* 2. copy files over from the app to the temporary webserver directory */
gulp.task('test:files', ['test:clean'], function(done) {
	return gulp.src(['*', '.env', '.bowerrc', '!scripts', '!**.md', '!docs', '!design', '!tmp'])
		.pipe(gulp.dest('tmp/'));
});

/* 3. instrument all javascript files except for vendor ones and copy to temporary webserver directory */
gulp.task('test:instrument', ['test:files'], function(done) {
	return gulp.src(['public/*.js', 'public/**/*.js', '!public/lib/**'])
		.pipe(gulpIstanbul({
			coverageVariable: '__coverage__',
			includeUntested: true
		}))
		.pipe(gulp.dest('tmp/'));
});

/* *. Parallel task of updating selenium webdriver for protractor */
gulp.task('test:webdriver-update', webdriverUpdate);

/* 3. Start server */
gulp.task('test:server', /*['test:instrument'],*/ function (cb) {
	exec('NODE_ENV=test wnode server.js', {
			cwd: './tmp/'
		},
		function (err, stdout, stderr){
			console.log(stdout);
			console.log(stderr);
			cb(err);
		}
	);
});

/* 5. Run the protractor integration tests, which are configured to use the istanbul coverage plugin */
gulp.task('test:integration',['test:webdriver-update', 'test:server'], function(done) {
	return gulp.src([])
		.pipe(protractor({
			configFile: "./tmp/protractor.conf.js"
		}))
		.on('error', function(e) { throw e })
});

/* 6. Generate a text-based summary report of the coverage, by scraping in the coverage/*.json files */
gulp.task('test:report-coverage', ['test:integration'], function(done) {
	var collector = new istanbul.Collector();
	var textReport = istanbul.Report.create('text');
	var textSummaryReport = istanbul.Report.create('text-summary');
	var lcovReport = istanbul.Report.create('lcov');

	return gulp.src('./e2e_coverage/*.json')
		.pipe(through.obj(function (file, enc, callback) {
			collector.add(JSON.parse(fs.readFileSync(file.path, 'utf8')));
			return callback();
		}))
		.on('end', function () {
			textReport.writeReport(collector,true);
			textSummaryReport.writeReport(collector, true);
			lcovReport.writeReport(collector, true);

			// stopping of the server, as it doesn't die very gracefully
			//server.stop();
		});
});
