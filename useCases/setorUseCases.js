const { pool } = require('../config')
const Setor = require('../entities/setor')

const getSetoresDB = async () => {
    try {
        const { rows } = await 
        pool.query(`SELECT s.codigo AS codigo, s.numero AS numero, 
        s.descricao AS descricao, s.capacidade AS capacidade, 
        s.academia AS academia, p.nome AS nomeacademia
        FROM setores s 
        JOIN academias p ON p.codigo = s.academia
        ORDER BY s.codigo`);
        return rows.map((setor) => new Setor(setor.codigo, setor.numero,
           setor.descricao, setor.capacidade, setor.academia , setor.nomeacademia));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addSetorDB = async (body) => {
    try {
        const { numero, descricao, capacidade, academia } = body;
        const results = await pool.query(`INSERT INTO setores (numero, descricao,
            capacidade, academia) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, numero, descricao, capacidade, academia`, 
            [numero, descricao, capacidade, academia]);
        const setor = results.rows[0];
        return new Setor(setor.codigo, setor.numero,
            setor.descricao, setor.capacidade, setor.academia , "");
    } catch (err){
        throw "Erro ao inserir a setor: " + err;
    }
}

const updateSetorDB = async (body) => {
    try {
        const { codigo, numero, descricao, capacidade, academia } = body;
        const results = await pool.query(`UPDATE setores SET numero=$1,
        descricao=$2, capacidade = $3, academia = $4 WHERE codigo=$5 
        RETURNING codigo, numero, descricao, capacidade, academia`, 
            [numero, descricao, capacidade, academia, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const setor = results.rows[0];
        return new Setor(setor.codigo, setor.numero,
            setor.descricao, setor.capacidade, setor.academia , "");        
    } catch (err){
        throw "Erro ao alterar setor: " + err;
    }
}

const deleteSetorDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM setores 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Setor de código ${codigo} removida com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover a setor: " + err;
    }
}

const getSetorPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM setores 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const setor = results.rows[0];
            return new Setor(setor.codigo, setor.numero,
                setor.descricao, setor.capacidade, setor.academia , "");  
        }
    } catch (err){
        throw "Erro ao recuperar a setor: " + err;
    }
}

module.exports = { getSetoresDB, addSetorDB, updateSetorDB, 
    deleteSetorDB, getSetorPorCodigoDB }