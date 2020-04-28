const express = require("express");
const routes = require('./routes')
require('./database/connection');

const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(8000);