'use strict'

const path = require('path')
var app = require(path.join(__dirname,'app')),
    server = app.listen(app.get('port') , function () {
        console.log('\x1b[41m\x1b[37m%s\x1b[0m',`Escuchando en el puerto ${app.get('port')} `);
    });