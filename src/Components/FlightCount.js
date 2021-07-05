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
        console.log('Your DB Flight Count is connected!')
    }
});

//Métodos para integração Contador Por Vôos

router.get('/flight-count-list', function(req,res){

    connection.query("select A.nome, count(B.Numero_voo) as quant_voos_partem  from Aeroporto as A inner join Trecho_voo as B on A.Codigo_aeroporto = B.Codigo_aeroporto_partida group by A.nome order by count(B.Numero_trecho) ASC ", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});


module.exports = router;