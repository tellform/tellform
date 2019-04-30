FROM alpine:edge
RUN apk add --no-cache nginx certbot openssl python py-jinja2

COPY *.py /
COPY conf /conf

RUN chmod +x /start.py
RUN chmod +x /letsencrypt.py
RUN chmod +x /config.py

CMD /start.py
