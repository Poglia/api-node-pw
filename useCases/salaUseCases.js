const { pool } = require('../config')
const Sala = require('../entities/sala')

const getSalasDB = async () => {
    try {
        const { rows } = await 
        pool.query(`SELECT s.codigo AS codigo, s.numero AS numero, 
        s.descricao AS descricao, s.capacidade AS capacidade, 
        s.predio AS predio, p.nome AS nomepredio
        FROM salas s 
        JOIN predios p ON p.codigo = s.predio
        ORDER BY s.codigo`);
        return rows.map((sala) => new Sala(sala.codigo, sala.numero,
           sala.descricao, sala.capacidade, sala.predio , sala.nomepredio));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addSalaDB = async (body) => {
    try {
        const { numero, descricao, capacidade, predio } = body;
        const results = await pool.query(`INSERT INTO salas (numero, descricao,
            capacidade, predio) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, numero, descricao, capacidade, predio`, 
            [numero, descricao, capacidade, predio]);
        const sala = results.rows[0];
        return new Sala(sala.codigo, sala.numero,
            sala.descricao, sala.capacidade, sala.predio , "");
    } catch (err){
        throw "Erro ao inserir a sala: " + err;
    }
}

const updateSalaDB = async (body) => {
    try {
        const { codigo, numero, descricao, capacidade, predio } = body;
        const results = await pool.query(`UPDATE salas SET numero=$1,
        descricao=$2, capacidade = $3, predio = $4 WHERE codigo=$5 
        RETURNING codigo, numero, descricao, capacidade, predio`, 
            [numero, descricao, capacidade, predio, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const sala = results.rows[0];
        return new Sala(sala.codigo, sala.numero,
            sala.descricao, sala.capacidade, sala.predio , "");        
    } catch (err){
        throw "Erro ao alterar sala: " + err;
    }
}

const deleteSalaDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM salas 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Sala de código ${codigo} removida com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover a sala: " + err;
    }
}

const getSalaPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM salas 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const sala = results.rows[0];
            return new Sala(sala.codigo, sala.numero,
                sala.descricao, sala.capacidade, sala.predio , "");  
        }
    } catch (err){
        throw "Erro ao recuperar a sala: " + err;
    }
}

module.exports = { getSalasDB, addSalaDB, updateSalaDB, 
    deleteSalaDB, getSalaPorCodigoDB }