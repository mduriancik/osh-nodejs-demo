'use strict';

const express = require('express');
const os = require('os');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', function (req, res) {
  let env = JSON.stringify(process.env, null, ' ');
  let version = require('./package.json').version;
  res.send(
    `<html><body>
    <h3>System Infos (v: ${version})</h3>
    <b>os: </b> ${os.type()}, ${os.release()}<br><br>
    <b>host: </b>${os.hostname()}<br><br>
    <b>network: </b> 
      <pre>${JSON.stringify(os.networkInterfaces(), null, ' ')}</pre><br>
    <b>cpus: </b> <pre>${JSON.stringify(os.cpus(), null, ' ')}</pre><br>
    <b>env: </b>
    <pre>${env}</pre>
    </body></html>`);
});

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);

