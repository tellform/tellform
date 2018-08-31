TellForm 2.1.0
========

[![Build Status](https://travis-ci.org/tellform/tellform.svg?branch=master)](https://travis-ci.org/tellform/tellform)
![Project Status](https://img.shields.io/badge/status-2.1.0-green.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3491e86eb7194308b8fc80711d736ede)](https://www.codacy.com/app/david-baldwin/tellform?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tellform/tellform&amp;utm_campaign=Badge_Grade)
[![Gitter](https://badges.gitter.im/tellform/Lobby.svg)](https://gitter.im/tellform/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

> An *opensource alternative to TypeForm* that can create [stunning mobile-ready forms](https://tellform.com/examples) , surveys and questionnaires.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/tellform/tellform/tree/master)

## Table of Contents  

- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Quickstart](#quickstart)
- [Deploying with Docker](#deploying-with-docker)
- [Testing your Application](#testing-your-application)
- [Advanced Configuration](#configuration)
- [Where to Get Help](#where-to-get-help)
- [Sponsors](#sponsors)
- [Backers](#backers)
- [Contributors](#contributors)
- [Mentions on the Web](#mentions-on-the-web)

## Features

### Currently following features are implemented:

- Multi-Language Support
- 11 possible question types
- Editable start and end pages
- Export Submissions to XLS, JSON or CSV
- Native Analytics and Google Analytics Support
- Custom Subdomains for each User
- Embeddable Forms
- Forms as a Service API
- Deployable with Heroku and DockerHub

### On the Roadmap for v3.0.0
- Implement encryption for all form data
- Add Typeform API integration
- Add plugin/3rd party integration support (ala Slack)
- Create wiki for easy installation and setup
- Add Stripe/Payment Form field
- Add Custom Background and Dropdown Field Images
- Add File Upload Form Field

## How to Contribute

Please checkout our CONTRIBUTING.md on ways to contribute to TellForm.

All contributors are eligible to get a free [TellForm Sticker](https://www.stickermule.com/marketplace/15987-tellform-round-sticker). All you have to do is submit a PR, get it accepted, email your address to team [at] tellform.com and we'll send you a sticker that you can proudly put on your laptop.

## Quickstart

Before you start, make sure you have
1. [Redis](https://redis.io/) installed and running at 127.0.0.1:6379
2. [MongoDB](https://www.mongodb.com/) installed and running at 127.0.0.1:27017 (OR specify the host and port in config/env/all)

Also make sure to install [DNS Masq](http://www.thekelleys.org.uk/dnsmasq/doc.html) or equivalent if running it locally on your computer (look at dns_masq_setup_osx for instructions on OSX)

Install dependencies first.
```bash
$ npm install
$ bower install
```

Setup environment.
```bash
$ grunt build
```

Create your user account
```bash
$ node ./scripts/setup.js
```

OR create your .env file
```
GOOGLE_ANALYTICS_ID=yourGAID
PRERENDER_TOKEN=yourPrerender.ioToken
COVERALLS_REPO_TOKEN=yourCoveralls.ioToken
BASE_URL=localhost
DSN_KEY=yourPrivateRavenKey

# Mail config
MAILER_EMAIL_ID=user@domain.com
MAILER_PASSWORD=some-pass
MAILER_FROM=user@domain.com

# Use this for one of Nodemailer's pre-configured service providers
MAILER_SERVICE_PROVIDER=SendGrid

# Use these for a custom service provider
# Note: MAILER_SMTP_HOST will override MAILER_SERVICE_PROVIDER
MAILER_SMTP_HOST=smtp.domain.com
MAILER_SMTP_PORT=465
MAILER_SMTP_SECURE=TRUE

```

Side note: ___Currently we are using Raven and Sentry [https://www.getsentry.com](https://www.getsentry.com) for error logging. To use it you must provide a valid private DSN key in your .env file and a public DSN key in app/views/layout.index.html___

#### To run the development version:

Set ```NODE_ENV=development``` in .env file
```$ grunt```

#### To run the production version:

Set ```NODE_ENV=production``` in .env file
```$ grunt```

Your application should run on port 3000 or the port you specified in your .env file, so in your browser just go to [http://localhost:3000](http://localhost:3000)

## Deploying with Docker

To deploy with docker, first install docker [here](https://docs.docker.com/engine/installation/).

Then see this page [here](https://tellform.com/install_docker) for commands on how to deploy your own local TellForm instance.

## Testing Your Application
You can run the full test suite included with TellForm with the test task:

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

## Configuration

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
| MAILER_SERVICE_PROVIDER | A service from https://nodemailer.com/smtp/well-known/ |                                                                      | A "well-known" email service that is supported by nodemail. If MAILER_SMTP_HOST is enabled, this is ignored.          | Only if MAILER_SMTP_HOST is not set        |
| MAILER_SMTP_HOST        | A valid URL                                            |                                                                      | URL to the SMTP server of your choice                                                                                 | Only if MAILER_SERVICE_PROVIDER is not set |
| MAILER_SMTP_PORT        | A valid port number from 0 - 65535                     |                                                                      | Port of the SMTP server of your choice.                                                                               | Only if MAILER_SMTP_HOST is set            |
| MAILER_SMTP_SECURE      | "TRUE" or "FALSE"                                      | FALSE                                                                | Boolean that enables/disables SSL support for your SMTP client.                                                       | Only if MAILER_SMTP_HOST is set            |
| CREATE_ADMIN            | "TRUE" or "FALSE"                                      | FALSE                                                                | Setting this variable will create a admin user on startup with credentials as specified below                         | No                                         |
| ADMIN_EMAIL             | A valid email                                          | admin@admin.com                                                      | Email of generated admin user                                                                                         | No                                         |
| ADMIN_USERNAME          | A string                                               | root                                                                 | Username of generated admin user                                                                                      | No                                         |
| ADMIN_PASSWORD          | A string                                               | root                                                                 | Password of generated admin user                                                                                      | No                                         |
| APP_NAME                | A string                                               | TellForm                                                             | Sets the <title> property of your webapp.                                                                             | No                                         |
| APP_DESC                | A string                                               | Opensource form builder alternative to TypeForm                      | Sets the,property of your webapp.                                                                                     | No                                         |
| APP_KEYWORDS            | A comma-seperated list of phrases/words                | typeform, pdfs, forms, opensource, formbuilder, google forms, nodejs | Sets the value of the <meta> description attribute.                                                                   | No                                         |
| RAVEN_DSN               | A valid Sentry.io DSN                                  | N/A                                                                  | Set this to your Sentry.io Public DSN to enable remote logging                                                        | No                                         |
| GOOGLE_ANALYTICS_ID     | A valid Google Analytics ID                            | N/A                                                                  | Set this to your GA id to enable GA tracking on your TellForm instance                                                | No                                         |

## Where to get help

[Gitter Chat](https://gitter.im/tellform/Lobby)

[Official Twitter](https://twitter.com/tellform_real)


## Sponsors

Does your company use TellForm? Help keep the project bug-free and feature rich by [sponsoring the project](https://opencollective.com/tellform#sponsor).

<a href="https://m.do.co/c/a86fd8843e09" style="padding: 30px 0">
	<img src="/docs/readme_logos/digitalOcean.png" height="30px">
</a>
<a href="https://getsentry.com/" style="padding: 30px 0">
	<img src="/docs/readme_logos/sentryIO.png" height="30px">
</a>
<a href="https://statuspage.io/" style="padding: 30px 0">
	<img src="/docs/readme_logos/statusPageIO.png" height="30px">
</a>
<br><br>
<a href="https://www.stickermule.com/unlock?ref_id=0939360701" style="padding: 30px 0">
	<img src="/docs/readme_logos/stickerMule.png" height="30px">
</a>
<a href="https://sparkpost.com/" style="padding: 30px 0">
	<img src="/docs/readme_logos/sparkPost.png" height="30px">
</a>

<a href="https://therooststand.com/" style="padding: 30px 0">
	<img src="/docs/readme_logos/theRoostStand.png" height="30px">
</a>

## Backers

Love our work and community? [Become a backer](https://opencollective.com/tellform).

<a href="https://opencollective.com/elliot" target="_blank">
	<img src="https://opencollective.com/proxy/images/?src=https%3A%2F%2Fd1ts43dypk8bqh.cloudfront.net%2Fv1%2Favatars%2F6fd61b2c-62b6-438a-9168-bab7ef1489b8" height= "64">
</a>

<a href="https://opencollective.com/aldrnv" target="_blank">
	<img src="https://opencollective.com/public/images/users/avatar-01.svg" height="64">
</a>

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/1160417?v=3" width="100px;"/><br /><sub>David Baldwynn</sub>](http://baldwynn.me)<br />[💻](https://github.com/tellform/tellform/commits?author=whitef0x0 "Code") [🔧](#tool-whitef0x0 "Tools") [🚇](#infra-whitef0x0 "Infrastructure (Hosting, Build-Tools, etc)") [📖](https://github.com/tellform/tellform/commits?author=whitef0x0 "Documentation") [💡](#example-whitef0x0 "Examples") [🎨](#design-whitef0x0 "Design") [🔍](#fundingFinding-whitef0x0 "Funding Finding") [👀](#review-whitef0x0 "Reviewed Pull Requests") [⚠️](https://github.com/tellform/tellform/commits?author=whitef0x0 "Tests") | [<img src="https://avatars2.githubusercontent.com/u/313117?v=3" width="100px;"/><br /><sub>Samuel Laulhau</sub>](https://samuellaulhau.fr)<br />[💻](https://github.com/tellform/tellform/commits?author=lalop "Code") [🌍](#translation-lalop "Translation") | [<img src="https://avatars0.githubusercontent.com/u/313507?v=3" width="100px;"/><br /><sub>Arun Pattnaik</sub>](http://arun.co)<br />[🎨](#design-arunpattnaik "Design") | [<img src="https://avatars0.githubusercontent.com/u/5405744?v=3" width="100px;"/><br /><sub>Thiên Toán</sub>](https://toanalien.com)<br />[🐛](https://github.com/tellform/tellform/issues?q=author%3Atoanalien "Bug reports") [💻](https://github.com/tellform/tellform/commits?author=toanalien "Code") [📖](https://github.com/tellform/tellform/commits?author=toanalien "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/8615608?v=3" width="100px;"/><br /><sub>Adrian Portabales</sub>](https://github.com/AdrianP-)<br />[🐛](https://github.com/tellform/tellform/issues?q=author%3AAdrianP- "Bug reports") [💻](https://github.com/tellform/tellform/commits?author=AdrianP- "Code") | [<img src="https://avatars3.githubusercontent.com/u/8433587?v=3" width="100px;"/><br /><sub>Peter Thaleikis</sub>](https://github.com/spekulatius)<br />[📖](https://github.com/tellform/tellform/commits?author=spekulatius "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/1247388?v=3" width="100px;"/><br /><sub>Mickaël Andrieu</sub>](http://www.mickael-andrieu.com)<br />[📖](https://github.com/tellform/tellform/commits?author=mickaelandrieu "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/1522464?v=3" width="100px;"/><br /><sub>Ahmad Luqman</sub>](https://github.com/ahmad-luqman)<br />[📖](https://github.com/tellform/tellform/commits?author=ahmad-luqman "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/3691490?v=3" width="100px;"/><br /><sub>Peter Dave Hello</sub>](https://www.peterdavehello.org/)<br />[📖](https://github.com/tellform/tellform/commits?author=PeterDaveHello "Documentation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->
## Mentions on the Web

[Mister Ad](http://start.mister-ad.biz/newsticker/open-source-alternative-zu-typeform-tellform-in-der-kurzvorstellung/)

[t3n.de](http://t3n.de/news/open-source-alternative-typeform-tellform-707295/)

[BootCSS Expo](http://expo.bootcss.com/)

[Product Hunt](https://www.producthunt.com/tech/tellform)

[Hacker News Post](https://news.ycombinator.com/item?id=11711095)

[Reddit Posts](https://www.reddit.com/domain/tellform.com/)

[Betapage](https://betapage.co/startup/tellform)

[Opensource.com](http://opensource.com/article/17/2/tools-online-surveys-polls)
