const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const api_args = process.env.MONGO_ARGS || 'retryWrites=true&w=majority'

const mongo_uri = `mongodb+srv://${user}:${password}@${cluster}/?${api_args}`

const client = new MongoClient(mongo_uri);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/producers/:alias', async (req, res) => {
    const alias = req.params.alias;
    try {
        await client.connect();
        const database = client.db('atxproducers');
        const producers = database.collection('producers');
        const query = { alias: alias };
        const producer = await producers.findOne(query);

        if (producer) {
            res.json(producer);
        } else {
            res.status(500).send('Producer not found');
        }
    } catch {
        console.error(error);
        res.status(500).send('Error connecting to the database');
    }
});

app.get('/movie', async (req, res) => {
    const title = req.query.title || 'Back to the Future';
    try {
        await client.connect();
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');
        const query = { title: title };
        const movie = await movies.findOne(query);

        if (movie) {
            res.json(movie);
        } else {
            res.status(500).send('Movie not found');
        }
    } catch {
        console.error(error);
        res.status(500).send('Error connecting to the database');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/producers', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('atxproducers');
        const producers = database.collection('producers');

        const producerData = req.body;
        const result = await producers.insertOne(producerData);

        if (result.acknowledged) {
            res.status(201).send('Producer added successfully');
        } else {
            res.status(400).send('Error adding producer');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
