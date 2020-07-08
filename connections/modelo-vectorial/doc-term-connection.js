'use stric'
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    docTermSchema = new Schema ({
        idTerm : { type: Number },
        idDoc : { type: Schema.Types.ObjectId },
        frecuency: { type: Number } 
    }, 
    {
        collection: 'docTerms'
    })

const docTermModel = mongoose.model('DocTerm', docTermSchema)
module.exports = docTermModel