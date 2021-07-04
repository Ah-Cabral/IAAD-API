const express = require('express');
const cors = require('cors');

const mysql = require ('mysql2');
const router = express.Router();

router.use(cors());
router.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'root', // Um usuário do banco. Ex: user 
    port: 8080,
    password: 'password', // A senha do usuário. Ex: user123
    database: 'compania_aerea' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Your DB Airplane is connected!')
    }
});

//Métodos para integração Aeronave

router.post('/airplane-add', function(req,res){
    //Criação Das Variáveis:
    const {Codigo_aeronave, Numero_total_assentos, Tipo_aeronave} = req.body;

    connection.query(`INSERT INTO aeronave (Codigo_aeronave, Numero_total_assentos, Tipo_aeronave) VALUES ('${Codigo_aeronave}', '${Numero_total_assentos}', '${Tipo_aeronave}')`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        }else{
            res.send(rows);
        }
    });

});


router.get('/airplane-list', function(req,res){

    connection.query("SELECT * FROM aeronave", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.put('/airplane-update', function(req,res){
    const {Codigo_aeronave, Numero_total_assentos, Tipo_aeronave} = req.body;

    connection.query(`UPDATE aeronave SET Numero_total_assentos = '${Numero_total_assentos}', Tipo_aeronave = '${Tipo_aeronave}' WHERE Codigo_aeronave = '${Codigo_aeronave}'`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.delete('/airplane-delete', function(req,res){
    const {Codigo_aeronave} = req.body
    connection.query(`DELETE FROM aeronave WHERE Codigo_aeronave = ${Codigo_aeronave}`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;