const mongoose = require('mongoose');

const PosaoSchema = new mongoose.Schema({
    naziv: {
        type: String,
        required: true
    },
    opis: {
        type: String,
        required: true
    },
    slika: {
        type: String,
        required: true
    },
    slikaAlt: {
        type: String,
        required:true
    }
});

const Posao = mongoose.model('Posao', PosaoSchema);

module.exports = Posao;
