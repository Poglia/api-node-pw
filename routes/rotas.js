const { Router } = require('express');

const { getPredios, addPredio, updatePredio,
     deletePredio, getPredioPorCodigo } = require('../controllers/prediosController')

const { getSalas, addSala, updateSala, deleteSala, getSalaPorCodigo }
     = require('../controllers/salasController');

const { getEquipamentoPorSala, addEquipamento, updateEquipamento,
     deleteEquipamento, getEquipamentoPorCodigo } =
     require('../controllers/equipamentosController');

const { login , verificaJWT } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route('/login')
     .post(login);
     
rotas.route('/predios')
     .get(verificaJWT, getPredios)
     .post(verificaJWT, addPredio)
     .put(verificaJWT, updatePredio);

rotas.route('/predios/:codigo')
     .get(verificaJWT, getPredioPorCodigo)
     .delete(verificaJWT, deletePredio);

rotas.route('/salas')
     .get(verificaJWT, getSalas)
     .post(verificaJWT, addSala)
     .put(verificaJWT, updateSala);

rotas.route('/salas/:codigo')
     .get(verificaJWT, getSalaPorCodigo)
     .delete(verificaJWT, deleteSala);

rotas.route('/equipamentos/sala/:codigosala')
     .get(verificaJWT, getEquipamentoPorSala)

rotas.route('/equipamentos')
     .post(verificaJWT, addEquipamento)
     .put(verificaJWT, updateEquipamento);

rotas.route('/equipamentos/:codigo')
     .get(verificaJWT, getEquipamentoPorCodigo)
     .delete(verificaJWT, deleteEquipamento);     

module.exports = rotas;