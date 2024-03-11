const mongoose = require('mongoose')
const GalerijaSchema = new mongoose.Schema({
    slikaURL: {
        required: true,
        type: String
    },
    slikaAlt: {
        required:true,
        type:String
    },
    posao: {
        type: String
    }
})

const Galerija = mongoose.model('Galerija', GalerijaSchema);

module.exports = Galerija;
