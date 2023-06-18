const { pool } = require('../config')
const Academia = require('../entities/academia')

const getAcademiasDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM academias ORDER BY codigo');
        return rows.map((academia) => new Academia(academia.codigo, academia.nome,
            academia.descricao, academia.sigla));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addAcademiaDB = async (body) => {
    try {
        const { nome, descricao, sigla } = body;
        const results = await pool.query(`INSERT INTO academias (nome, descricao,
            sigla) VALUES ($1, $2, $3) 
            RETURNING codigo, nome, descricao, sigla`, 
            [nome, descricao, sigla]);
        const academia = results.rows[0];
        return new Academia(academia.codigo, academia.nome, academia.descricao, academia.sigla);
    } catch (err){
        throw "Erro ao inserir a academia: " + err;
    }
}

const updateAcademiaDB = async (body) => {
    try {
        const { codigo, nome, descricao, sigla } = body;
        const results = await pool.query(`UPDATE academias SET nome=$1,
        descricao=$2, sigla = $3 WHERE codigo=$4 
        RETURNING codigo, nome, descricao, sigla`, 
            [nome, descricao, sigla, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const academia = results.rows[0];
        return new Academia(academia.codigo, academia.nome, academia.descricao, academia.sigla);
    } catch (err){
        throw "Erro ao alterar a academia: " + err;
    }
}

const deleteAcademiaDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM academias 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Prédio de código ${codigo} removido com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover a academia: " + err;
    }
}

const getAcademiaPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM academias 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const academia = results.rows[0];
            return new Academia(academia.codigo, academia.nome,
                 academia.descricao, academia.sigla);
        }
    } catch (err){
        throw "Erro ao recuperar a academia: " + err;
    }
}

module.exports = { getAcademiasDB, addAcademiaDB, 
    updateAcademiaDB, deleteAcademiaDB, getAcademiaPorCodigoDB }