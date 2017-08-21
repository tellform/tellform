Forma
========

> Forked from Tellforms (https://github.com/tellform/tellform)

## Local deployment

### Prerequisites

Make you sure have the following packages and versions on your machine:
```
"node": ">=6.11.2"
"npm": ">=3.3.6"
"bower": "1.8.0"
"grunt-cli": "1.2.0"
```

### Install dependencies

```
$ npm install
```

### Prepare .env file:
Create `.env` file at project root folder. Fill in `MAILER_SERVICE_PROVIDER`, `MAILER_EMAIL_ID`, `MAILER_PASSWORD` and `MAILER_FROM`.
```
APP_NAME=Forma
APP_DESC=
APP_KEYWORDS=
NODE_ENV=development
BASE_URL=localhost:5000
PORT=5000
username=forma_admin
MAILER_SERVICE_PROVIDER=<TO-FILL-IN>
MAILER_EMAIL_ID=<TO-FILL-IN>
MAILER_PASSWORD=<TO-FILL-IN>
MAILER_FROM=<TO-FILL-IN>
SIGNUP_DISABLED=false
SUBDOMAINS_DISABLED=true
DISABLE_CLUSTER_MODE=true
GOOGLE_ANALYTICS_ID=
RAVEN_DSN=
PRERENDER_TOKEN=
COVERALLS_REPO_TOKEN=
```

### Build docker image

```
$ docker build -t forma-tellform .
```

### Run docker containers

Create and start mongo & redis docker container:
```
$ docker run -p 27017:27017 -d --name forma-mongo mongo
$ docker run -p 127.0.0.1:6379:6379 -d --name forma-redis redis
```

Start Forma's MEAN container:
```
$ docker run --rm -p 5000:5000 --link forma-redis:redis-db --link forma-mongo:db --name forma-tellform forma-tellform
```

Your application should run on port 5000 or the port you specified in your .env file, so in your browser just go to [http://localhost:5000](http://localhost:5000)

## Remote deployment

### Prerequisites

Instructions here are tested on an Amazon Linux AMI. First, set up your fresh new AMI by setting the environment variables:

```
$ sudo vim /etc/environment

LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```

Next, update and install build tools:
```
$ sudo yum update -y
$ sudo yum groupinstall "Development Tools" -y
```

### Install docker

```
$ sudo yum install -y docker
$ sudo service docker start
```

To ensure docker can be run without `sudo` each time:
```
$ sudo usermod -a -G docker ec2-user
$ logout
```

SSH back in, and test that `docker info` runs successfully.

### Clone our repo

```
$ git clone https://github.com/datagovsg/forma-tellform.git
```

### Prepare .env file

The `.env` file for remote deployment (or production) is slightly different from that of local deployment.
Create `.env` file at project root folder. Similarly, fill in `MAILER_SERVICE_PROVIDER`, `MAILER_EMAIL_ID`, `MAILER_PASSWORD` and `MAILER_FROM`. Note that now you have to fill in the public IP of your instance in `BASE_URL` and the private IP of your instance in `DB_1_PORT_27017_TCP_ADDR`.

```
APP_NAME=Forma
APP_DESC=
APP_KEYWORDS=
NODE_ENV=production
BASE_URL=<PUBLIC IP OF YOUR INSTANCE>
DB_1_PORT_27017_TCP_ADDR=<PRIVATE IP OF YOUR INSTANCE>
PORT=4545
username=forma_admin
MAILER_SERVICE_PROVIDER=<TO-FILL-IN>
MAILER_EMAIL_ID=<TO-FILL-IN>
MAILER_PASSWORD=<TO-FILL-IN>
MAILER_FROM=<TO-FILL-IN>
SIGNUP_DISABLED=false
SUBDOMAINS_DISABLED=true
DISABLE_CLUSTER_MODE=true
GOOGLE_ANALYTICS_ID=
RAVEN_DSN=
PRERENDER_TOKEN=
COVERALLS_REPO_TOKEN=
```

### Run mongo and redis first 

Download mongo and redis images and run them:
```
$ docker run -p 27017:27017 -d --name forma-mongo mongo
$ docker run -p 6379:6379 -d --name forma-redis redis
```

### Install npm, bower and grunt

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash . ~/.nvm/nvm.sh
$ nvm install 6.11.2
$ npm install -g bower
$ npm install -g grunt-cli
$ npm install -g grunt
```

### Install dependencies

```
$ npm install --production
```

### Build docker image

```
$ docker build -t forma-prod -f ./Dockerfile-production .
```

### Run MEAN docker container

Create and start mongo & redis docker container:
```
$ docker run --rm -p 80:4545 --link forma-redis:redis-db --link forma-mongo:db --name forma-prod forma-prod
```

Your application should run on the default port 80, so in your browser just go to http://<PUBLIC IP>.

## Support 

Please contact Leonard Loo (leonard@data.gov.sg) for any details.

