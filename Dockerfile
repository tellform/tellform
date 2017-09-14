FROM  phusion/baseimage:0.9.19
MAINTAINER Leonard Loo <leonard@data.gov.sg>

# 5000 = App server, 35729 = livereload, 8080 = node-inspector
EXPOSE 5000 35729 8080

ENV NODE_ENV development

# Install Utilities
RUN apt-get update -q \
 && apt-get install -yqq \
 curl \
 ant \
 default-jdk \
 git \
 gcc \
 make \
 build-essential \
 libkrb5-dev \
 python \
 sudo \
 apt-utils \
 sendmail \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install MEAN.JS Prerequisites
RUN npm install --quiet -g grunt bower && npm cache clean

RUN mkdir -p /opt/formsg/public/lib
WORKDIR /opt/formsg

# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Add npm package.json
COPY package.json /opt/formsg/package.json
RUN npm install
RUN mv ./node_modules ./node_modules.tmp && mv ./node_modules.tmp ./node_modules && npm install

# Add bower.json
COPY bower.json /opt/formsg/bower.json
COPY .bowerrc /opt/formsg/.bowerrc
RUN bower install

COPY ./app /opt/formsg/app
COPY ./public /opt/formsg/public
COPY ./config /opt/formsg/config
COPY ./gruntfile.js /opt/formsg/gruntfile.js
COPY ./server.js /opt/formsg/server.js
COPY ./scripts /opt/formsg/scripts
COPY ./seed-data /opt/formsg/seed-data

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
