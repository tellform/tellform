TellForm Installation Instructions
==================================


## Table of Contents  

- [Local Deployment with Docker](#local-deployment-with-docker)
- [AWS AMI Deployment](#aws-ami-deployment)


## Local deployment with Docker

Refer to [docker_files](https://github.com/tellform/docker_files).

## AWS AMI Deployment

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

### Install docker-compose

```
$ sudo -i
$ curl -L https://github.com/docker/compose/releases/download/1.15.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ logout
```

### Clone our repo

```
$ git clone https://github.com/datagovsg/formsg.git
```

### Prepare .env file

The `.env` file for remote deployment (or production) is slightly different from that of local deployment.
Create `.env` file at project root folder. Similarly, fill in `MAILER_SERVICE_PROVIDER`, `MAILER_EMAIL_ID`, `MAILER_PASSWORD` and `MAILER_FROM`. Note that now you have to fill in the public IP of your instance in `BASE_URL`.

```
APP_NAME=FormSG
APP_DESC=
APP_KEYWORDS=
NODE_ENV=production
BASE_URL=<PUBLIC IP OF YOUR INSTANCE>
PORT=4545
DB_PORT_27017_TCP_ADDR=<PRIVATE IP OF YOUR MONGODB HOST>
REDIS_DB_PORT_6379_TCP_ADDR=formsg-redis
username=formsg_admin
MAILER_SERVICE_PROVIDER=<TO-FILL-IN>
MAILER_EMAIL_ID=<TO-FILL-IN>
MAILER_PASSWORD=<TO-FILL-IN>
MAILER_FROM=<TO-FILL-IN>
SIGNUP_DISABLED=false
SUBDOMAINS_DISABLED=true
DISABLE_CLUSTER_MODE=true
RAVEN_DSN=
PRERENDER_TOKEN=
COVERALLS_REPO_TOKEN=
```

### Install npm, bower and grunt

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
$ . ~/.nvm/nvm.sh
$ nvm install 6.11.2
$ npm install -g bower
$ npm install -g grunt-cli
$ npm install grunt
```

### Install dependencies

```
$ npm install --production
```

### Build docker image

```
$ docker-compose -f docker-compose-production.yml build
```

### Run docker containers

```
$ docker run -d -p 27017:27017 -v /data/db:/data/db --name formsg-mongo mongo
$ docker-compose -f docker-compose-production.yml up
```

Note that unlike dev, mongo container is run separately from compose. Hence `docker-compose down` does not take down the mongo container each time. Your application should run on the default port 80, so in your browser just go to your public IP.

## Support

Please contact David Baldwynn (team@tellform.com) for any details.