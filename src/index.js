const express = require('express');

app = express()

app.use(require('./Components/Airport.js'));
app.use(require('./Components/Rate.js'));
app.use(require('./Components/avgRate.js'));
app.use(require('./Components/FlightCount.js'));

app.listen(3306);