'use stric'
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    tipoPatronSchema = new Schema ({
        tipoPatronNombre: { type: String },
        tipoPatronDescripcion: { type: String },
        tipoPatron: { type: Schema.Types.ObjectId }
    }, 
    {
        collection: 'tiposPatrones'
    })

const tipoPatronModel = mongoose.model('TipoPatron', tipoPatronSchema)
module.exports = tipoPatronModel