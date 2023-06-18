const { Router } = require('express');

const { getAcademias, addAcademia, updateAcademia,
     deleteAcademia, getAcademiaPorCodigo } = require('../controllers/academiasController')

const { getSetores, addSetor, updateSetor, deleteSetor, getSetorPorCodigo }
     = require('../controllers/setoresController');

const { getPesoPorSetor, addPeso, updatePeso,
     deletePeso, getPesoPorCodigo } =
     require('../controllers/pesosController');

const { login , verificaJWT } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route('/login')
     .post(login);
     
rotas.route('/academias')
     .get(verificaJWT, getAcademias)
     .post(verificaJWT, addAcademia)
     .put(verificaJWT, updateAcademia);

rotas.route('/academias/:codigo')
     .get(verificaJWT, getAcademiaPorCodigo)
     .delete(verificaJWT, deleteAcademia);

rotas.route('/setores')
     .get(verificaJWT, getSetores)
     .post(verificaJWT, addSetor)
     .put(verificaJWT, updateSetor);

rotas.route('/setores/:codigo')
     .get(verificaJWT, getSetorPorCodigo)
     .delete(verificaJWT, deleteSetor);

rotas.route('/pesos/setor/:codigosetor')
     .get(verificaJWT, getPesoPorSetor)

rotas.route('/pesos')
     .post(verificaJWT, addPeso)
     .put(verificaJWT, updatePeso);

rotas.route('/pesos/:codigo')
     .get(verificaJWT, getPesoPorCodigo)
     .delete(verificaJWT, deletePeso);     

module.exports = rotas;