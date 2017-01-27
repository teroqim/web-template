'use strict'
const express = require('express')
const app = express()
const path = require('path')
const compression = require('compression')
const env = require('./server-src/env.js')
const bodyParser = require('body-parser')

// CORS
function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}
app.use(allowCrossDomain)

// Compress (zip) files
app.use(compression())

// Use static assets
const staticDir = path.join(__dirname, 'client-build')
app.use(express.static(staticDir, {maxAge: 300, index: false}))

// Set port for express
app.set('port', env.runPort)

// Parse json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'))
})

// Default catch-all: route into react app
app.get('*', (req, res) => {
  res.redirect('/#'+req.path)
});

app.listen(app.get('port'), function() {
  console.log(`Node app is running at localhost: ${app.get('port')}`)
});
