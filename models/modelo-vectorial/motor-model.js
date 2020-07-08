'use strict'

const path = require('path'),
    docTerms = require(path.join(__dirname,'..','..','connections','modelo-vectorial' ,'doc-term-connection')),
    publicacionCatalogo = require(path.join(__dirname,'..','..','connections','catalogo','publicacionCatalogo-connection')),
    patronesCatalogo = require(path.join(__dirname,'..','..','connections','catalogo','patronCatalogo-connection'))

var motorModel = () => {}

motorModel.countDocumentCases = function (cb) {
    publicacionCatalogo.count({}, function(err, c) {
        if(err) cb(err)
        cb(null, c)
    })
}

motorModel.countDocumentCases = function() {
    return publicacionCatalogo
        .count({})
        .exec()
}


motorModel.findDocsTerm = function (idTv) {
    return docTerms
        .find({idTerm: idTv})
        .exec()
}

motorModel.findDocCaseByGP = function(gpName) {
    return publicacionCatalogo
        .find({procesoNegocio: gpName })
        .exec()

}

motorModel.findDocCase = function(idDoc, gpName) {
    return publicacionCatalogo
        .find({_id: idDoc, procesoNegocio: gpName})
        .exec()
}

motorModel.searchPatternbyKey = function (keys) {
    console.log(`"${keys}"`)
    return patronesCatalogo
        .find( { $text: { $search: `"${keys}"`  }})
        .exec()
}

motorModel.getKeys = function (proceso, cb) {
    publicacionCatalogo
        .find( { procesoNegocio : proceso }, { patronesCatalogo : 1, _id : 0 } )
        .exec(function (err, publicaciones) {
            if(err) cb(err)
            patronesCatalogo
                .find({ _id: { $in : publicaciones.patronesCatalogo }}, { patronKeys : 1, _id : 0 })
                .exec(function (err, keys) {
                    if(err) cb(err)
                    cb(null, keys)
                })
        })
}   
    

module.exports = motorModel