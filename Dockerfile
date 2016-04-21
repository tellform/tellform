# DOCKER-VERSION 1.7.0

FROM node:4

WORKDIR /usr/src/app

# Install Mean.JS Prerequisites
RUN npm install -g grunt-cli bower

# currently only works for development
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["grunt default"]
