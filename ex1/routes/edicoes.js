var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicao');

router.get('/edicoes', function(req, res) {
    if (req.query.org) {
      Edicao.getEdicoesByOrganizador(req.query.org)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ error: error.message }));
    } else {
      Edicao.getAllEdicoes()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ error: error.message }));
    }
});

// GET /edicoes/:id
router.get('/edicoes/:id', function(req, res) {
    Edicao.getEdicaoById(req.params.id)
      .then(data => {
        if (data) res.status(200).json(data)
        else res.status(404).json({ error: "Edição não encontrada" })
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // GET /paises?papel=org ou /paises?papel=venc
  router.get('/paises', function(req, res) {
    if (req.query.papel === 'org') {
      Edicao.getPaisesOrganizadores()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ error: error.message }));
    } else if (req.query.papel === 'venc') {
      Edicao.getPaisesVencedores()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ error: error.message }));
    } else {
      res.status(400).json({ error: "Query 'papel' inválida ou ausente" });
    }
  });
  
  // GET /interpretes
  router.get('/interpretes', function(req, res) {
    Edicao.getInterpretes()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // POST /edicoes
router.post('/edicoes', function(req, res) {
    Edicao.insert(req.body)
      .then(data => res.status(201).json(data))
      .catch(error => res.status(500).json({ error: error.message }));
  });

  // DELETE /edicoes/:id
  router.delete('/edicoes/:id', function(req, res) {
    Edicao.delete(req.params.id)
      .then(data => {
        if (data) res.status(200).json({ message: "Edição eliminada" })
        else res.status(404).json({ error: "Edição não encontrada" })
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });

  router.put('/edicoes/:id', function(req, res) {
    Edicao.update(req.params.id, req.body)
      .then(data => {
        if (data) res.status(200).json(data);
        else res.status(404).json({ error: "Edição não encontrada" });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
module.exports = router;