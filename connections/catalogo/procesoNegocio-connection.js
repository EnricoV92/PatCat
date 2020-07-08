'use stric'
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    procesoNegocioSchema = new Schema ({
        procesoNombre: { type: String },
        procesoDescripcion: { type: String }
    }, 
    {
        collection: 'procesosNegocio'
    }),
    
    procesoNegocioModel = mongoose.model('ProcesoNegocio', procesoNegocioSchema)
module.exports = procesoNegocioModel