var fs = require('fs'); 
var https = require('https'); 
var options = {
  key: fs.readFileSync('server/server-key.pem'),
  cert: fs.readFileSync('server/server-cert.pem'),
  ca: fs.readFileSync('CA1-int.pem'),
  requestCert: true,
  rejectUnauthorized: false 
}; 

var server = https.createServer(options, function (req, res) { 
  console.log(new Date()+' '+ 
    req.socket.remoteAddress+' '+ 
    //req.socket.getPeerCertificate().subject.CN+' '+ 
    req.method+' '+req.url); 
  res.writeHead(200); 
  res.end("Secure Hello World with node.js\n"); 
}).listen(4433);

server.on('uncaughtException', function (e) {
  // Handle your error here
  console.log(e);
});

console.log('Listening @4433');