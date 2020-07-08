'use strict' 

const path = require('path'),
    catalogModel = require(path.join(__dirname,'..','models','catalogo' ,'catalog-model')),
    procesoNegocioModel = require(path.join(__dirname,'..','models','catalogo' ,'procesoNegocio-model')),
    formidable = require('formidable'), 
    fs = require('fs'),
    uploadDir = 'patternsImgs'
      
var catalogService = () => { }

catalogService.sendPageNewDocumentCase = function (cb) {
    procesoNegocioModel.findGovProcesses(cb)
}
catalogService.newDocumentCase = function(req, cb) {
    let filename
    let pathPattImg

    var form = new  formidable.IncomingForm()
    form.uploadDir = path.join(__dirname,'..','uploads', `${uploadDir}`)
    form.parse(req, function (err, fields, files) {
        /** 
        let oldpath = files.pattImg.path
        let newpath = oldpath.replace(withoutExtension(path.basename(oldpath)), 'xxxx')
        fs.rename(oldpath, newpath, function (err) {
            if (err) cb(err)
        })
        filename = path.basename(newpath) 
        pathPattImg = path.join('/',`${uploadDir}`,`${filename}`)
        */
        
        let wordsToStore = parseDocumentCase(fields.documentDescription)
        catalogModel.saveDocumentCase(pathPattImg, fields, function (err, doc) {
            if(err) cb(err)

            let idDocCase = doc._id
            catalogModel.saveVocabulary(idDocCase, fields.idGP, wordsToStore, cb)
        })
    })
}
    function withoutExtension(base) {
        if(base.lastIndexOf(".") != -1)       
            base = base.substring(0, base.lastIndexOf("."));
        return base;
    }

    function parseDocumentCase (description) {
        console.log('entro al parseo ')
        let words = description.split(/[^a-zA-Záéíóúñ0-9]/)
        
        let mapWords = {}
        
        words.forEach(w => {
            if (w.length > 1 && !w.match(/.*[0-9].*/) ) {
                w = w.toLowerCase()
                
                let word = {
                    term : w,
                }
                let keyWord = w.hashCode()
                if (mapWords[keyWord] != null) {
                     mapWords[keyWord]['frecuency'] = mapWords[keyWord]['frecuency'] + 1
                } else {
                    word['frecuency'] = 1
                    mapWords[keyWord] = word
                } 
            }
        });
        
        
        return mapWords
    }
 

    String.prototype.hashCode = function() {
      var hash = 0, i, chr;
      if (this.length === 0) return hash;
      for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };    

module.exports = catalogService