'use strict' 

const path = require('path'),
    vocabularyModel = require(path.join(__dirname,'..','models','modelo-vectorial' ,'vocabulary-model')),
    motorModel = require(path.join(__dirname,'..','models','modelo-vectorial' ,'motor-model')),
    procesoNegocioModel = require(path.join(__dirname,'..','models','catalogo' ,'procesoNegocio-model')),
    R = 1

var motorService = () => {
    
}
motorService.sendPageSearchPattern = function (cb) {
    procesoNegocioModel.findGovProcesses(cb)
}

motorService.searchPatternbyKey = async function (req, cb) {
    let gpName = req.body.procesoNegocio
    let keys = req.body.keys
    let respuesta
/*     for (let index = 0; index < keys.length; index++) {
        const k = keys[index];
        motorModel.searchPatternbyKey(k)
    } */
    keys = JSON.parse(keys)
    console.log(keys)
    console.log(keys.toString())
    respuesta = await motorModel.searchPatternbyKey(keys.toString())
    console.log(respuesta)
    cb(respuesta)
}

motorService.getKeys = function (req, cb) {
    let proceso = req.query.proceso
    motorModel.getKeys (proceso, cb)
}

//-------------------- Metodos del modelo vectorial
motorService.searchQueryPattern = async function (req, cb) {
    let gpName = req.body.govProcesses 
    let queryPattern = req.body.queryPattern
    let terms = parseQuery(queryPattern)
    let tvQuery = []
    let i = 0
    let respuesta

    if(queryPattern == "") {
        console.log("entro al if")
        respuesta =  await obtenerRespuestaByGP(gpName)
        
        cb(null, respuesta)
        
    } else {
        vocabularyModel.load(async function(err, vocabulary) {
            if (err) cb(err)
                terms.forEach(w => {        
                    if(vocabulary[w.hashCode()] != null) {
                        tvQuery[i] = vocabulary[w.hashCode()]
                    /**
                     *  if(!isStopWord(vocabulary[w.hashCode()], N)) {    
                        }  
                     */   
                    }
                    i++
                });
                if (tvQuery.length > 0) {
                    tvQuery.sort(function(a ,b) {return a['nr'] - b['nr']})
                    respuesta = await obtenerRespuesta(tvQuery, gpName)
                }
                cb(null, respuesta)
        })
    }
    
}

async function obtenerRespuestaByGP(gpName) {
let k = 0
let resultados = []    
let docsCases = await motorModel.findDocCaseByGP(gpName);
    await asyncForEach(docsCases, (d) => {
        let respuesta = {
            dataDoc: d
        }
        resultados[k] = respuesta
        k++
    })
    console.log(resultados)
    return resultados
}

async function obtenerRespuesta(tvQuery,  gpName) {
    let k = 0
    let resultados = [R]
    let N = await  motorModel.countDocumentCases();
        await asyncForEach(tvQuery, async (tv) => {            
            let docsTerm = await motorModel.findDocsTerm (tv['word'].hashCode());                
                    await asyncForEach(docsTerm, async (d) => {                                              
                        let docCase = await motorModel.findDocCase(d.idDoc, gpName ); //busco la data de cada documento por termino                                                                                                       
                            let l = Math.log(N / tv['nr'])                           
                            let peso = d['frecuency'] * l                           
                            let respuesta = {
                                peso : peso,
                                dataDoc: docCase
                            }                            
                              if(k < R) {
                                resultados[k] = respuesta
                                
                            } else {
                                if(k == R) {
                                    resultados.sort(function(a, b) {return a['peso'] - b['peso']})
                                }
                                for (let i = 0; i < resultados.length; i++) {
                                    if(resultados[i]['dataDoc']['_id'] == respuesta['dataDoc']['_id']){
                                        resultados[i]['peso'] = resultados[i]['peso'] + respuesta['peso']
                                        break
                                    }
                                }
                                if(resultados[0]['peso'] - respuesta['peso'] < 0) {
                                    resultados[0] = respuesta
                                }
                            }                                                                           
                        k++
                    })                         
        })     
        console.log(resultados[0])
        return resultados
}

function parseQuery (queryPattern) {
    let wordsQuery = queryPattern.split(/[^a-zA-Záéíóúñ0-9]/)
    let terms = []
    let i = 0
    wordsQuery.forEach(w => {
          if(w.length > 1 && !w.match(/.*[0-9].*/)) {
                w = w.toLowerCase()
                
                terms[i] = w
          }
          i++
    });
    return terms     
}

function isStopWord(tv, N) {
    if(tv != null) {   
        let n = tv['nr']     
        if (3 * n  < N) {
           
            return 
        }     
    }
    return false
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

module.exports = motorService