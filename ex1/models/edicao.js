var mongoose = require('mongoose');

var edicaoSchema = new mongoose.Schema({
  _id: String,
  anoEdicao: Number,
  organizacao: String,
  vencedor: String,
  musicas: [{
    id: String,
    link: String,
    titulo: String,
    pais: String,
    compositor: String,
    interprete: String,
    letra: String  // opcional
  }]
}, { versionKey: false });

module.exports = mongoose.model('edicoes', edicaoSchema);
