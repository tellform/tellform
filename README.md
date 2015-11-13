NodeForms
--------

Current stable release: v1.2.0

[![Build Status](https://travis-ci.org/whitef0x0/nodeforms.svg?branch=master)](https://travis-ci.org/whitef0x0/nodeforms)
[![Dependencies Status](https://david-dm.org/whitef0x0/NodeForms.svg)](https://david-dm.org/whitef0x0/nodeforms)
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


NodeForms is an opensource *form builder* built ontop of nodejs that can create stunning forms from PDFs or from scratch

Currently following features are implemented:

##Current Features
	-User login system to manage forms
	-User CRUD 
	-Form CRUD
	-11 possible types of form fields
	-Editable startpage
	-Push form data to OsacrHost EMR
	-Create forms from FDF-formatted PDFs (unstable)
	-Save form submissions as FDF-formatted PDFs (unstable)
	-Toggle forms as private (viewable only if logged in as Form's user) or public (viewable by anyone)
	-Drag and drop functionality to editing form field order
	-Editable form submissions (half-done)

#TODO:
	-Implement encryption for all form data
	-Finish frontend/backend testing
	-Integrate AWS for PDF saving
	-Add Typeform API integration
	-Add plugin/3rd party integration support (ala Slack)
	-Create wiki for easy installation and setup
	-Create mockups for different user view designs




## Quickstart

Install dependencies first.
```bash
$ npm install
$ bower install
```

To run development version:
```bash
$ grunt default
```

To run production version:
```bash
$ grunt production
```

Your application should run on port 3000, so in your browser just go to [http://localhost:3000](http://localhost:3000)


## Testing Your Application
You can run the full test suite included with MEAN.JS with the test task:

```
$ grunt test
```

This will run both the server-side tests (located in the app/tests/ directory) and the client-side tests (located in the public/modules/*/tests/).

To execute only the server tests, run the test:server task:

```
$ grunt test:server
```

And to run only the client tests, run the test:client task:

```
$ grunt test:client
```

Currently the live example uses heroku github deployments. The Docker file is out of date and does not work. If someone wishes to get it working feel free to submit a pull request.

## Running in a secure environment
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:
```bash
$ sh ./scripts/generate-ssl-certs.sh
```
Windows users can follow instructions found [here](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority).
After you've generated the key and certificate, place them in the *config/sslcerts* folder.


## Credits
Inspired/built off great work of the meanjs team [MeanJS](https://github.com/mean/)

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
