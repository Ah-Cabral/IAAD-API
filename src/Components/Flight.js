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
        console.log('Your DB Flight is connected!')
    }
});

//Métodos para integração Vôo

router.post('/flight-add', function(req,res){
    //Criação Das Variáveis:
    const {Numero_voo, Companhia_aerea, Dias_da_semana} = req.body;

    connection.query(`INSERT INTO voo (Numero_voo, Companhia_aerea, Dias_da_semana) VALUES ('${Numero_voo}', '${Companhia_aerea}', '${Dias_da_semana}')`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        }else{
            res.send(rows);
        }
    });

});


router.get('/flight-list', function(req,res){

    connection.query("SELECT * FROM voo", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.put('/flight-update', function(req,res){
    const {Numero_voo, Companhia_aerea, Dias_da_semana} = req.body;

    connection.query(`UPDATE voo SET Companhia_aerea = '${Companhia_aerea}', Dias_da_semana = '${Dias_da_semana}' WHERE Numero_voo = '${Numero_voo}'`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.delete('/flight-delete', function(req,res){
    const {Numero_voo} = req.body
    connection.query(`DELETE FROM voo WHERE Numero_voo = ${Numero_voo}`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;