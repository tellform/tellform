# OhMyForm 0.2.1


<!-- TODO: Code Shelter maybe. -->
<!-- [![Code Shelter](https://www.codeshelter.co/static/badges/badge-flat.svg)](https://www.codeshelter.co/) -->
<!-- TODO: Travis CI maybe. -->
<!-- [![Build Status](https://travis-ci.org/tellform/tellform.svg?branch=master)](https://travis-ci.org/tellform/tellform) -->
![Project Status](https://img.shields.io/badge/status-0.2.1-green.svg)
<!-- TODO: Codeacy maybe. -->
<!-- [![Codacy Badge](https://api.codacy.com/project/badge/Grade/3491e86eb7194308b8fc80711d736ede)](https://www.codacy.com/app/david-baldwin/tellform?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tellform/tellform&amp;utm_campaign=Badge_Grade) -->
<!--
Moving over to Discord so that I can manage things without hassle.
[![Gitter](https://badges.gitter.im/tellform/Lobby.svg)](https://gitter.im/tellform/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
-->
[![Discord](https://img.shields.io/discord/595773457862492190.svg?label=Discord%20Chat)](https://discord.gg/3jYMAYg)
> An *open source alternative to TypeForm* that can create [stunning mobile-ready forms](https://ohmyform.com/examples) , surveys and questionnaires.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ohmyform/ohmyform/tree/production)

## Table of Contents  

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [OhMyForm 0.2.1](#ohmyform-021)
	- [Table of Contents](#table-of-contents)
	- [Features](#features)
		- [Currently following features are implemented:](#currently-following-features-are-implemented)
		- [On the Roadmap for v1.0.0](#on-the-roadmap-for-v100)
	- [How to Contribute](#how-to-contribute)
	- [Quickstart](#quickstart)
	- [Where to get help](#where-to-get-help)

<!-- /TOC -->

## Features

### Currently following features are implemented:

	- Multi-Language Support (Semi implemented)
	- 11 possible question types
	- Editable start and end pages
	- Export Submissions to XLS, JSON or CSV
	- Native Analytics and Google Analytics Support
	- Custom Subdomains for each User
	- Embeddable Forms
	- Forms as a Service API

### On the Roadmap for v1.0.0
	- Implement encryption for all form data
	- Add Typeform API integration
	- Add plugin/3rd party integration support (ala Slack)
	- Create wiki for easy installation and setup
	- Add Stripe/Payment Form field
	- Add Custom Background and Dropdown Field Images
	- Add File Upload Form Field
	- Deployable with Heroku and DockerHub


<!-- TODO: add a CONTRIBUTING.md.
## How to Contribute

Please checkout our CONTRIBUTING.md on ways to contribute to TellForm. -->

## Quickstart

Follow documentation hosted on [OhMyForm.com](http://ohmyform.com/docs/install/) it will be the main and hopefully only location to obtain the up to date documentation.

<!-- TODO: Reconsider location of the following. -->
<!-- ## Configuration

TellForm's configuration is done with environment variables. To set an option for TellForm, open/create your .env file and set add `ENV_VAR=somevalue` to set the ENV_VAR variable to the value `somevalue`.

| Property                | Valid Values                                           | Default Value                                                        | Description                                                                                                           | Required?                                  |
|-------------------------|--------------------------------------------------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| NODE_ENV                | "development", "production", "test" or "secure"        | development                                                          | Set which version of the app you want to run  (either secure/SSL, dev, prod or test)                                  | No                                         |
| SESSION_SECRET          | Any string                                             | CHANGE_ME_PLEASE                                                     | Value used to compute session hash                                                                                    | No                                         |
| BASE_URL                | A valid URL                                            | localhost:3000                                                       | URL where the admin panel will live                                                                                   | Yes                                        |
| MONGODB_URI             | A valid MongoDB URI                                    | localhost/mean                                                       | URI of the MONGODB server/db that your server will use                                                                | Yes                                        |
| REDIS_URL               | A valid Redis URI                                      | redis://127.0.0.1:6379                                               | URI of the Redis instance that your server will use                                                                   | Only if ENABLE_CLUSTER_MODE=TRUE           |
| SOCKET_PORT             | A valid port number from 0 - 65535                     | 20523                                                                | Port that your SocketIO server will bind to                                                                           | No                                         |
| SOCKET_URL              | A valid URL                                            | ws.tellform.com                                                      | Url that your SocketIO server will bind to                                                                            | No                                         |
| SIGNUP_DISABLED         | "TRUE" or "FALSE"                                      | FALSE                                                                | Set this flag to disable signups.                                                                                     | No                                         |
| SUBDOMAINS_DISABLED     | "TRUE" or "FALSE"                                      | FALSE                                                                | Set this flag to disable subdomains. (Useful if hosting behind an uncontrolled domain or without a wildcard SSL cert) | No                                         |
| ENABLE_CLUSTER_MODE     |  "TRUE" or "FALSE"                                     | FALSE                                                                | Disable support for running TellForm with pm2's cluster mode. Disabling this allows you to not run a Redis instance.  | No                                         |
| MAILER_EMAIL_ID         | A string                                               | N/A                                                                  | Username credential for the SMTP MAIL service used to send signup/verification/lost password emails.                  | Yes                                        |
| MAILER_PASSWORD         | A string                                               |                                                                      | Password credential for the SMTP MAIL service used to send signup/verification/lost password emails.                  | Yes                                        |
| MAILER_FROM             | A valid email                                          | noreply@tellform.com                                                 | Email address that all mail should be sent from.                                                                      | No                                         |
| MAILER_SERVICE_PROVIDER | A service from [https://nodemailer.com/smtp/well-known/](https://nodemailer.com/smtp/well-known/) |                                                                      | A "well-known" email service that is supported by nodemail. If MAILER_SMTP_HOST is enabled, this is ignored.          | Only if MAILER_SMTP_HOST is not set        |
| MAILER_SMTP_HOST        | A valid URL                                            |                                                                      | URL to the SMTP server of your choice                                                                                 | Only if MAILER_SERVICE_PROVIDER is not set |
| MAILER_SMTP_PORT        | A valid port number from 0 - 65535                     |                                                                      | Port of the SMTP server of your choice.                                                                               | Only if MAILER_SMTP_HOST is set            |
| MAILER_SMTP_SECURE      | "TRUE" or "FALSE"                                      | FALSE                                                                | Boolean that enables/disables SSL support for your SMTP client.                                                       | Only if MAILER_SMTP_HOST is set            |
| CREATE_ADMIN            | "TRUE" or "FALSE"                                      | FALSE                                                                | Setting this variable will create a admin user on startup with credentials as specified below                         | No                                         |
| ADMIN_EMAIL             | A valid email                                          | admin@admin.com                                                      | Email of generated admin user                                                                                         | No                                         |
| ADMIN_USERNAME          | A string                                               | root                                                                 | Username of generated admin user                                                                                      | No                                         |
| ADMIN_PASSWORD          | A string                                               | root                                                                 | Password of generated admin user                                                                                      | No                                         |
| APP_NAME                | A string                                               | TellForm                                                             | Sets the `<title>` property of your webapp.                                                                             | No                                         |
| APP_DESC                | A string                                               | Opensource form builder alternative to TypeForm                      | Sets the,property of your webapp.                                                                                     | No                                         |
| APP_KEYWORDS            | A comma-seperated list of phrases/words                | typeform, pdfs, forms, opensource, formbuilder, google forms, nodejs | Sets the value of the <meta> description attribute.                                                                   | No                                         |
| RAVEN_DSN               | A valid Sentry.io DSN                                  | N/A                                                                  | Set this to your Sentry.io Public DSN to enable remote logging                                                        | No                                         |
| GOOGLE_ANALYTICS_ID     | A valid Google Analytics ID                            | N/A                                                                  | Set this to your GA id to enable GA tracking on your TellForm instance                                                | No                                         | | -->

## Where to get help

[![Discord](https://img.shields.io/discord/595773457862492190.svg?label=Discord%20Chat)](https://discord.gg/Y2TTePM)

<!-- TODO: Figure out how to generate that contributors table. -->
