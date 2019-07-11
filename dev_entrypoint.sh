#!/bin/bash
## TODO: Reconsider this as I think that it's no longer relevant.
line=$(head -n 1 /etc/hosts)
echo "$line tellform.dev $(hostname)" >> /etc/hosts

# Restart sendmail
service sendmail restart

# Run Server
npm start
