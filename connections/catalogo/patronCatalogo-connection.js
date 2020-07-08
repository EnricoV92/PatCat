'use strict'
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    patronCatalogoSchema = new Schema ({
        patronNombre: { type: String },
        patronImg: { type: String },
        patronCuerpo: Schema.Types.Mixed,
        patronKeys: { type: [String] }
    },
    {
        collection: 'patronesCatalogo'
    }),

    patronesCatalogoModel = mongoose.model('PatronCatalogo', patronCatalogoSchema)
module.exports = patronesCatalogoModel

