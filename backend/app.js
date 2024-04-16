const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const api_args = process.env.MONGO_ARGS || 'retryWrites=true&w=majority';

const mongo_uri = `mongodb+srv://${user}:${password}@${cluster}/?${api_args}`
const client = new MongoClient(mongo_uri);

async function findDocumentById(collectionName, id, res) {
    try {
        const database = client.db('atxproducers');
        const collection = database.collection(collectionName);
        const query = { _id: id };
        const document = await collection.findOne(query);

        if (document) {
            res.json(document);
        } else {
            res.status(404).send(`${collectionName.slice(0, -1)} ${id} not found`);
        }
    } catch {
        console.error(error);
        res.status(500).send(error);
    }
}

app.get('/meetups/:id', async (req, res) => {
    findDocumentById('meetups', req.params.id, res);
});

app.get('/producers/:id', async (req, res) => {
    findDocumentById('producers', req.params.id, res);
});

app.get('/resources/:id', async (req, res) => {
    findDocumentById('resources', req.params.id, res);
});

app.get('/submissions/:id', async (req, res) => {
    findDocumentById('submissions', req.params.id, res);
});

app.post('/producers', async (req, res) => {
    try {
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
        res.status(500).send(error);
    }
});

async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB')
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

startServer();
