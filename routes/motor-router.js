'use strict'
const express = require('express'),
    path = require('path'),
    motorController = require(path.join(__dirname,'..','controllers','motor-controller'))
var router = express.Router()

router
    .get('/', motorController.sendIndex)
    .get('/searchPattern', motorController.sendPageSearchPattern)
    .post('/searchPattern', motorController.searchPatternbyKey)
    .get('/mykeys', motorController.getKeys)
module.exports = router