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
        console.log('Your DB Snippet Instance is connected!')
    }
});

//Métodos para integração Instância Trecho

router.post('/snippet-instance-add', function(req,res){
    //Criação Das Variáveis:
    const {Numero_voo, Numero_trecho, Data, Numero_assentos_disponiveis, Codigo_aeronave, Codigo_aeroporto_partida, Horario_chegada} = req.body;

    connection.query(`

        INSERT INTO instancia_trecho (Numero_voo, Numero_trecho, Data, Numero_assentos_disponiveis, Codigo_aeronave, Codigo_aeroporto_partida, Horario_chegada)
        
        VALUES ('${Numero_voo}', '${Numero_trecho}', '${Data}', '${Numero_assentos_disponiveis}', '${Codigo_aeronave}', '${Codigo_aeroporto_partida}', '${Horario_chegada}')`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        }else{
            res.send(rows);
        }
    });

});

router.get('/snippet-instance-list', function(req,res){

    connection.query("SELECT * FROM instancia_trecho", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.put('/snippet-instance-update', function(req,res){
    const {Numero_voo, Numero_trecho, Data, Numero_assentos_disponiveis, Codigo_aeronave, Codigo_aeroporto_partida, Horario_chegada} = req.body;

    connection.query(`UPDATE instancia_trecho SET Numero_assentos_disponiveis = '${Numero_assentos_disponiveis}', Codigo_aeronave = '${Codigo_aeronave}', Codigo_aeroporto_partida = '${Codigo_aeroporto_partida}', Horario_chegada = '${Horario_chegada}', WHERE Numero_voo = '${Numero_voo}' AND Numero_trecho = '${Numero_trecho}' AND Data = '${Data}'`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.delete('/snippet-instance-delete', function(req,res){
    const {Numero_voo, Numero_trecho, Data} = req.body

    connection.query(`DELETE FROM instancia_trecho WHERE Numero_voo = '${Numero_voo}' AND Numero_trecho = '${Numero_trecho} AND Data = '${Data}'`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;