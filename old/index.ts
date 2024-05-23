'use strict';

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import path from 'path';
import url from 'url';

import { type Meetup } from '../src/types/global';
import { type Producer } from '../src/types/global';
import { type Resource } from '../src/types/global';
import { type Submission } from '../src/types/global';

type Arr = (Meetup | Producer | Resource | Submission)[];

function logger(req: express.Request, _: express.Response, next: express.NextFunction): void {
    console.table({
        time: new Date().toISOString(),
        url: `${req.protocol}://${req.get('host')}${req.path}`,
        method: req.method,
    });
    next();
}

async function append(endpoint: string, arr: Arr): Promise<void> {
    const config = { assert: { type: 'json' } };
    const res = await import(`./content${endpoint}`, config);
    arr.push(res.default);
}

async function controllerMeetups(_: express.Request, res: express.Response): Promise<void> {
    const data: Meetup[] = [];
    for (const meetup of meetups) {
        await append(`/meetups/${meetup}`, data);
    }
    res.send(data);
}

async function controllerProducers(_: express.Request, res: express.Response): Promise<void> {
    const data: Producer[] = [];
    for (const producer of producers) {
        await append(`/producers/${producer}`, data);
    }
    res.send(data);
}

async function controllerResources(_: express.Request, res: express.Response): Promise<void> {
    const data: Resource[] = [];
    for (const resource of resources) {
        await append(`/resources/${resource}`, data);
    }
    res.send(data);
}

async function controllerSubmissions(_: express.Request, res: express.Response): Promise<void> {
    const data: Submission[] = [];
    for (const submission of submissions) {
        await append(`/submissions/${submission}`, data);
    }
    res.send(data);
}

const base = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'content');
const meetups = fs.readdirSync(`${base}/meetups`);
const producers = fs.readdirSync(`${base}/producers`);
const resources = fs.readdirSync(`${base}/resources`);
const submissions = fs.readdirSync(`${base}/submissions`);

const options = {
    credentials: true,
    origin: '*',
    methods: ['GET', 'POST'],
};

const app = express();

app.listen(process.env['PORT'] ?? 5000, () => {
    console.log('\x1b[35m%s\x1b[0m', `Listening on port ${process.env['PORT'] ?? 5000}.`);
});

app.disable('strict routing');
app.enable('case sensitive routing');
app.set('env', 'production');

app.use(express.raw());
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(options));
app.use(helmet());
app.use(logger);

app.get('/api/meetups', controllerMeetups);
app.get('/api/producers', controllerProducers);
app.get('/api/resources', controllerResources);
app.get('/api/submissions', controllerSubmissions);
app.post('/api/submissions', (req, res) => res.send(req.body.source));

app.all('/', (_, res) => res.send(''));
app.all('*', (_, res) => res.status(308).redirect('/'));
