FROM  node:10-alpine
MAINTAINER OhMyForm <admin@ohmyform.com>

# Install some needed packages
RUN apk add --no-cache git \
	&& rm -rf /tmp/* \
	&& npm install --quiet -g grunt bower pm2 \
	&& npm cache clean --force \
	&& mkdir -p /opt/app/public/lib

# to expose the public folder to other containers
# VOLUME /opt/app

WORKDIR /opt/app

## TODO: Find a method that's better than this for passing ENV's if possible.
# Set default ENV
ENV NODE_ENV=development \
    SECRET_KEY=ChangeMeChangeMe \
    PORT=5000 \
    BASE_URL=localhost \
    SOCKET_PORT=20523 \
    SIGNUP_DISABLED=FALSE \
    SUBDOMAINS_DISABLED=FALSE \
    ENABLE_CLUSTER_MODE=FALSE \
    MAILER_EMAIL_ID=ohmyform@localhost \
    MAILER_PASSWORD="" \
    MAILER_FROM=ohmyform@localhost \
    MAILER_SERVICE_PROVIDER="" \
    MAILER_SMTP_HOST="" \
    MAILER_SMTP_PORT="" \
    MAILER_SMTP_SECURE="" \
    CREATE_ADMIN=FALSE \
    ADMIN_EMAIL=admin@ohmyform.com \
    ADMIN_USERNAME=root \
    ADMIN_PASSWORD=root \
    APP_NAME=OhMyForm \
    APP_KEYWORDS="" \
    APP_DESC="" \
    COVERALLS_REPO_TOKEN="" \
    GOOGLE_ANALYTICS_ID="" \
    RAVEN_DSN=""

# keep .dockerignore up to date
COPY . .

RUN npm install --only=production \
    && bower install --allow-root -f \
    && grunt build

# Run OhMyForm server
CMD ["node", "server.js"]
