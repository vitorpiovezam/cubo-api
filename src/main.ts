import * as express from 'express';
import { credentials } from './core/config/enviroment';
import { MongoClient } from 'mongodb';
import { User } from './core/models/user.model';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

async function run() {
    const app = express();
    const port = process.env.PORT || 8080;

    const apiUrl = `mongodb://${credentials.username}:${credentials.password}@ds243607.mlab.com:43607/cubo-api`;
    const dbName = 'cubo-api';

    const client = await MongoClient.connect(apiUrl, { useNewUrlParser: true });
    const db = client.db(dbName);

    app.use(cors());    
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send('🔥');
    });

    app.get('/users', async (req, res) => {
        let response: User[] = [];
        const cursor = await db.collection('users').find();
        
        await cursor.forEach(user => {
            response.push(Object.assign(new User(), user));
        });

        res.json(response);
    });

    app.post('/users', async (req, res) => {
        try{
            let userJson = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                participation: req.body.participation
            }

            let user: User = Object.assign(new User(), userJson);
            
            let result = await db.collection('users').insertOne(user);
            res.json(result);
        }catch(err) {
            res.status(404);
        }
        

    });

    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });

};

run();
