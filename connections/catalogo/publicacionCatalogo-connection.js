'use strict'
var mongoose = require('mongoose')
const path = require('path'),
    conf = require(path.join(__dirname, '.', 'db-config')),
    Schema = mongoose.Schema,
    patronAplicadoSchema = new Schema ({
        patronNombre: { type: String },
        patronImg: { type: String },
        patronCuerpo: Schema.Types.Mixed,
        patronKeys: { type: [String] }
    },
    {
        collection: 'patronesAplicados'
    }),
    publicacionCatalogoSchema = new Schema ({
        procesoNegocio: { type: String },
        publicacionTitulo: { type: String},
        patronesCatalogo: [Schema.Types.ObjectId],
        publicacionPaper: { type: String },
        publicacionDescripcion: { type: String }
    },
    {
        collection: 'publicacionesCatalogo'
    }),

publicacionCatalogoModel = mongoose.model('PublicacionCatalogo', publicacionCatalogoSchema)

mongoose.connect(`mongodb://${conf.mongo.host}/${conf.mongo.db}`,{useNewUrlParser:true})
module.exports = publicacionCatalogoModel
