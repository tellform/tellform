var fs = require('fs')
var pkey = fs.readFileSync('/etc/letsencrypt/live/register.earlybird.camp/privkey.pem')
var cert = fs.readFileSync('/etc/letsencrypt/live/register.earlybird.camp/fullchain.pem')

var express = require('express') 
var app = express() 
app.get('/', (q, s) => s.send('hello')) 
app.listen(80) 

var https = require('https') 
https.createServer({key: pkey, cert: cert}, app).listen(443)
