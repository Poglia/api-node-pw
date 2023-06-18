const { pool } = require('../config')
const Peso = require('../entities/peso')

const getPesosPorSetorDB = async (codigosetor) => {
    try {
        const results = await
            pool.query(`SELECT * FROM pesos WHERE setor = $1 
        ORDER BY codigo`, [codigosetor]);
        if (results.rowCount === 0) {
            throw `Nenhum peso encontrado com o código de 
            setor: ${codigosetor}`;
        } else {
            return results.rows.map((peso) =>
                new Peso(peso.codigo, peso.descricao,
                    peso.numero_serie, peso.valor,
                    peso.setor));
        }
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addPesoDB = async (body) => {
    try {
        const { descricao, numero_serie, valor, setor } = body;
        const results = await pool.query(`INSERT INTO pesos (descricao,
             numero_serie, valor, setor) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, descricao, numero_serie, valor, setor`,
            [descricao, numero_serie, valor, setor]);
        const peso = results.rows[0];
        return new Peso(peso.codigo, peso.descricao,
            peso.numero_serie, peso.valor,
            peso.setor);
    } catch (err) {
        throw "Erro ao inserir o peso: " + err;
    }
}

const updatePesoDB = async (body) => {
    try {
        const { codigo, descricao, numero_serie, valor, setor } = body;
        const results = await pool.query(`UPDATE pesos SET 
        descricao=$1, numero_serie=$2, valor=$3, setor=$4 WHERE codigo=$5 
        RETURNING codigo, descricao, numero_serie, valor, setor`,
            [descricao, numero_serie, valor, setor, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const peso = results.rows[0];
        return new Peso(peso.codigo, peso.descricao,
            peso.numero_serie, peso.valor,
            peso.setor);
    } catch (err) {
        throw "Erro ao alterar o peso: " + err;
    }
}

const deletePesoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM pesos 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Peso de código ${codigo} removido com sucesso!`
        }
    } catch (err) {
        throw "Erro ao remover o peso: " + err;
    }
}

const getPesoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM pesos 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const peso = results.rows[0];
            return new Peso(peso.codigo, peso.descricao,
                peso.numero_serie, peso.valor,
                peso.setor);
        }
    } catch (err) {
        throw "Erro ao recuperar o peso: " + err;
    }
}

module.exports = {
    getPesosPorSetorDB, addPesoDB, updatePesoDB, 
    deletePesoDB, getPesoPorCodigoDB
}