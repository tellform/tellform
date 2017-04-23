TellForm 2.0.0
========

[![Build Status](https://travis-ci.org/whitef0x0/tellform.svg?branch=master)](https://travis-ci.org/whitef0x0/tellform)
![Project Status](https://img.shields.io/badge/status-2.0.0-green.svg)
[![Code Climate](https://codeclimate.com/github/whitef0x0/tellform/badges/gpa.svg)](https://codeclimate.com/github/whitef0x0/tellform)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3491e86eb7194308b8fc80711d736ede)](https://www.codacy.com/app/david-baldwin/tellform?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=whitef0x0/tellform&amp;utm_campaign=Badge_Grade)
[![Gitter](https://badges.gitter.im/whitef0x0/tellform.svg)](https://gitter.im/whitef0x0/tellform?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

> An *opensource alternative to TypeForm* that can create [stunning mobile-ready forms](https://tellform.com/examples) , surveys and questionnaires.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/whitef0x0/tellform/tree/master)

## Table of Contents  

- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Quickstart](#quickstart)
- [Deploying with Docker](#deploying-with-docker)
- [Testing your Application](#testing-your-application)
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

### How to Contribute

Please checkout our CONTRIBUTING.md on ways to contribute to TellForm.

All contributors are eligible to get a free [TellForm Sticker](https://www.stickermule.com/marketplace/15987-tellform-round-sticker). All you have to do is submit a PR, get it accepted, email your address to polydaic [at] gmail.com and we'll send you a sticker that you can proudly put on your laptop.

## Quickstart

Before you start, make sure you have 
1. Redis installed and running at 127.0.0.1:6379
2. MongoDB installed and running at 127.0.0.1:27017 (OR specify the host and port in config/env/all)

Also make sure to install DNS Masq or equivalent if running it locally on your computer (look at dns_masq_setup_osx for instructions on OSX)

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
MAILER_EMAIL_ID=SMTP_Injection
MAILER_FROM=noreply@yourdomain.com
MAILER_PASSWORD=your_sparkpost_apikey
MAILER_SERVICE_PROVIDER=SparkPost
BASE_URL=yourdomain.com
DSN_KEY=yourPrivateRavenKey
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

To deploy with docker, first install docker [https://docs.docker.com/engine/installation/](here). 

Then run these commands

```
$ docker run -p 27017:27017 -d --name some-mongo mongo
$ docker run -p 127.0.0.1:6379:6379 -d --name some-redis redis
$ docker run --rm -p 3000:3000 --link some-redis:redis-db --link some-mongo:db tellform/development -e MAILER_EMAIL_ID='mailer_username' \ 
                                                                                                   -e POSTGRES_ENV_POSTGRES_PASSWORD='foo' \
                                                                                                   -e POSTGRES_ENV_POSTGRES_USER='bar' \
                                                                                                   -e POSTGRES_ENV_DB_NAME='mysite_staging' \
                                                                                                   -e POSTGRES_PORT_5432_TCP_ADDR='docker-db-1.hidden.us-east-1.rds.amazonaws.com' \
                                                                                                   -e SITE_URL='staging.mysite.com' \
                                                                                                   -p 80:80 \
```


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


## Where to get help

[Gitter Chat](https://gitter.im/whitef0x0/tellform)

[Official Twitter](https://twitter.com/tellform_real)


## Sponsors

Does your company use TellForm? Help keep the project bug-free and feature rich by [sponsoring the project](https://opencollective.com/tellform#sponsor).

<a href="https://m.do.co/c/a86fd8843e09" style="padding: 30px 0">
	<img src="/docs/readme_logos/do_logo.png" height="30px">
</a>
<a href="https://getsentry.com/" style="padding: 30px 0">
	<img src="/docs/readme_logos/sentry_logo.png" height="30px">
</a>
<a href="https://statuspage.io/" style="padding: 30px 0">
	<img src="/docs/readme_logos/statuspage_logo.png" height="30px">
</a>
<br><br>
<a href="https://www.stickermule.com/unlock?ref_id=0939360701" style="padding: 30px 0">
	<img src="/docs/readme_logos/stickermule_logo.png" height="30px">
</a>
<a href="https://sparkpost.com/" style="padding: 30px 0">
	<img src="/docs/readme_logos/sparkpost_logo.png" height="30px">
</a>

<a href="https://therooststand.com/" style="padding: 30px 0">
	<img src="/docs/readme_logos/roost_logo.png" height="30px">
</a>

## Backers

Love our work and community? [Become a backer](https://opencollective.com/tellform).

<a href="https://opencollective.com/tellform#contributors" target="_blank"><img src="https://opencollective.com/elliot"></a>

<a href="https://opencollective.com/tellform#contributors" target="_blank"><img src="https://opencollective.com/aldrnv"></a>

## Contributors 

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/1160417?v=3" width="100px;"/><br /><sub>David Baldwynn</sub>](http://baldwynn.me)<br />[💻](https://github.com/tellform/TellForm/commits?author=whitef0x0 "Code") [🔧](#tool-whitef0x0 "Tools") [🚇](#infra-whitef0x0 "Infrastructure (Hosting, Build-Tools, etc)") [📖](https://github.com/tellform/TellForm/commits?author=whitef0x0 "Documentation") [💡](#example-whitef0x0 "Examples") [🎨](#design-whitef0x0 "Design") [🔍](#fundingFinding-whitef0x0 "Funding Finding") [👀](#review-whitef0x0 "Reviewed Pull Requests") [⚠️](https://github.com/tellform/TellForm/commits?author=whitef0x0 "Tests") | [<img src="https://avatars2.githubusercontent.com/u/313117?v=3" width="100px;"/><br /><sub>Samuel Laulhau</sub>](https://samuellaulhau.fr)<br />[💻](https://github.com/tellform/TellForm/commits?author=lalop "Code") [🌍](#translation-lalop "Translation") | [<img src="https://avatars0.githubusercontent.com/u/313507?v=3" width="100px;"/><br /><sub>Arun Pattnaik</sub>](http://arun.co)<br />[🎨](#design-arunpattnaik "Design") | [<img src="https://avatars0.githubusercontent.com/u/5405744?v=3" width="100px;"/><br /><sub>Thiên Toán</sub>](https://toanalien.com)<br />[🐛](https://github.com/tellform/TellForm/issues?q=author%3Atoanalien "Bug reports") [💻](https://github.com/tellform/TellForm/commits?author=toanalien "Code") [📖](https://github.com/tellform/TellForm/commits?author=toanalien "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/8615608?v=3" width="100px;"/><br /><sub>Adrian Portabales</sub>](https://github.com/AdrianP-)<br />[🐛](https://github.com/tellform/TellForm/issues?q=author%3AAdrianP- "Bug reports") [💻](https://github.com/tellform/TellForm/commits?author=AdrianP- "Code") | [<img src="https://avatars3.githubusercontent.com/u/8433587?v=3" width="100px;"/><br /><sub>Peter Thaleikis</sub>](https://github.com/spekulatius)<br />[📖](https://github.com/tellform/TellForm/commits?author=spekulatius "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/1247388?v=3" width="100px;"/><br /><sub>Mickaël Andrieu</sub>](http://www.mickael-andrieu.com)<br />[📖](https://github.com/tellform/TellForm/commits?author=mickaelandrieu "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/1522464?v=3" width="100px;"/><br /><sub>Ahmad Luqman</sub>](https://github.com/ahmad-luqman)<br />[📖](https://github.com/tellform/TellForm/commits?author=ahmad-luqman "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/3691490?v=3" width="100px;"/><br /><sub>Peter Dave Hello</sub>](https://www.peterdavehello.org/)<br />[📖](https://github.com/tellform/TellForm/commits?author=PeterDaveHello "Documentation") |
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
