import * as express from 'express';
import { credentials } from './core/config/enviroment';
import { MongoClient } from 'mongodb';
import * as assert from 'assert';
import { User } from './core/models/user.model';

async function run() {
    const app = express();
    const port = process.env.PORT || 8000;

    const apiUrl = `mongodb://${credentials.username}:${credentials.password}@ds243607.mlab.com:43607/cubo-api`;
    const dbName = 'cubo-api';

    const client = await MongoClient.connect(apiUrl, { useNewUrlParser: true });
    const db = client.db(dbName);

    app.get('/', (req, res) => {
        res.send('ta funfando /o/');
    });

    app.get('/users', async (req, res) => {
        let response: User[] = [];

        const cursor = await db.collection('users').find();
        
        await cursor.forEach(user => {
            response.push(Object.assign(new User(), user));
        });

        res.json(response);
    });

    app.post('/users', (req, res) => {
       
    });

    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });

};

run();