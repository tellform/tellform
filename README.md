TellForm 2.0.0
========

[![Build Status](https://travis-ci.org/whitef0x0/tellform.svg?branch=master)](https://travis-ci.org/whitef0x0/tellform)
![Project Status](https://img.shields.io/badge/status-2.0.0-green.svg)
[![Code Climate](https://codeclimate.com/github/whitef0x0/tellform/badges/gpa.svg)](https://codeclimate.com/github/whitef0x0/tellform)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3491e86eb7194308b8fc80711d736ede)](https://www.codacy.com/app/david-baldwin/tellform?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=whitef0x0/tellform&amp;utm_campaign=Badge_Grade)
[![Gitter](https://badges.gitter.im/whitef0x0/tellform.svg)](https://gitter.im/whitef0x0/tellform?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

TellForm is an *opensource alternative to TypeForm* built ontop of NodeJS that can create [stunning mobile-ready forms](https://tellform.com/examples) , surveys and questionnaires.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/whitef0x0/tellform/tree/master)

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

## Sponsors

Does your company use TellForm? Help keep the project bug-free and feature rich by [sponsoring the project](https://opencollective.com/tellform#sponsor).

<a href="https://m.do.co/c/a86fd8843e09">
	<img src="https://www.digitalocean.com/assets/media/logos-badges/png/DO_Logo_Horizontal_Blue-3db19536.png" width="70px">
</a>
<a href="https://getsentry.com/">
	<img src="https://raw.githubusercontent.com/docker-library/docs/831b07a52f9ff6577c915afc41af8158725829f4/sentry/logo.png"
	width="70px">
</a>
<a href="https://statuspage.io/">
	<img src="https://dka575ofm4ao0.cloudfront.net/assets/base/logos/common-aececb0b4319b8fb61ac5b47a6983f96.png" width="70px">
</a>

<a href="https://www.stickermule.com/unlock?ref_id=0939360701">
	<img src="http://bcsrq.com/wp-content/uploads/2014/04/StickerMuleLogo300.png" width="70px">
</a>
<a href="https://sparkpost.com/">
	<img src="https://app.sparkpost.com/assets/images/sparkpost-logo-color.svg" width="70px">
</a>

<a href="https://therooststand.com/">
	<img src="https://cdn.shopify.com/s/files/1/0192/8184/t/11/assets/logo.png?2608345842081938086" width="70px">
</a>

## Backers

Love our work and community? [Become a backer](https://opencollective.com/tellform).

<a href="https://opencollective.com/tellform/backers/0/website" target="_blank"><img src="https://opencollective.com/apex/backers/0/avatar"></a>

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

## Where to get help

[Gitter Chat](https://gitter.im/whitef0x0/tellform)

[Official Twitter](https://twitter.com/tellform_real)

## Contributor list 

[David Baldwynn](https://github.com/whitef0x0/)

[Samuel Laulhau](https://github.com/lalop)

[Arun Pattnaik](https://github.com/arunpattnaik)

## Mentions on the Web

[Mister Ad](http://start.mister-ad.biz/newsticker/open-source-alternative-zu-typeform-tellform-in-der-kurzvorstellung/)

[t3n.de](http://t3n.de/news/open-source-alternative-typeform-tellform-707295/)

[BootCSS Expo](http://expo.bootcss.com/)

[Product Hunt](https://www.producthunt.com/tech/tellform)

[Hacker News Post](https://news.ycombinator.com/item?id=11711095)

[Reddit Posts](https://www.reddit.com/domain/tellform.com/)

[Betapage](https://betapage.co/startup/tellform)

[Opensource.com](http://opensource.com/article/17/2/tools-online-surveys-polls)

## Credits
Inspired/built off the great work of the [MeanJS team](https://github.com/meanjs/) and [Typeform](http://typeform.com)
