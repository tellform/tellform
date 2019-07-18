'use strict';

var bowerArray = ['public/lib/angular/angular.min.js',
	'public/lib/angular-scroll/angular-scroll.min.js',
	'public/lib/angular-ui-select/dist/select.min.js',
	'public/lib/v-button/dist/v-button.min.js',
	'public/lib/angular-resource/angular-resource.min.js',
	'public/lib/angular-ui-router/release/angular-ui-router.min.js',
	'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
	'public/lib/angular-translate/angular-translate.min.js',
	'public/lib/ng-file-upload/ng-file-upload-all.min.js',
	'public/lib/angular-ui-date/src/date.js',
	'public/lib/angular-input-stars/angular-input-stars.js',
	'public/lib/jsep/build/jsep.min.js',
	'public/lib/raven-js/dist/raven.min.js',
	'public/lib/lodash/lodash.min.js',
	'public/lib/mobile-detect/mobile-detect.js',
	'public/lib/js-yaml/dist/js-yaml.js',
	'public/lib/angular-sanitize/angular-sanitize.min.js'];

const bowerFiles = require('main-bower-files');
const bowerDep = bowerFiles('**/**.js');

module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	var angularTestDeps = ['public/lib/angular/angular.js', 'public/lib/angular-mocks/angular-mocks.js'];

	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.pug'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', '!app/tests/'],

		clientViews: ['public/modules/**/*.html', 'public/form_modules/forms/base/**/*.html', '!public/modules/forms/base/**/*.html',],
		clientJS: ['public/config.js', 'public/form-config.js', 'public/application.js', 'public/form-application.js', 'public/form_modules/**[!tests]/*.js', 'public/modules/**[!tests]/*.js'],
		clientCSS: ['public/modules/**/*.css'],

		serverTests: ['app/tests/**/*.js'],
		clientTests: ['public/modules/**/tests/*.js']
	};

	watchFiles.allTests = watchFiles.serverTests.concat(watchFiles.clientTests);

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true,
					spawn: false
				}
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['newer:jshint'],
				options: {
					livereload: true,
					spawn: false
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
				tasks: ['html2js:main'],
				options: {
					livereload: true,
					spawn: false
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['newer:jshint'],
				options: {
					livereload: true,
					spawn: false
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['newer:csslint'],
				options: {
					livereload: true,
					spawn: false
				}
			},
			mochaTests: {
				files: watchFiles.serverTests,
				tasks: ['test:server']
			}
		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			},
			allTests: {
				src: watchFiles.allTests,
				options: {
					jshintrc: true
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
		uglify: {
			productionAdmin: {
				options: {
					compress: true,
					mangled: true
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js',
					'public/dist/form-application.min.js': 'public/dist/form-application.js'
				}
	    	},
			productionForms: {
				options: {
					mangled: true,
					compress: true
				},
				files: {
					'public/dist/vendor.min.js': bowerArray
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/dist/application.min.css': '<%= applicationCSSFiles %>'
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--inspect'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		ngAnnotate: {
			options:{
				add: true,
				remove: true
			},
			production: {
				files: {
					'public/dist/application.js': '<%= applicationJavaScriptFiles %>',
					'public/dist/form-application.js': '<%= formApplicationJavaScriptFiles %>'
				}
			}
		},
		concurrent: {
		    default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch'],
	    	options: {
				logConcurrentOutput: true,
		    	limit: 10
	    	}
	    },
		env: {
			src: '.env',

			test: {
				NODE_ENV: 'test',
			},
			secure: {
				NODE_ENV: 'secure',
			},
			production: {
				NODE_ENV: 'production',
			},
			dev: {
				NODE_ENV: 'development',
			}
		},
		mochaTest: {
			src: watchFiles.serverTests,
			options: {
				reporter: 'spec',
				quiet: false,
				require: 'server.js',
				ui: 'bdd',
				debug: false
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
			    singleRun: true
            },
            debug: {
            	configFile: 'karma.conf.js',
            	browserConsoleLogOptions: {
				    level: 'log',
				    terminal: true
				},
			    singleRun: false
            }
		},
	    mocha_istanbul: {
            coverageServer: {
                src: watchFiles.serverTests,
                options: {
                    coverageFolder: 'coverageServer',
                    mask: '*.test.js',
                    require: ['server.js'],
                    reportFormats: ['html','lcovonly']
                }
            }
        },
        lcovMerge: {
	      options: {
	          emitters: ['event'],
	      },
	      src: ['./coverageServer/*.info', './coverageClient/**/*.info']
	    },
		html2js: {
			options: {
				base: 'public',
				watch: true,
				singleModule: true,
				useStrict: true,
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true
				}
			},
			forms: {
				options: {
					module: 'OhMyForm-Form.form_templates'
				},
				src: ['public/form_modules/**/views/**.html', 'public/form_modules/**/views/**/*.html'],
				dest: 'public/dist/form_populate_template_cache.js'
			},
			main: {
				options: {
					module: 'app.templates'
				},
				src: ['public/modules/**/views/**.html', 'public/modules/**/views/**/*.html', 'public/form_modules/forms/base/**/*.html'],
				dest: 'public/dist/populate_template_cache.js'
			}
		},
		execute: {
			target: {
				src: ['./scripts/setup.js']
			}
		},
	});

	grunt.event.on('coverage', function(lcov, done){
	    var coveralls = require('coveralls');
           coveralls.handleInput(lcov, function(err){
	        if (err) {
	        	grunt.log.error('Failed to submit lcov file to coveralls: ' + err);
	            return done(err);
	        }
	        grunt.verbose.ok('Successfully submitted lcov file to coveralls');
	        done();
	    });
	});

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		require('./config/init')();
		var config = require('./config/config');
		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('formApplicationJavaScriptFiles', config.assets.form_js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

	// Code coverage tasks.
	grunt.registerTask('coveralls', ['test:client', 'karma:unit', 'mocha_istanbul:coverageServer', 'lcovMerge']);
    grunt.registerTask('coverage:server', ['env:test', 'mocha_istanbul:coverageServer']);

	// Default task(s).
	grunt.registerTask('default', ['lint', 'loadConfig', 'ngAnnotate', 'uglify', 'html2js:main', 'html2js:forms', 'env', 'concurrent:default']);
	grunt.registerTask('dev', ['lint', 'html2js:main',  'html2js:forms', 'env:dev', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'html2js:main', 'html2js:forms', 'concurrent:debug']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'csslint']);
	grunt.registerTask('lint:tests', ['jshint:allTests']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig', 'cssmin', 'ngAnnotate', 'uglify', 'html2js:main', 'html2js:forms']);

	//Setup task(s).
	grunt.registerTask('setup', ['execute']);

	// Test task(s).
	grunt.registerTask('test', ['test:server', 'test:client']);
	grunt.registerTask('test:server', ['lint:tests', 'env:test', 'mochaTest']);
	grunt.registerTask('test:client', ['lint:tests', 'html2js:main', 'html2js:forms', 'env:test', 'karma:unit']);
	grunt.registerTask('test:travis', ['coverage:server', 'test:client', 'lcovMerge']);


	grunt.registerTask('testdebug', ['env:test', 'karma:debug']);
};
