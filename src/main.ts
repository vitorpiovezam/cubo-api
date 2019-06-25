import * as express from 'express';
import { credentials } from './core/config/enviroment';
import { MongoClient } from 'mongodb';
import * as assert from 'assert';

const app = express();
const port = process.env.PORT || 8080;

const apiUrl = `mongodb://${credentials.username}:${credentials.password}@ds243607.mlab.com:43607/cubo-api`;
const dbName = 'cubo-api';

MongoClient.connect(apiUrl, { useNewUrlParser: true }, (err, client) => {
    console.log('Connected successfully to server at ' + new Date());
    const db = client.db(dbName);
    client.close();
});

app.get('/', (req, res) => {
    res.send('ta funfando /o/');
});

app.get('/users', (req, res) => {
    
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
