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
const db_name = process.env.DATABASE_NAME || 'atxproducers';

const mongo_uri = `mongodb+srv://${user}:${password}@${cluster}/?${api_args}`
const client = new MongoClient(mongo_uri);

async function findDocumentById(collectionName, id, res) {
    try {
        const database = client.db(db_name);
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

async function findDocumentByDate(collectionName, date, res) {
    try {
        const database = client.db(db_name);
        const collection = database.collection(collectionName);
        const query = { date: date };
        const document = await collection.findOne(query);

        if (document) {
            res.json(document);
        } else {
            res.status(404).send(`${collectionName.slice(0, -1)} on ${date} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function getDocumentByAlias(collectionName, alias, res) {
    try {
        const database = client.db(db_name);
        const collection = database.collection(collectionName);
        const query = { alias: alias };
        const document = await collection.findOne(query);

        if (document) {
            res.json(document);
        } else {
            res.status(404).send(`${collectionName.slice(0, -1)} ${alias} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function getAllInCollection(collectionName, res) {
    try {
        const database = client.db(db_name);
        const collection = database.collection(collectionName);
        const documents = await collection.find().toArray();

        if (documents.length > 0) {
            res.json(documents);
        } else {
            res.status(404).send(`No ${collectionName} found`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

app.get('/meetups', async (req, res) => {
    getAllInCollection('meetups', res);
});

app.get('/producers', async (req, res) => {
    getAllInCollection('producers', res);
});

app.get('/resources', async (req, res) => {
    getAllInCollection('resources', res);
});

app.get('/submissions', async (req, res) => {
    getAllInCollection('submissions', res);
});

app.get('/meetups/id/:id', async (req, res) => {
    findDocumentById('meetups', req.params.id, res);
});

app.get('/producers/id/:id', async (req, res) => {
    findDocumentById('producers', req.params.id, res);
});

app.get('/resources/id/:id', async (req, res) => {
    findDocumentById('resources', req.params.id, res);
});

app.get('/submissions/id/:id', async (req, res) => {
    findDocumentById('submissions', req.params.id, res);
});

app.get('/meetups/date/:date', async (req, res) => {
    findDocumentByDate('meetups', req.params.date, res);
});

app.get('/producers/alias/:alias', async (req, res) => {
    getDocumentByAlias('producers', req.params.alias, res);
});

app.post('/resources', async (req, res) => {
    try {
        const database = client.db(db_name);
        const resources = database.collection('resources');
        const resourceData = req.body;
        const result = await resources.insertOne(resourceData);

        if (result.acknowledged) {
            res.status(201).send('Resource added successfully');
        } else {
            res.status(400).send('Error adding resource');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post ('/submissions', async (req, res) => {
    try {
        const database = client.db(db_name);
        const submissions = database.collection('submissions');
        const submissionData = req.body;
        const result = await submissions.insertOne(submissionData);

        if (result.acknowledged) {
            res.status(201).send('Submission added successfully');
        } else {
            res.status(400).send('Error adding submission');
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
