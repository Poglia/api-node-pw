const { getAcademiasDB, addAcademiaDB, updateAcademiaDB,
deleteAcademiaDB, getAcademiaPorCodigoDB } = require('../useCases/academiaUseCases');

const getAcademias = async (request, response) => {
    await getAcademiasDB()
          .then(data => response.status(200).json(data))
          .catch(err => {
            response.status(400).json({
                status : 'error',
                message : 'Erro ao consultar os prédios: ' + err
            })
          })
}

const addAcademia = async (request, response) => {
    await addAcademiaDB(request.body)
          .then(data => response.status(200).json({
            status : "success", message : "Prédio criado",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const updateAcademia = async (request, response) => {
    await updateAcademiaDB(request.body)
          .then(data => response.status(200).json({
            status : "success", message : "Prédio alterado",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const deleteAcademia = async (request, response) => {
    await deleteAcademiaDB(request.params.codigo)
          .then(data => response.status(200).json({
            status : "success", message : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const getAcademiaPorCodigo = async (request, response) => {
    await getAcademiaPorCodigoDB(request.params.codigo)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

module.exports = { getAcademias, addAcademia, 
    updateAcademia, deleteAcademia, getAcademiaPorCodigo }