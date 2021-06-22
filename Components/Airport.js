var express = require('express');
var mysql = require ('mysql');
var app = express();
app.use(express.json())

var connection = mysql.createConnection({
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
        console.log('Your DB is connected!')
    }
});

//Métodos para integração Aeroporto

app.post('/airport-add', function(req,res){
    //Criação Das Variáveis:
    const {Codigo_aeroporto, Nome, Cidade, Estado} = req.body;

    connection.query(`INSERT INTO aeroporto (Codigo_aeroporto, Nome, Cidade, Estado) VALUES ('${Codigo_aeroporto}', '${Nome}', '${Cidade}', '${Estado}')`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        }else{
            console.log('Deu bom')
            res.send(rows);
        }
    });

});

app.get('/airport-list', function(req,res){

    connection.query("SELECT * FROM aeroporto", function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

app.put('/airport-update', function(req,res){
    const {Codigo_aeroporto, Nome, Cidade, Estado} = req.body;

    connection.query(`UPDATE aeroporto SET Nome = '${Nome}', Cidade = '${Cidade}', Estado = '${Estado}' WHERE Codigo_Aeroporto = '${Codigo_aeroporto}'`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

app.delete('/airport-delete', function(req,res){
    const {Codigo_aeroporto} = req.body
    connection.query(`DELETE FROM aeroporto WHERE Codigo_aeroporto = ${Codigo_aeroporto}`, function(error, rows){
        if(!!error){
            res.send(error.sqlMessage);
        } else {
            res.send(rows);
        }
    });

});

app.listen(1337);