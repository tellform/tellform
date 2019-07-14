FROM  node:10-alpine
MAINTAINER OhMyForm <admin@ohmyform.com>

# Install some needed packages
RUN apk add --no-cache \
	git \
	&& rm -rf /tmp/*

## TODO: Crush these consecutive RUN's into a single run if possible.
# Install NPM Global Libraries
RUN npm install --quiet -g grunt bower pm2 && npm cache clean --force

WORKDIR /opt/app
RUN mkdir -p /opt/app/public/lib

## TODO: Optimize layers here as copy layers can be easily reduced if saner COPY usage is achieved.
# Add bower.json
COPY bower.json /opt/app/bower.json
COPY .bowerrc /opt/app/.bowerrc

COPY ./process.yml /opt/app/process.yml
COPY ./app /opt/app/app
COPY ./public /opt/app/public
COPY ./config /opt/app/config
COPY ./gruntfile.js /opt/app/gruntfile.js
COPY ./server.js /opt/app/server.js
COPY ./scripts/create_admin.js /opt/app/scripts/create_admin.js

## TODO: Find a method that's better than this for passing ENV's if possible.
# Set default ENV
ENV NODE_ENV=development
ENV SECRET_KEY=ChangeMeChangeMe
#ENV MONGODB_URI=mongodb://mongo/ohmyform
#ENV REDIS_URL=redis://redis:6379
ENV PORT=5000
ENV BASE_URL=localhost
ENV SOCKET_PORT=20523
ENV SIGNUP_DISABLED=FALSE
ENV SUBDOMAINS_DISABLED=FALSE
ENV ENABLE_CLUSTER_MODE=FALSE
ENV MAILER_EMAIL_ID=ohmyform@localhost
ENV MAILER_PASSWORD=
ENV MAILER_FROM=ohmyform@localhost
ENV MAILER_SERVICE_PROVIDER=
ENV MAILER_SMTP_HOST=
ENV MAILER_SMTP_PORT=
ENV MAILER_SMTP_SECURE=

ENV CREATE_ADMIN=FALSE
ENV ADMIN_EMAIL=admin@ohmyform.com
ENV ADMIN_USERNAME=root
ENV ADMIN_PASSWORD=root

ENV APP_NAME=OhMyForm
ENV APP_KEYWORDS=
ENV APP_DESC=

# optional ENV settings
ENV COVERALLS_REPO_TOKEN=
ENV GOOGLE_ANALYTICS_ID=
ENV RAVEN_DSN=

## TODO: Determine if it's necessary to have this COPY be it's own separate operation.
# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Add npm package.json
COPY ./package.json /opt/app/package.json
RUN npm install --only=production --quiet
RUN bower install --allow-root
RUN grunt build
## TODO: Determine if it would be possible to do a multi stage container where the prebuilt app is copied with nothing else from the build step.

## TODO: Make this configure things on startup in a sane way or don't if the operator passes any configuration files perhaps via a start.sh.
# Run OhMyForm server
CMD ["node", "server.js"]
