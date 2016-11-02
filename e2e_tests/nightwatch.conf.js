"use strict";

let seleniumServer = require('selenium-server');
let chromedriver = require('chromedriver');

let appPort = process.env.APP_PORT || process.env.PORT || 3000;

// http://nightwatchjs.org/guide#settings-file
//
module.exports = {
	"src_folders": ["e2e_tests/specs"],
	"output_folder": "e2e_tests/reports",
	"globals_path": "e2e_tests/globals.js",
	"custom_assertions_path": ["e2e_tests/custom-assertions"],
	"custom_commands_path": [ "e2e_tests/custom-commands" ],
	"page_objects_path": "e2e_tests/pages",
	"test_runner": {
		"type" : "mocha",
		"options": {
			"ui": "bdd",
			"reporter": "spec"
		}
	},

	"selenium": {
		"start_process": true,
		"server_path": seleniumServer.path,
		"host": "127.0.0.1",
		"port": 4444,
		"cli_args": {
			"webdriver.chrome.driver": chromedriver.path
		}
	},

	"test_settings": {
		"default": {
			"launch_url" : "http://tellform.dev:3001",
			"appPort": appPort,
			"selenium_port": 4444,
			"selenium_host": "localhost",
			"silent": true,
			"desiredCapabilities": {
				"javascriptEnabled": true,
				"acceptSslCerts": true
			},
			"screenshots": {
				"enabled": true,
				"on_failure" : true,
				"on_error" : false,
				"path": "e2e_tests/reports/screenshots"
			}
		},

		"chrome": {
			"desiredCapabilities": {
				"browserName": "chrome"
			}
		},

		"firefox": {
			"desiredCapabilities": {
				"browserName": "firefox"
			}
		}
	}
}
