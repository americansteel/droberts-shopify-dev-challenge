import express from 'express';
import routes from './src/routes/shopRoutes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { ContactSchema } from './src/models/shopModel';

const path = require('path')
const app = express();
const PORT = 3000;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://shopify-user:shopify1234@ds129085.mlab.com:29085/shopify-developer-challenge', {
    useMongoClient: true
});

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

//swagger setup
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//serving static files
app.use(express.static('public'))

app.get('/', (req, res) =>
    res.send(`Node and express is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is is running on port ${PORT}`)
);