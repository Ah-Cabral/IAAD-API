var express = require('express');

app = express()

app.use(require('./Components/Airplane.js'));
app.use(require('./Components/Airport.js'));

app.listen(1337);