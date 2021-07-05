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
        console.log('Your DB AVG Rate is connected!')
    }
});

//Métodos para integração Tarifa

router.get('/avg-rate-list', function(req,res){

    connection.query("select A.Companhia_aerea, avg(B.Quantidade) as Média_tarifa from Voo as A inner join TARIFA as B on A.Numero_voo=B.Numero_voo group by A.Companhia_aerea", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});


module.exports = router;