'use strict'

const path = require('path'),
    catalogService = require(path.join(__dirname,'..','services','catalog-service'))
      
var catalogController = () => { }

catalogController.sendIndex = function (req, res, next) {
        res.end('todo joya')
}

catalogController.sendPageNewDocumentCase = function (req, res, next) {
    catalogService.sendPageNewDocumentCase(function(err, docs) {
        if(err) res.status(500).send(err)
        let locals = {
            dataProcesos : docs
        }
        res.status(200).render(path.join('pug','page-newDocumentCase'), locals)
    })
}
catalogController.newDocumentCase = function (req, res, next) {
    catalogService.newDocumentCase(req, function (err) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).redirect('/')
        }
    })
}

module.exports = catalogController