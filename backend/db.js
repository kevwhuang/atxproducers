const path = require('path');
const { MongoClient } = require('mongodb');
const { dbName } = require('./config');
const { error } = require('console');

let client;
const mongo_uri = `mongodb+srv://${user}:${password}@${cluster}/?${apiArgs}`
const validateId = createValidator(stage !== 'production' ? ajv.compile(testIdSchema) : ajv.compile(idSchema));
const validateDate = createValidator(ajv.compile(dateSchema));
const validateAlias = createValidator(ajv.compile(aliasSchema));
const validateInput = createValidator(ajv.compile(loadDBSchema(dbSchemaPath)));

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(mongo_uri);
        await client.connect();
    }
    return client;
}

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

function errorHandler(err, req, res, next) {
    console.error(err);

    res.status(500).json({
        message: 'An unexpected error occurred. Please try again later.'
    });
}

module.exports = {
    connectToDatabase, 
    findDocumentByDate, 
    findDocumentById, 
    getDocumentByAlias, 
    getAllInCollection,
    addDocumentToCollection,
    errorHandler,
    validateId,
    validateDate,
    validateAlias,
    validateInput
};
