const xss = require('xss-clean');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { default: rateLimit } = require('express-rate-limit');

const { port } = require('./config');
const { 
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
} = require('./db');


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
app.set('trust proxy', 1);
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

app.get('/api/meetups', async (req, res, next) => {
    getAllInCollection('meetups')
        .then(data => res.json(data))
        .catch(next);
});

app.get('/api/producers', async (req, res, next) => {
    getAllInCollection('producers')
        .then(data => res.json(data))
        .catch(next);
});

app.get('/api/resources', async (req, res, next) => {
    getAllInCollection('resources')
        .then(data => res.json(data))
        .catch(next);
});

app.get('/api/submissions', async (req, res, next) => {
    getAllInCollection('submissions')
        .then(data => res.json(data))
        .catch(next);
});

app.get('/api/meetups/id/:id', validateId, async (req, res, next) => {
    findDocumentById('meetups', req.params.id)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/api/producers/id/:id', validateId, async (req, res, next) => {
    findDocumentById('producers', req.params.id)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/api/resources/id/:id', validateId, async (req, res, next) => {
    findDocumentById('resources', req.params.id)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/api/submissions/id/:id', validateId, async (req, res, next) => {
    findDocumentById('submissions', req.params.id)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/api/meetups/date/:date', validateDate, async (req, res, next) => {
    findDocumentByDate('meetups', req.params.date)
        .then(data => res.json(data))
        .catch(next);
});

app.get('/api/producers/alias/:alias', validateAlias, async (req, res, next) => {
    getDocumentByAlias('producers', req.params.alias)
        .then(data => res.json(data))
        .catch(next);
});

app.post('/api/resources', validateInput, async (req, res, next) => {
    try {
        // const result = await addDocumentToCollection('resources', req.body);
        res.status(201).send('Resource added successfully');
    } catch (error) {
        next(error);
    }
});

app.post ('/api/submissions', validateInput, async (req, res) => {
    try {
        // const result = await addDocumentToCollection('submissions', req.body);
        res.status(201).send('Submission added successfully');
    } catch (error) {
        next(error);
    }
});

startServer();
