'use strict'

const path = require('path'),
    govProcesses = require(path.join(__dirname,'..','..','connections','catalogo','procesoNegocio-connection'))

var govProcessesModel = () => { }

govProcessesModel.findGovProcesses = function (cb) {
    govProcesses
        .find({}, '_id procesoNombre')
        .exec(function (err, docs) {
            if(err) cb(err)
            cb(null, docs)
        })
}
module.exports = govProcessesModel