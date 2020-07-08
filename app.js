'use strict'
const express = require('express'),
    bodyParser = require("body-parser"),
    path = require('path'),
    publicDir = express.static(path.join(__dirname,'public')),
    uploadDir = express.static(path.join(__dirname,'uploads')),
    viewDir = path.join(__dirname,'views'),
    catalogRouter = require(path.join(__dirname,'routes','catalog-router')),
    motorRouter = require(path.join(__dirname,'routes','motor-router')),
    port = (process.env.PORT || 4000)

var app = express()

app
    .set('views', viewDir)
    .set('view engine', 'pug')
    .set('port', port)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(publicDir)
    .use(uploadDir)
    .use(catalogRouter)
    .use(motorRouter)
    

module.exports = app