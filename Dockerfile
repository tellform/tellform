# Build:
# docker build -t tellform -f ./Dockerfile .
#
# Run:
# docker run -it tellform
FROM  phusion/baseimage:0.9.19
MAINTAINER David Baldwynn <team@tellform.com>

# 3000 = TellForm server, 35729 = livereload, 8080 = node-inspector
EXPOSE 3000 35729 8080

# Set development environment as default
ENV NODE_ENV development
ENV BASE_URL tellform.dev
ENV PORT 3000

# Install Utilities
RUN apt-get update -q \
 && apt-get install -yqq \
 curl \
 git \
 gcc \
 make \
 build-essential \
 libkrb5-dev \
 python \
 sudo \
 apt-utils \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install MEAN.JS Prerequisites
RUN npm install --quiet -g grunt bower && npm cache clean

RUN mkdir -p /opt/tellform/public/lib
WORKDIR /opt/tellform

# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Add npm package.json
COPY package.json /opt/tellform/package.json
RUN npm install --production
RUN mv ./node_modules ./node_modules.tmp && mv ./node_modules.tmp ./node_modules && npm install

# Add bower.json
COPY bower.json /opt/tellform/bower.json
COPY .bowerrc /opt/tellform/.bowerrc

COPY ./app /opt/tellform/app
COPY ./public /opt/tellform/public
COPY ./config /opt/tellform/config
COPY ./gruntfile.js /opt/tellform/gruntfile.js
COPY ./server.js /opt/tellform/server.js
COPY ./.env /opt/tellform/.env
COPY ./scripts/create_admin.js /opt/tellform/scripts/create_admin.js

# Run TellForm server
CMD npm start
