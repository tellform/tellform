FROM node:10 AS builder
MAINTAINER OhMyForm <admin@ohmyform.com>

WORKDIR /usr/src/app

# just copy everhing
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:10-alpine

COPY --from=builder /usr/src/app /usr/src/app

EXPOSE 3000
CMD [ "yarn", "start:prod" ]
