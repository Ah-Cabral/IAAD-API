const express = require('express');
const cors = require('cors');

const mysql = require ('mysql');
const router = express.Router();

router.use(cors());
router.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'root', // Um usuário do banco. Ex: user 
    port: 3306,
    password: 'password', // A senha do usuário. Ex: user123
    database: 'compania_aereateste1' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Your DB Allow Land is connected!')
    }
});

//Métodos para integração Instância Trecho

router.post('/allow-land-add', function(req,res){
    //Criação Das Variáveis:
    const {Nome_tipo_aeronave, Codigo_aeroporto} = req.body

    connection.query(`

        INSERT INTO pode_pousar (Nome_tipo_aeronave, Codigo_aeroporto)
        
        VALUES ('${Nome_tipo_aeronave}', '${Codigo_aeroporto}')`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        }else{
            res.send(rows);
        }
    });

});

router.get('/allow-land-list', function(req,res){

    connection.query("SELECT * FROM pode_pousar", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.put('/allow-land-update', function(req,res){
    const {Nome_tipo_aeronave, Codigo_aeroporto} = req.body

    connection.query(`UPDATE pode_pousar SET Nome_tipo_aeronave = '${Nome_tipo_aeronave}', Codigo_aeroporto = '${Codigo_aeroporto}', WHERE Nome_tipo_aeronave = '${Nome_tipo_aeronave}', Codigo_aeroporto = '${Codigo_aeroporto}'`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.delete('/allow-land-delete', function(req,res){
    const {Nome_tipo_aeronave, Codigo_aeroporto} = req.body

    connection.query(`DELETE FROM pode_pousar WHERE Nome_tipo_aeronave = '${Nome_tipo_aeronave}' AND Codigo_aeroporto = '${Codigo_aeroporto}`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;