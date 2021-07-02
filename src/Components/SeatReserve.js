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
        console.log('Your DB Seat Reserve is connected!')
    }
});

//Métodos para integração Aeroporto

router.post('/seat-reserve-add', function(req,res){
    //Criação Das Variáveis:
    const {Numero_voo, Numero_trecho, Data, Numero_assento, Nome_cliente, Telefone_cliente} = req.body;

    connection.query(`INSERT INTO reserva_assento (Numero_voo, Numero_trecho, Data, Numero_assento, Nome_cliente, Telefone_cliente) VALUES ('${Numero_voo}', '${Numero_trecho}', '${Data}', '${Numero_assento}', '${Nome_cliente}', '${Telefone_cliente}')`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        }else{
            res.send(rows);
        }
    });

});


router.get('/seat-reserve-list', function(req,res){

    connection.query("SELECT * FROM reserva_assento", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.put('/seat-reserve-update', function(req,res){
    const {Numero_voo, Numero_trecho, Data, Numero_assento, Nome_cliente, Telefone_cliente} = req.body;

    connection.query(`UPDATE reserva_assento SET Nome_cliente = '${Nome_cliente}', Telefone_cliente = '${Telefone_cliente}' WHERE Numero_voo = '${Numero_voo}' AND Numero_trecho = '${Numero_trecho}' AND Data = '${Data}' AND Numero_assento = '${Numero_assento}'`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

router.delete('/seat-reserve-delete', function(req,res){
    const {Numero_voo, Numero_trecho, Data, Numero_assento} = req.body
    connection.query(`DELETE FROM reserva_assento WHERE Numero_voo = '${Numero_voo}' AND Numero_trecho = '${Numero_trecho}' AND Data = '${Data}' AND Numero_assento = '${Numero_assento}'`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

module.exports = router;