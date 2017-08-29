#!/bin/bash

line=$(head -n 1 /etc/hosts)
echo "$line form.sg $(hostname)" >> /etc/hosts

# Restart sendmail
service sendmail restart

# Run Server
npm start
