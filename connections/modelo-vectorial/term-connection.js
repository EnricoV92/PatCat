'use stric'
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    termSchema = new Schema ({
        word: { type : String }
    }, 
    {
        collection: 'terms'
    })

const termModel = mongoose.model('Term', termSchema)
module.exports = termModel