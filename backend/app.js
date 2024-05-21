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

function errorHandler(err, req, res, next) {
    console.error(err);

    res.status(500).json({
        message: 'An unexpected error occurred. Please try again later.'
    });
}

async function findDocumentByDate(collectionName, date) {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = { date: date };
        const document = await collection.findOne(query);
        return document;
    } catch (error) {
        throw(error);
    }
}

async function findDocumentById(collectionName, id) {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = { _id: id };
        const document = await collection.findOne(query);
        return document
    } catch {
        throw(error);
    }
}

async function getDocumentByAlias(collectionName, alias) {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = { alias: alias };
        const document = await collection.findOne(query);
        return document;
    } catch (error) {
        throw(error);
    }
}

async function getAllInCollection(collectionName) {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const documents = await collection.find().toArray();
        return documents;
    } catch (error) {
        throw(error);
    }
}

async function addDocumentToCollection(collectionName, document) {
    const client = await connectToDatabase();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.insertOne(document);
    if (!result.acknowledged) {
        throw new Error('Failed to add document to collection');
    }
    return result;
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
app.use(errorHandler);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateId = createValidator(stage !== 'production' ? ajv.compile(testIdSchema) : ajv.compile(idSchema));
const validateDate = createValidator(ajv.compile(dateSchema));
const validateAlias = createValidator(ajv.compile(aliasSchema));
const validateInput = createValidator(ajv.compile(loadDBSchema(dbSchemaPath)));

app.get('/meetups', async (req, res, next) => {
    getAllInCollection('meetups')
        .then(data => res.json(data))
        .catch(next);
});

app.get('/producers', async (req, res, next) => {
    getAllInCollection('producers')
        .then(data => res.json(data))
        .catch(next);
});

app.get('/resources', async (req, res, next) => {
    getAllInCollection('resources')
        .then(data => res.json(data))
        .catch(next);
});

app.get('/submissions', async (req, res, next) => {
    getAllInCollection('submissions')
        .then(data => res.json(data))
        .catch(next);
});

app.get('/meetups/id/:id', validateId, async (req, res, next) => {
    findDocumentById('meetups', req.params.id)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/producers/id/:id', validateId, async (req, res, next) => {
    findDocumentById('producers', req.params.id)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/resources/id/:id', validateId, async (req, res, next) => {
    findDocumentById('resources', req.params.id)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/submissions/id/:id', validateId, async (req, res, next) => {
    findDocumentById('submissions', req.params.id)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/meetups/date/:date', validateDate, async (req, res, next) => {
    findDocumentByDate('meetups', req.params.date)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/producers/alias/:alias', validateAlias, async (req, res, next) => {
    getDocumentByAlias('producers', req.params.alias)
        .then(data => res.json(data))
        .catch(next);
});

app.post('/resources', validateInput, async (req, res, next) => {
    try {
        const result = await addDocumentToCollection('resources', req.body);
        res.status(201).send('Resource added successfully');
    } catch (error) {
        next(error);
    }
});

app.post ('/submissions', validateInput, async (req, res) => {
    try {
        const result = await addDocumentToCollection('submissions', req.body);
        res.status(201).send('Submission added successfully');
    } catch (error) {
        next(error);
    }
});

startServer();
