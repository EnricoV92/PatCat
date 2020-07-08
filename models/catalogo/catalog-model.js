'use strict'

const path = require('path'),
    docCase = require(path.join(__dirname,'..','..','connections','catalogo','publicacionCatalogo-connection')),
    patronCatalogo = require(path.join(__dirname,'..','..','connections','catalogo','patronCatalogo-connection')),
    //vocabulary = require(path.join(__dirname,'.','connections','modelo-vectorial' ,'vocabulary-connection')),
    term = require(path.join(__dirname,'..','..','connections','modelo-vectorial' ,'term-connection')),
    docTerm = require(path.join(__dirname,'..','..','connections','modelo-vectorial' ,'doc-term-connection'))

var catalogModel = () => { }

catalogModel.saveDocumentCase = function(pathImg, fields, cb) {
    let newDocCase = new docCase ({
        procesoNegocio: fields.idGovProcess
    })
    newDocCase.save(function(err, doc) {
        if (err) cb(err)
        cb(null, doc)
    })
}

catalogModel.saveVocabulary = function(idDocCase, idGP, wordsToStore, cb) {
    let i = 0
    let idTerm
    let termFrecuency
    let vocabularyModel = require(path.join(__dirname,'..','modelo-vectorial' ,'vocabulary-model'))
    vocabularyModel.load(function(err, vocabulary) {
        //if(err) cb(err)  

        for (const key in wordsToStore) {
            if (wordsToStore.hasOwnProperty(key)) {
                let w = wordsToStore[key]
                    idTerm = key
                    termFrecuency = w.frecuency
                
                if (vocabulary[key] == null) {
                    let newTerm = new term ({
                        word: w.term,
                    })
                    newTerm.save(function (err) {
                        if (err) cb (err)
                    })
                    

                    let newdxt = new docTerm ({
                        idTerm: idTerm,
                        idDoc: idDocCase,
                        frecuency: termFrecuency
                    })
                    newdxt.save(function (err) {
                        if (err) cb(err)
                    })
                    
                    let termVocabulary = {
                        word: w.term,
                        maxFrecuency: w.frecuency,
                        nr: 1
                    }
                    vocabulary[key] = termVocabulary
                    
                } else {
                    if(vocabulary[key]['maxFrecuency'] < w.frecuency ) {
                        vocabulary[key]['maxFrecuency'] = w.frecuency
                    }
                    
                    vocabulary[key]['nr'] = vocabulary[key]['nr'] + 1
                    let newdxt = new docTerm ({
                        idTerm: idTerm,
                        idDoc: idDocCase,
                        frecuency: termFrecuency
                    })
                    newdxt.save(function (err) {
                        if (err) cb(err)
                    })
                }
            }
        }
        vocabularyModel.save(vocabulary, cb)
        
    }) 
}


module.exports = catalogModel
      