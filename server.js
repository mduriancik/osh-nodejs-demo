'use strict';

const express = require('express');
const os = require('os');
const fs = require('fs');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', function (req, res) {
  let env = JSON.stringify(process.env, null, ' ');
  let version = require('./package.json').version;

  // let cfg = fs.readFileSync(CFG_MAP).toString();
  let cfgmapVolume = fs.readdirSync('/etc/osh-nodejs-demo');
  let cfg = '?';
  try{
    cfg =  fs.readFileSync('/etc/osh-nodejs-demo/example.property.file');
  } catch (err){
    console.error(err);
  }

  res.send(
    `<html><body>
    <h3>System Infos (v: ${version})</h3>
    <b>os: </b> ${os.type()}, ${os.release()}<br><br>
    <b>host: </b>${os.hostname()}<br><br>
    <b>network: </b> 
      <pre>${JSON.stringify(os.networkInterfaces(), null, ' ')}</pre><br>
    <b>cpus: </b> <pre>${JSON.stringify(os.cpus(), null, ' ')}</pre><br>
    <b>env: </b>
    <pre>${env}</pre><br>
    <b>cfg dir: </b>
    <pre>${cfgmapVolume}</pre>
    <b>cfg: </b>
    <pre>${cfg}</pre>
    </body></html>`);
});

app.get('/ls', function (req, res) {
  console.log('query(/ls):', req.query);
  let dir = fs.readdirSync(req.query.path);
  res.send(dir);
});


app.get('/more', function (req, res) {
  console.log('query(/more):', req.query.path);
  // res.set('Content-Type', 'text/plain');
  res.sendFile(req.query.path);
  // let file = fs.readFileSync(req.query.path).toString();
  // res.send(file);
});

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);

