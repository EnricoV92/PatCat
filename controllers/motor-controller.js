'use strict'

const path = require('path'),
      motorService = require(path.join(__dirname,'..','services','motor-service'))
      

var motorController = () => { }

motorController.sendIndex = function (req, res, next) {
      res.end('todo joya')
}

motorController.sendPageSearchPattern = function(req, res, next) {
      motorService.sendPageSearchPattern(function (err, docs) {
            if(err) res.status(500).send(err)
            let locals = {
                  dataProcesos: docs
            } 
            res.status(200).render(path.join('pug','page-searchPattern'), locals)     
      })
}

motorController.searchQueryPattern = function(req, res, next) {
      motorService.searchQueryPattern(req, function (err, respuesta) {
            if(err) res.status(500).send(err)
            let locals = {
                  dataDocuments: respuesta
            }
            
            
            
            res.status(200).render(path.join('pug', 'page-catalog'), locals)
            //res.status(200).end('encontro el doc' + locals.dataDocuments[0]['dataDoc'][0]['_id'])
      })
}

motorController.getKeys = function(req, res) {
      motorService.getKeys(req, function(err, keys) {
            if(err) res.status(500).send(err)
            res.send('keys ok')
      })
}

motorController.searchPatternbyKey = function(req, res) {
      motorService.searchPatternbyKey(req, function (err, respuesta) {
            if(err) res.status(500).send(err)
            let locals = {
                  dataDocuments: respuesta
            }
            
            res.json(JSON.stringify(respuesta))
            //res.status(200).render(path.join('pug', 'page-catalog'), locals)
      })
}

module.exports = motorController