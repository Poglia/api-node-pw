const { getSetoresDB, addSetorDB, updateSetorDB,
  deleteSetorDB, getSetorPorCodigoDB } = require('../useCases/setorUseCases');

const getSetores = async (request, response) => {
  await getSetoresDB()
    .then(data => response.status(200).json(data))
    .catch(err => {
      response.status(400).json({
        status: 'error',
        message: 'Erro ao consultar as salas: ' + err
      })
    })
}

const addSetor = async (request, response) => {
  await addSetorDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Setor criada",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const updateSetor = async (request, response) => {
  await updateSetorDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Setor alterada",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const deleteSetor = async (request, response) => {
  await deleteSetorDB(request.params.codigo)
    .then(data => response.status(200).json({
      status: "success", message: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const getSetorPorCodigo = async (request, response) => {
  await getSetorPorCodigoDB(request.params.codigo)
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

module.exports = {
  getSetores, addSetor, updateSetor,
  deleteSetor, getSetorPorCodigo
}