'use strict'

const express = require('express'),
    path = require('path'),
    catalogController = require(path.join(__dirname,'..','controllers','catalog-controller')),
    router = express.Router()

router
    
    .get('/catalog/newDocumentCase', catalogController.sendPageNewDocumentCase)
    .post('/catalog/newDocumentCase', catalogController.newDocumentCase)

module.exports = router