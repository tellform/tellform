#!/bin/bash

line=$(head -n 1 /etc/hosts)
line2=$(echo $line | awk '{print $2}')
echo "$line forma.sg $(hostname)" >> /etc/hosts

# Restart sendmail
service sendmail restart

# Run TellForm server
npm start
