const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const xss = require('xss-clean');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { default: rateLimit } = require('express-rate-limit');
const { idSchema, testIdSchema, dateSchema, aliasSchema } = require('./schemas');
const { port, dbName, dbSchemaPath, stage } = require('./config');
const { connectToDatabase } = require('./index');

function loadDBSchema(filePath) {
    try{
        const absPath = path.resolve(__dirname, '..', filePath);
        const fileData = fs.readFileSync(absPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

function createValidator(validator) {
    return function(req, res, next) {
        const valid = validator(req.params);
        if (!valid) {
            res.status(400).json(validator.errors);
            return;
        }
        next();
    };
}

async function findDocumentByDate(collectionName, date, res) {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
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

async function findDocumentById(collectionName, id, res) {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
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

async function getDocumentByAlias(collectionName, alias, res) {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
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
        const client = await connectToDatabase();
        const database = client.db(dbName);
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

async function startServer() {
    try {
        await connectToDatabase();
        console.log('Connected to MongoDB')
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

const app = express();
app.use(express.json({ limit: '100kb'}));
app.use(xss());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "atxproducers.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    }
}));
app.use(cors());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateId = createValidator(stage !== 'production' ? ajv.compile(testIdSchema) : ajv.compile(idSchema));
const validateDate = createValidator(ajv.compile(dateSchema));
const validateAlias = createValidator(ajv.compile(aliasSchema));
const validateInput = createValidator(ajv.compile(loadDBSchema(dbSchemaPath)));

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

app.get('/meetups/id/:id', validateId, async (req, res) => {
    findDocumentById('meetups', req.params.id, res);
});

app.get('/producers/id/:id', validateId, async (req, res) => {
    findDocumentById('producers', req.params.id, res);
});

app.get('/resources/id/:id', validateId, async (req, res) => {
    findDocumentById('resources', req.params.id, res);
});

app.get('/submissions/id/:id', validateId, async (req, res) => {
    findDocumentById('submissions', req.params.id, res);
});

app.get('/meetups/date/:date', validateDate, async (req, res) => {
    findDocumentByDate('meetups', req.params.date, res);
});

app.get('/producers/alias/:alias', validateAlias, async (req, res) => {
    getDocumentByAlias('producers', req.params.alias, res);
});

app.post('/resources', validateInput, async (req, res) => {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
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

app.post ('/submissions', validateInput, async (req, res) => {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
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

startServer();
