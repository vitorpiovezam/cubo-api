import * as express from 'express';
import * as mongoose  from 'mongoose';
import { credentials } from './core/config/enviroment';

const app = express();
const port = process.env.PORT || 8080;

const apiUrl = `mongodb://${credentials.username}:${credentials.password}mongodb://<dbuser>:<dbpassword>@ds243607.mlab.com:43607/cubo-api`;

mongoose.connect(apiUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log('Mongo successful launch at ' + new Date());
}).catch((err) => {
    console.log(err + new Date());
})

app.get('/', (req, res) => {
    res.send('ta funfando /o/');
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
