const { getPesosPorSetorDB, addPesoDB, updatePesoDB,
  deletePesoDB, getPesoPorCodigoDB } = require('../useCases/pesoUseCases');

const getPesoPorSetor = async (request, response) => {
  await getPesosPorSetorDB(request.params.codigosetor)
    .then(data => response.status(200).json(data))
    .catch(err => {
      response.status(400).json({
        status: 'error',
        message: 'Erro ao consultar os pesos do setor: ' + err
      })
    })
}

const addPeso = async (request, response) => {
  await addPesoDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Peso criado",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const updatePeso = async (request, response) => {
  await updatePesoDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Peso alterado",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const deletePeso = async (request, response) => {
  await deletePesoDB(request.params.codigo)
    .then(data => response.status(200).json({
      status: "success", message: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const getPesoPorCodigo = async (request, response) => {
  await getPesoPorCodigoDB(request.params.codigo)
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

module.exports = {
  getPesoPorSetor, addPeso, updatePeso, 
  deletePeso, getPesoPorCodigo
}