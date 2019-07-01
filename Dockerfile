# Build:
# docker build -t tellform-prod -f ./Dockerfile-production .
#
# Run:
# docker run -it tellform-prod

FROM  node:10-alpine
MAINTAINER Arielle Baldwynn <team@tellform.com>

# Install some needed packages
RUN apk add --no-cache \
	git \
	&& rm -rf /tmp/*

# Install NPM Global Libraries
RUN npm install --quiet -g grunt bower pm2 && npm cache clean --force

WORKDIR /opt/tellform
RUN mkdir -p /opt/tellform/public/lib

# Add bower.json
COPY bower.json /opt/tellform/bower.json
COPY .bowerrc /opt/tellform/.bowerrc

COPY ./process.yml /opt/tellform/process.yml
COPY ./app /opt/tellform/app
COPY ./public /opt/tellform/public
COPY ./config /opt/tellform/config
COPY ./gruntfile.js /opt/tellform/gruntfile.js
COPY ./server.js /opt/tellform/server.js
COPY ./scripts/create_admin.js /opt/tellform/scripts/create_admin.js

# Set default ENV
ENV NODE_ENV=development
ENV SECRET_KEY=ChangeMeChangeMe
#ENV MONGODB_URI=mongodb://mongo/tellform
#ENV REDIS_URL=redis://redis:6379
ENV PORT=5000
ENV BASE_URL=localhost
ENV SOCKET_PORT=20523
ENV SIGNUP_DISABLED=FALSE
ENV SUBDOMAINS_DISABLED=FALSE
ENV ENABLE_CLUSTER_MODE=FALSE
ENV MAILER_EMAIL_ID=tellform@localhost
ENV MAILER_PASSWORD=
ENV MAILER_FROM=tellform@localhost
ENV MAILER_SERVICE_PROVIDER=
ENV MAILER_SMTP_HOST=
ENV MAILER_SMTP_PORT=
ENV MAILER_SMTP_SECURE=

ENV CREATE_ADMIN=FALSE
ENV ADMIN_EMAIL=admin@localhost
ENV ADMIN_USERNAME=root
ENV ADMIN_PASSWORD=root

ENV APP_NAME=Tellform
ENV APP_KEYWORDS=
ENV APP_DESC=

# optional ENV settings
ENV COVERALLS_REPO_TOKEN=
ENV GOOGLE_ANALYTICS_ID=
ENV RAVEN_DSN=

# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Add npm package.json
COPY ./package.json /opt/tellform/package.json
RUN npm install --only=production --quiet
RUN grunt build

# Run TellForm server
CMD ["node", "server.js"]
