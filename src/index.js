const express = require('express');

app = express()

app.use(require('./Components/Airplane.js'));
app.use(require('./Components/Airport.js'));
app.use(require('./Components/FlightExcerpt.js'));
app.use(require('./Components/Flight.js'));
app.use(require('./Components/Rate.js'));
app.use(require('./Components/SnippetInstance.js'));
app.use(require('./Components/AllowLand.js'));
app.use(require('./Components/SeatReserve.js'));

app.listen(1337);