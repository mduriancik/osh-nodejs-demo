'use strict';

const express = require('express');
const request = require('request');
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
    </body></html>`);
});

app.get('/get', function (req, res) {
  console.log('get:', req.query);
  request.get(req.query.path, function(error, response, body) {
    if (error) {
        console.log('error: ' + error)
        res.send(error);
    } else {

      console.log(response.statusCode)
      console.log(response.headers['content-type'])
      console.log(response.body)
      res.send(
        `<b>request</b> ${req.query.path} -> ${response.statusCode}
        <br>
        <b>------------------------------------------------------</b>
        <br>
        <pre>${body}</pre>`
      );
    }
  });
});

app.get('/hello', function (req, res) {
  res.send('hello!');
})



app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);
