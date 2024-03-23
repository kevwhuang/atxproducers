'use strict';

import 'dotenv/config';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import path from 'path';
import url from 'url';

function logger(req, _, next) {
    console.table({
        time: new Date().toISOString(),
        url: `${req.protocol}://${req.get('host')}${req.path}`,
        method: req.method,
    });
    next();
}

async function append(endpoint, arr) {
    const config = { assert: { type: 'json' } };
    const res = await import(`../content${endpoint}`, config);
    arr.push(res.default);
}

async function controllerMeetups(_, res) {
    const data = [];
    for (const meetup of meetups) {
        await append(`/meetups/${meetup}`, data);
    }
    res.send(data);
}

async function controllerProducers(_, res) {
    const data = [];
    for (const producer of producers) {
        await append(`/producers/${producer}`, data);
    }
    res.send(data);
}

async function controllerResources(_, res) {
    const data = [];
    for (const resource of resources) {
        await append(`/resources/${resource}`, data);
    }
    res.send(data);
}

async function controllerSubmissions(_, res) {
    const data = [];
    for (const submission of submissions) {
        await append(`/submissions/${submission}`, data);
    }
    res.send(data);
}

const base = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../content');
const meetups = fs.readdirSync(`${base}/meetups`).slice(1);
const producers = fs.readdirSync(`${base}/producers`).slice(1);
const resources = fs.readdirSync(`${base}/resources`).slice(1);
const submissions = fs.readdirSync(`${base}/submissions`).slice(1);

const options = {
    credentials: true,
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
};

const app = express();

app.listen(process.env.PORT, () => {
    console.log('\x1b[35m%s\x1b[0m', `Server listening on PORT ${process.env.PORT}.`);
});

app.disable('strict routing');
app.enable('case sensitive routing');
app.set('env', 'production');

app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(compression());
app.use(cors(options));
app.use(helmet());
app.use(logger);

app.use('/api/meetups', controllerMeetups);
app.use('/api/producers', controllerProducers);
app.use('/api/resources', controllerResources);
app.use('/api/submissions', controllerSubmissions);

app.all('/', (_, res) => res.send(''));
app.all('*', (_, res) => res.status(308).redirect('/'));
