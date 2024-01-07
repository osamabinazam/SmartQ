const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
// const routes = require('./routes/');
// const cors = require('cors');
const db = require('./src/db/connection');

// .env file configuration
require('dotenv').config();

// Express app
const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(helmet());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the SmartQ API'
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
}
);


db.connect();