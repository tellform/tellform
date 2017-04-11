'use strict';
var spawn = require('child_process').spawn;
var bowerFiles = require('main-bower-files');
var path = require('path');

var minBowerFiles = function(type){
	return bowerFiles(type).map( function(path, index, arr) {
		var newPath = path.replace(/.([^.]+)$/g, '.min.$1');
		return exists( newPath ) ? newPath : path;
	});
};

var removeRootDir = function(files, removeRoot, addRoot) {
	return files.map(function(file) {
		if (addRoot) return file.replace(path.join(process.cwd(), removeRoot), addRoot);
		return file.replace(path.join(process.cwd(), removeRoot), '');
	});
};

var allBowerFiles = bowerFiles({
	filter: function(filePath){
		return (filePath.indexOf('js') > 0 && filePath.indexOf('angular-ui-utils') === -1);
	}
});

var bowerAllArray = ['public/lib/angular/angular.js',
	'public/lib/angular-ui-select/dist/select.js',
	'public/lib/v-button/dist/v-button.js',
	'public/lib/angular-ui-scroll/dist/ui-scroll.js',
	'public/lib/angular-resource/angular-resource.js',
	'public/lib/angular-ui-router/release/angular-ui-router.js',
	'public/lib/angular-sanitize/angular-sanitize.js',
	'public/lib/angular-input-stars/angular-input-stars.js',
	'public/lib/ng-file-upload/ng-file-upload.js',
	'public/lib/angular-mocks/angular-mocks.js',
	'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
	'public/lib/angular-ui-scrollpoint/dist/scrollpoint.js',
	'public/lib/angular-ui-event/dist/event.js',
	'public/lib/angular-ui-mask/dist/mask.js',
	'public/lib/angular-ui-validate/dist/validate.js',
	'public/lib/angular-ui-indeterminate/dist/indeterminate.js',
	'public/lib/angular-ui-uploader/dist/uploader.js',
	'public/lib/raven-js/dist/raven.js',
	'public/lib/jquery-ui/jquery-ui.js',
	'public/lib/lodash/lodash.js',
	'public/lib/angular-ui-sortable/sortable.js',
	'public/lib/angular-permission/dist/angular-permission.js',
	'public/lib/file-saver.js/FileSaver.js',
	'public/lib/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
	'public/lib/angular-ui-router-tabs/src/ui-router-tabs.js',
	'public/lib/angular-scroll/angular-scroll.js',
	'public/lib/angular-animate/angular-animate.js',
	'public/lib/file-saver/FileSaver.js',
	'public/lib/html2canvas/build/html2canvas.js',
	'public/lib/jspdf/dist/jspdf.min.js',
	'public/lib/jspdf-autotable/dist/jspdf.plugin.autotable.js',
	'public/lib/angular-translate/angular-translate.js',
	'public/lib/deep-diff/index.js',
	'public/lib/jsep/build/jsep.js',
	'public/lib/clipboard/dist/clipboard.js',
	'public/lib/mobile-detect/mobile-detect.js',
	'public/lib/angular-strap/dist/angular-strap.js',
	'public/lib/angular-strap/dist/angular-strap.tpl.js',
	'public/lib/bootstrap/dist/js/bootstrap.js',
	'public/lib/angular-ui-utils/index.js',
	'public/lib/angular-raven/angular-raven.js',
	'public/lib/angular-ui-date/src/date.js',
	'public/lib/angular-busy/dist/angular-busy.js',
	'public/lib/tableExport.jquery.plugin/tableExport.min.js',
	'public/lib/ngclipboard/dist/ngclipboard.js' ];
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
/*





	'public/lib/bootstrap/dist/js/bootstrap.js',
	'public/lib/angular-raven/angular-raven.js',
	'public/lib/angular-busy/dist/angular-busy.js'];
*/

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
				ui: 'bdd'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
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
		var init = require('./config/init')();
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
	grunt.registerTask('lint', ['jshint', 'csslint']);
	grunt.registerTask('lint:tests', ['jshint:allTests']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig', 'cssmin', 'ngAnnotate', 'uglify', 'closure-compiler', 'html2js:main', 'html2js:forms']);

	//Setup task(s).
	grunt.registerTask('setup', ['execute']);

	// Test task(s).
	grunt.registerTask('test', ['lint:tests', 'test:server', 'test:client']);
	grunt.registerTask('test:server', ['lint:tests', 'env:test', 'mochaTest']);
	grunt.registerTask('test:client', ['lint:tests', 'html2js:main', 'html2js:forms', 'env:test', 'karma:unit']);
};
