const express = require('express');
const cors = require('cors');
const routes = require('./routes')
require('./database/connection');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(process.env.PORT || 5000);