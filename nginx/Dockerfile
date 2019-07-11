FROM alpine:edge
RUN apk add --no-cache nginx certbot openssl python py-jinja2

COPY *.py /
COPY conf /conf

RUN chmod +x /start.py
RUN chmod +x /letsencrypt.py
RUN chmod +x /config.py

ENV NODE_ENV=development
ENV PORT=5000
ENV SOCKET_PORT=20523
ENV TLS_FLAVOR=notls
ENV BASE_URL=localhost
ENV SUBDOMAIN_URL=*.localhost
ENV SOCKETS_URL=ws.localhost

CMD /start.py
