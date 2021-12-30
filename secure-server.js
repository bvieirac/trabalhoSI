const fs = require('fs')
const express = require('express')
const https = require('https')
const path = require("path");

var options = {
    key: fs.readFileSync('server/server-key.pem'),
    cert: fs.readFileSync('server/server-cert.pem'),
    ca: fs.readFileSync('server/server-cert.pem'),
    requestCert: true,
    rejectUnauthorized: false 
  }; 

const app = express()

app.get('/', (req, res) => {
    res.send('<a href="login">Auth</a>')
})

app.get('/login', (req, res) => {
    const cert = req.socket.getPeerCertificate()

    if (req.client.authorized) {
        res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`)
        console.log(`${cert}`)

    } else if (cert.subject) {
        res.status(403)
           .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
           console.log(`${cert}`)
    } else {
        res.status(401)
            .send(`Sorry, but you need to provide a client certificate to continue.`)
    }

})

var server = https
    .createServer(options, app)
    .listen(4433)

server.on('uncaughtException', function (e) {
    // Handle your error here
    console.log(e);
  });
  
  console.log('Listening @4433');