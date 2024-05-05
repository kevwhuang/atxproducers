const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const xss = require('xss-clean');
const express = require('express');
const { MongoClient } = require('mongodb');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const port = process.env.PORT || 5000;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const apiArgs = process.env.MONGO_ARGS || 'retryWrites=true&w=majority';
const dbName = process.env.DATABASE_NAME || 'atxproducers';
const dbSchemaPath = process.env.DB_SCHEMA || 'schemas/collections.json';
const environment = process.env.NODE_ENV || 'production';

const mongo_uri = `mongodb+srv://${user}:${password}@${cluster}/?${apiArgs}`
const client = new MongoClient(mongo_uri);

const testIdSchema = {
    type: "object",
    properties: {
        id: { type: "string", pattern: "^[0-9a-zA-Z_\.\-]+$" }
    },
    required: ["id"],
    additionalProperties: false
};

const idSchema = {
    type: "object",
    properties: {
        id: { type: "string", pattern: "^[0-9a-fA-F]{24}$" }
    },
    required: ["id"],
    additionalProperties: false
};

const dateSchema = {
    type: "object",
    properties: {
        date: { type: "string", format: "date-time" }
    },
    required: ["date"],
    additionalProperties: false
};

const aliasSchema = {
    type: "object",
    properties: {
        alias: { type: "string", pattern: "^[a-zA-Z0-9_\.\-]+$"}
    },
    required: ["alias"],
    additionalProperties: false
};

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

const validateId = environment !== 'production' ? ajv.compile(testIdSchema) : ajv.compile(idSchema);
const validateDate = ajv.compile(dateSchema);
const validateAlias = ajv.compile(aliasSchema);
const dBschema = loadDBSchema(dbSchemaPath);
const validatePost = ajv.compile(dBschema);

function validateIdMiddleware(req, res, next) {
    const valid = validateId({ id: req.params.id });
    if (!valid) {
        res.status(400).json(validateId.errors);
        return;
    }
    next();
}

function validateDateMiddleware(req, res, next) {
    const valid = validateDate({ date: req.params.date });
    if (!valid) {
        console.log("Date validation error")
        res.status(400).json(validateDate.errors);
        return;
    }
    next();
}

function validateAliasMiddleware(req, res, next) {
    const valid = validateAlias({ alias: req.params.alias });
    if (!valid) {
        res.status(400).json(validateAlias.errors);
        return;
    }
    next();
}

function validateInputMiddleware(req, res, next) {
    const valid = validatePost(req.body);
    if (!valid) {
        res.status(400).json(validatePost.errors);
        return;
    }
    next();
}

async function findDocumentById(collectionName, id, res) {
    try {
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

async function findDocumentByDate(collectionName, date, res) {
    try {
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

async function getDocumentByAlias(collectionName, alias, res) {
    try {
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

app.get('/meetups/id/:id', validateIdMiddleware, async (req, res) => {
    findDocumentById('meetups', req.params.id, res);
});

app.get('/producers/id/:id', validateIdMiddleware, async (req, res) => {
    findDocumentById('producers', req.params.id, res);
});

app.get('/resources/id/:id', validateIdMiddleware, async (req, res) => {
    findDocumentById('resources', req.params.id, res);
});

app.get('/submissions/id/:id', validateIdMiddleware, async (req, res) => {
    findDocumentById('submissions', req.params.id, res);
});

app.get('/meetups/date/:date', validateDateMiddleware, async (req, res) => {
    findDocumentByDate('meetups', req.params.date, res);
});

app.get('/producers/alias/:alias', validateAliasMiddleware, async (req, res) => {
    getDocumentByAlias('producers', req.params.alias, res);
});

app.post('/resources', validateInputMiddleware, async (req, res) => {
    try {
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

app.post ('/submissions', validateInputMiddleware, async (req, res) => {
    try {
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
