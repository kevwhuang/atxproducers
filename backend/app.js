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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

app.get('/meetups/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        await client.connect();
        const database = client.db('atxproducers');
        const meetups = database.collection('meetups');
        const query = { _id: eventId };
        const meetup = await meetups.findOne(query);

        if (meetup) {
            res.json(meetup);
        } else {
            res.status(404).send('Meetup not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to the database');
    }
});

app.get('/producers/:id', async (req, res) => {
    const producerId = req.params.id;
    try {
        await client.connect();
        const database = client.db('atxproducers');
        const producers = database.collection('producers');
        const query = { _id: producerId };
        const producer = await producers.findOne(query);

        if (producer) {
            res.json(producer);
        } else {
            res.status(404).send('Producer not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to the database');
    }
});

app.get('/resources/:id', async (req, res) => {
    const resourceId = req.params.id;
    try {
        await client.connect();
        const database = client.db('atxproducers');
        const resources = database.collection('resources');
        const query = { _id: resourceId };
        const resource = await resources.findOne(query);

        if (resource) {
            res.json(resource);
        } else {
            res.status(404).send('Resource not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to the database');
    }
});

app.get('/submissions/:id', async (req, res) => {
    const submissionId = req.params.id;
    try {
        await client.connect();
        const database = client.db('atxproducers');
        const submissions = database.collection('submissions');
        const query = { _id: submissionId };
        const submission = await submissions.findOne(query);

        if (submission) {
            res.json(submission);
        } else {
            res.status(404).send('Submission not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to the database');
    }
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
