var Edicao = require('../models/edicao');


module.exports.getAllEdicoes = () => {
    return Edicao.find({}, { anoEdicao: 1, organizacao: 1, vencedor: 1, _id: 1 }).exec()
}


module.exports.getEdicaoById = id => {
    return Edicao
        .findById(id)
        .exec();
}


module.exports.getEdicoesByOrganizador = organizador => {
    return Edicao.find(
        { organizacao: organizador },
        { anoEdicao: 1, organizacao: 1, vencedor: 1, _id: 1 }
    ).exec()
}


module.exports.getPaisesOrganizadores = () => {
    return Edicao.aggregate([
        { $group: {
            _id: "$organizacao",
            anos: { $push: "$anoEdicao" }
        }},
        { $sort: { _id: 1 } }
    ]).then(data =>
        data.map(item => ({ pais: item._id, anos: item.anos }))
    )
}

module.exports.getPaisesVencedores = () => {
    return Edicao.aggregate([
      { $match: { vencedor: { $ne: null } } }, // Filtra só edições com vencedor definido
      { $group: {
          _id: "$vencedor", // Agrupa pelo país vencedor (assumindo que é string)
          anos: { $push: "$anoEdicao" }
      }},
      { $sort: { _id: 1 } } // Ordena alfabeticamente pelo país
    ]).then(data =>
      data.map(item => ({ pais: item._id, anos: item.anos }))
    )
  }
  

module.exports.getInterpretes = () => {
    return Edicao.aggregate([
        { $unwind: "$musicas" },
        { $group: {
            _id: { nome: "$musicas.interprete", pais: "$musicas.pais" }
        }},
        { $sort: { "_id.nome": 1 } }
    ]).then(data =>
        data.map(item => ({
            nome: item._id.nome,
            pais: item._id.pais
        }))
    )
}

// POST /edicoes: inserir nova edição
module.exports.insert = edicao => {
    var newEdicao = new Edicao(edicao)
    return newEdicao.save()
}

module.exports.update = (id, edicao) => {
    return Edicao
        .findByIdAndUpdate(id, edicao, {new: true})
        .exec()     
}

// DELETE /edicoes/:id: apagar edição pelo id
module.exports.delete = id => {
    return Edicao
        .findByIdAndDelete(id, {new: true})
        .exec()
}