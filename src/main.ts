import * as express from 'express';
import { credentials } from './core/config/enviroment';
import { MongoClient } from 'mongodb';
import { User } from './core/models/user.model';
import * as cors from 'cors';

async function run() {
    const app = express();
    app.use(cors());    
    const port = process.env.PORT || 8080;

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

    app.post('/users', async (req, res) => {
        let userJson = req.params.user;

        try{
            let user: User = Object.assign(new User(), userJson);
            let response = await db.collection('users').insert(user);

            res.json(response);
        }catch(err) {
            res.status(404);
        }
        

    });

    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });

};

run(); // 🔥 
