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


module.exports = router;
