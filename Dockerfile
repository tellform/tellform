# Build:
# docker build -t tellform-prod -f ./Dockerfile-production .
#
# Run:
# docker run -it tellform-prod

FROM  phusion/baseimage:0.9.19
MAINTAINER David Baldwynn <team@tellform.com>

# Install Utilities
RUN apt-get update -q  \
 && apt-get install -yqq \
 curl \
 ant \
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

# Install NPM Global Libraries
RUN npm install --quiet -g grunt bower pm2 && npm cache clean

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

# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Add npm package.json
COPY ./package.json /opt/tellform/package.json
RUN npm install --only=production --quiet

# Run TellForm server
CMD ["node", "server.js"]
