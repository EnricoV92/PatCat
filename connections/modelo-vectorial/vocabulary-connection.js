'use strict'

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    vocSchema = new Schema ({
        term : []
    },
    {
        collection: 'vocabulary'
    }),
    vocModel = mongoose.model('Vocabulary', vocSchema)

module.exports = vocModel