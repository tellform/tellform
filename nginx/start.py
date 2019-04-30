#!/usr/bin/python

import os
import subprocess

#Set default port
if not os.environ["PORT"]:
	os.environ["PORT"] = "5000"

#Set default sockets port
if not os.environ["SOCKET_PORT"]:
	os.environ["SOCKET_PORT"] = "20523"

# Actual startup script
if not os.path.exists("/certs/dhparam.pem") and os.environ["TLS_FLAVOR"] != "notls":
    os.system("openssl dhparam -out /certs/dhparam.pem 2048")

if os.environ["TLS_FLAVOR"] == "letsencrypt":
    subprocess.Popen(["/letsencrypt.py"])
elif os.environ["TLS_FLAVOR"] == "cert":
	if not os.path.exists("/certs/cert.pem"):
		os.system("openssl req -newkey rsa:2048 -x509 -keyout /certs/key.pem -out /certs/cert.pem -days 365 -nodes -subj '/C=NA/ST=None/L=None/O=None/CN=" + os.environ["BASE_URL"] + "'")

subprocess.call(["/config.py"])
os.execv("/usr/sbin/nginx", ["nginx", "-g", "daemon off;"])