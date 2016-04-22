TellForm
========

Current stable release: v1.2.1

[![Build Status](https://travis-ci.org/whitef0x0/tellform.svg?branch=master)](https://travis-ci.org/whitef0x0/tellform)
[![Dependency Status](https://gemnasium.com/whitef0x0/tellform.svg)](https://gemnasium.com/whitef0x0/tellform)
[![Code Climate](https://codeclimate.com/github/whitef0x0/tellform/badges/gpa.svg)](https://codeclimate.com/github/whitef0x0/tellform)

TellForm is an *opensource alternative to TypeForm* built ontop of nodejs that can create stunning forms from PDFs or from scratch

##Demo Forms
[Job Application Example](https://stage.tellform.com/#!/forms/57193f512aa1f3ff5e205b56)

## Features	

Currently following features are implemented:
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

###TODO:
	-Implement encryption for all form data
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

Setup environment.
```bash
$ grunt build
```

Create your .env file. It should look like this
```
MAILER_EMAIL_ID=example@test.com
MAILER_FROM=noreply@yourdomain.com
MAILER_PASSWORD=yourmandrillapikey
MAILER_SERVICE_PROVIDER=Mandrill
BASE_URL=yourdomain.com
```

Create this directory or you will get errors.

```
mkdir uploads/pdfs
```

Edit the 'env' config in gruntfile.js to make sure your .env file is being used. If you don't include this your app won't run

To run development version:

```$ grunt default```
To run production version:

```$ grunt production```

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

To calculate your total test coverage with Istanbul, run the coverage task
```bash
$ grunt coverage
```

To calculate your server-side test coverage with Istanbul, run the coverage task
```bash
$ grunt coverage:server
```

To calculate your client-side test coverage with Istanbul, run the coverage task
```bash
$ grunt coverage:client
```

## Running in a secure environment
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:
```bash
$ sh ./scripts/generate-ssl-certs.sh
```
Windows users can follow instructions found [here](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority).
After you've generated the key and certificate, place them in the *config/sslcerts* folder.


## Credits
Inspired/built off the great work of the [MeanJS team](https://github.com/mean/).

