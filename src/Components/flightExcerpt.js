const express = require('express');
const cors = require('cors');

const mysql = require ('mysql2');
const router = express.Router();

router.use(cors());
router.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'root', // Um usuário do banco. Ex: user 
    port: 3306,
    password: 'password', // A senha do usuário. Ex: user123
    database: 'compania_aerea' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Your DB FlightEcxerpt is connected!')
    }
});

//Métodos para integração Trecho de Vôo

router.post('/flight-excerpt-add', function(req,res){
    //Criação Das Variáveis:
    const {Numero_voo, Numero_trecho, Codigo_aeroporto_partida, Horario_partida_previsto, Codigo_aeroporto_chegada, Horario_chegada_previsto} = req.body;

    connection.query(`INSERT INTO trecho_voo (Numero_voo, Numero_trecho, Codigo_aeroporto_partida, Horario_partida_previsto, Codigo_aeroporto_chegada, Horario_chegada_previsto) VALUES ('${Numero_voo}', '${Numero_trecho}', '${Codigo_aeroporto_partida}', '${Horario_partida_previsto}', ${Codigo_aeroporto_chegada}, ${Horario_chegada_previsto})`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        }else{
            res.send(rows);
        }
    });

});

router.get('/flight-excerpt-list', function(req,res){

    connection.query("SELECT * FROM trecho_voo", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.put('/flight-excerpt-update', function(req,res){
    //Criação Das Variáveis:
    const {Numero_voo, Numero_trecho, Codigo_aeroporto_partida, Horario_partida_previsto, Codigo_aeroporto_chegada, Horario_chegada_previsto} = req.body;
    connection.query(`UPDATE trecho_voo SET Codigo_aeroporto_partida = '${Codigo_aeroporto_partida}', Horario_partida_previsto = '${Horario_partida_previsto}', Codigo_aeroporto_chegada, = '${Codigo_aeroporto_chegada}, Horario_chegada_previsto, = '${Horario_chegada_previsto}' WHERE Numero_voo = '${Numero_voo}' AND Numero_trecho=${Numero_trecho}`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.delete('/flight-excerpt-delete', function(req,res){
    const {Numero_voo, Numero_trecho} = req.body
    connection.query(`DELETE FROM trecho_voo WHERE Numero_voo = '${Numero_voo}' AND Numero_trecho=${Numero_trecho}`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

module.exports = router;