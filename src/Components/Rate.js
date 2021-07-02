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
        console.log('Your DB Rate is connected!')
    }
});

//Métodos para integração Tarifa

router.post('/rate-add', function(req,res){
    //Criação Das Variáveis:
    const {Numero_voo, Codigo_tarifa, Quantidade, Restricoes} = req.body;

    connection.query(`INSERT INTO tarifa (Numero_voo, Codigo_tarifa, Quantidade, Restricoes) VALUES ('${Numero_voo}', '${Codigo_tarifa}', '${Quantidade}', '${Restricoes}')`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        }else{
            res.send(rows);
        }
    });

});

router.get('/rate-list', function(req,res){

    connection.query("SELECT * FROM tarifa", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.put('/rate-update', function(req,res){
    const {Numero_voo, Codigo_tarifa, Quantidade, Restricoes} = req.body;

    connection.query(`UPDATE tarifa SET Quantidade = '${Quantidade}', Restricoes = '${Restricoes}', WHERE Numero_voo = '${Numero_voo}' AND Codigo_tarifa = '${Codigo_tarifa}'`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.delete('/rate-delete', function(req,res){
    const {Numero_voo, Codigo_tarifa} = req.body

    connection.query(`DELETE FROM tarifa WHERE Numero_voo = '${Numero_voo}' AND Codigo_tarifa = '${Codigo_tarifa}`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;