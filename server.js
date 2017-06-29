'use strict';

const express = require('express');
const os = require('os');
const fs = require('fs');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const CFG_MAP = '/etc/osh-nodejs-demo/osh-nd-cfgmap.config';

// App
const app = express();
app.get('/', function (req, res) {
  let env = JSON.stringify(process.env, null, ' ');
  let version = require('./package.json').version;
  // let cfg = fs.readFileSync(CFG_MAP).toString();
  let cfgDir = fs.readdirSync('/etc/osh-nodejs-demo/');
  if (cfgDir && cfgDir.length===1) {
    var cfg =  fs.readFileSync('/etc/osh-nodejs-demo/' + cfgDir[0]).toString();
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
    <pre>${cfgDir}</pre>
    <b>cfg: </b>
    <pre>${cfg}</pre>
    </body></html>`);
});

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);

