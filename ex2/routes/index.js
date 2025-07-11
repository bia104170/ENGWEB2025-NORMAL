var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get('http://localhost:25000/edicoes')
    .then(resp => {
      //console.log("Lista de edicoes:", resp.data);
      res.status(200).render("edicaoList", {lista: resp.data, title:"Página inicial", data: d})
    })
    .catch (error => {
      res.status(500).render("error", {error: error, data: d})
    })
});


router.get('/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  var id = req.params.id;

  axios.get('http://localhost:25000/edicoes/' + id)
    .then(response => {
      const edicao = response.data;
      console.log(edicao);
      res.render('edicaoPage', { 
        title: `Edição ${edicao._id}`,
        edicao: edicao,
        data: data
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error, data: data });
    });
});

router.get('/paises/:pais', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  var pais = req.params.pais;

  axios.get('http://localhost:25000/edicoes')
    .then(response => {
      const edicoes = response.data;

      const participacoes = []
      const organizacoes = []

      console.log(edicoes)

      edicoes.forEach(ed => { 

        if (Array.isArray(ed.musicas)) {
          
          ed.musicas.forEach(m => {
            
            if (m.pais === pais) {
                participacoes.push({
                  edicaoId: ed._id,
                  ano: ed.anoEdicao,
                  titulo: m.titulo,
                  interprete: m.interprete,
                  venceu: ed.vencedor && ed.vencedor === m.pais
                });
              }
          });
        }
        
        console.log(participacoes)
        if (ed.organizacao == pais) {
          organizacoes.push({
            idEdicao: ed._id,
            ano: ed.anoEdicao
          })
        }
        console.log(organizacoes)
      });

      res.render('paisPage', { 
        title: `Página de ${pais}`,
        pais: pais,
        participacoes: participacoes,
        organizacoes: organizacoes, 
        data: data
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error, data: data });
    });
});



module.exports = router;
