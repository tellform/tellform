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

module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', '!app/tests/'],

		clientViews: ['public/modules/**/views/**.html'],
		clientJS: ['public/js/*.js', 'public/form_modules/**/*.js', 'public/modules/**/*.js'],
		clientCSS: ['public/modules/**/*.css', 'public/form_modules/**/*.css', '!public/modules/**/demo/**/*.css', '!public/modules/**/dist/**/*.css'],

		serverTests: ['app/tests/**/*.js'],
		clientTests: ['public/modules/**/tests/*.js', '!public/modules/**/demo/**/*.js', '!public/modules/**/dist/**/*.js', '!public/modules/**/node_modules/**/*.js']
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
					beautify: true
				},
				files: {
					'public/dist/vendor_forms_uglified.js': bowerArray
				}
			}
		},
		'closure-compiler': {
			vendor_file: {
				closurePath: './scripts',
				js: 'public/dist/vendor_forms_uglified.js',
				jsOutputFile: 'public/dist/vendor.min.js',
				maxBuffer: 10000000000,
				options: {
					warning_level: 'QUIET',
					compilation_level: 'SIMPLE_OPTIMIZATIONS',
					language_in: 'ECMASCRIPT5'
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
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
		ngAnnotate: {
			production: {
				files: {
					'public/dist/application.js': '<%= applicationJavaScriptFiles %>',
					'public/dist/form-application.js': '<%= formApplicationJavaScriptFiles %>'
				}
			}
		},
		concurrent: {
		    default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'],
	    	options: {
				logConcurrentOutput: true,
		    	limit: 10
	    	}
	    },
		env: {
			test: {
				NODE_ENV: 'test',
				src: '.env'
			},
			secure: {
				NODE_ENV: 'secure',
				src: '/opt/deploy/.env'
			},
			production: {
				NODE_ENV: 'production',
				src: '/opt/deploy/.env'
			},
			dev: {
				NODE_ENV: 'development',
				src: '.env'
			}
		},
		mochaTest: {
			src: watchFiles.serverTests,
			options: {
				reporter: 'spec',
				quiet: false,
				require: 'server.js',
				ui: 'bdd',
				debug: true
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
			    singleRun: true
            }
		},
		protractor: {
			options: {
				configFile: 'protractor.conf.js',
				keepAlive: true,
				noColor: false
			},
			e2e: {
				options: {
					args: {} // Target-specific arguments
				}
			}
	    },
	    mocha_istanbul: {
            coverage: {
                src: watchFiles.allTests, // a folder works nicely
                options: {
                    mask: '*.test.js',
                    require: ['server.js']
                }
            },
            coverageClient: {
                src: watchFiles.clientTests, // specifying file patterns works as well
                options: {
                    coverageFolder: 'coverageClient',
                    mask: '*.test.js',
                    require: ['server.js']
                }
            },
            coverageServer: {
                src: watchFiles.serverTests,
                options: {
                    coverageFolder: 'coverageServer',
                    mask: '*.test.js',
                    require: ['server.js']
                }
            },
            coveralls: {
                src: watchFiles.allTests, // multiple folders also works
                options: {
                	require: ['server.js'],
                    coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered
                    root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
                    reportFormats: ['cobertura','lcovonly']
                }
            }
        },
        istanbul_check_coverage: {
          default: {
            options: {
              coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
              check: {
                lines: 80,
                statements: 80
              }
            }
          }
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
					module: 'TellForm-Form.form_templates'
				},
				src: ['public/form_modules/**/views/**.html', 'public/form_modules/**/views/**/*.html'],
				dest: 'public/dist/form_populate_template_cache.js'
			},
			main: {
				options: {
					module: 'TellForm.templates'
				},
				src: ['public/modules/**/views/**.html', 'public/modules/**/views/**/*.html'],
				dest: 'public/dist/populate_template_cache.js'
			}
		},
		execute: {
			target: {
				src: ['./scripts/setup.js']
			}
		}
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
	grunt.registerTask('coveralls', ['env:test','mocha_istanbul:coveralls']);
    grunt.registerTask('coverage', ['env:test', 'mocha_istanbul:coverage']);
    grunt.registerTask('coverage:client', ['env:test', 'mocha_istanbul:coverageClient']);
    grunt.registerTask('coverage:server', ['env:test', 'mocha_istanbul:coverageServer']);

	// Default task(s).
	grunt.registerTask('default', ['lint', 'html2js:main', 'html2js:forms', 'env', 'concurrent:default']);
	grunt.registerTask('dev', ['lint', 'html2js:main',  'html2js:forms', 'env:dev', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'html2js:main', 'html2js:forms', 'concurrent:debug']);

	// Secure task(s).
	grunt.registerTask('secure', ['env:secure', 'lint', 'html2js:main', 'html2js:forms', 'concurrent:default']);

	// Lint task(s).
	// grunt.registerTask('lint', ['jshint', 'csslint']);
	// grunt.registerTask('lint:tests', ['jshint:allTests']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig', 'cssmin', 'ngAnnotate', 'uglify', 'closure-compiler', 'html2js:main', 'html2js:forms']);

	//Setup task(s).
	grunt.registerTask('setup', ['execute']);

	// Test task(s).
	grunt.registerTask('test', ['lint:tests', 'test:server', 'test:client']);
	grunt.registerTask('test:server', ['lint:tests', 'env:test', 'mochaTest']);
	grunt.registerTask('test:client', ['lint:tests', 'html2js:main', 'html2js:forms', 'env:test', 'karma:unit']);

	grunt.registerTask('testdebug', ['env:test', 'karma:debug']);
};
