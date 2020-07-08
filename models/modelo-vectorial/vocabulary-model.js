'use strict'

const fs = require('fs'),
    path = require('path'),
    pathVocabulary = path.join(__dirname, '..', '..', 'myVocabulary.json')
    


var vocabulary = () => {}

vocabulary.save = function (voc, cb) {
    console.log('entro al save y se rompio')
    let myVocabulary
        myVocabulary = JSON.stringify(voc)
        fs.writeFile(pathVocabulary, myVocabulary, 'utf8', function (err) {
            if(err) cb(err)
            cb(null) 
        })
    
}

vocabulary.load = function (cb) {
    
    fs.readFile(pathVocabulary, 'utf8', function(err, data) {
        if(err) cb(err) 
        let myVocabulary
        
        if (data.length == 0) {
            myVocabulary = {}
            cb(null, myVocabulary)
        } else {
            myVocabulary = JSON.parse(data)
            cb(null, myVocabulary) 
        }
    })
}

vocabulary.addTerm = function () {

}

module.exports = vocabulary

