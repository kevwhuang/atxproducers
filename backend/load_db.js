// Do not use for production, this is a one-time script to load the database
// Can be rerun to recover/update state for test DB
const { MongoClient } = require('mongodb');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 5000;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const api_args = process.env.MONGO_ARGS || 'retryWrites=true&w=majority';

const mongo_uri = `mongodb+srv://${user}:${password}@${cluster}/?${api_args}`

const client = new MongoClient(mongo_uri);

async function main() {
    try {
        await client.connect();
        const results = await Promise.all([
            update_collection('producers'),
            update_collection('meetups'),
            update_collection('resources'),
            update_collection('submissions')
        ]);
        console.log(results);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

async function update_collection(collection_name) {
    try {
        const database = client.db('atxproducers');
        const collection = database.collection(collection_name);
        const files = fs.readdirSync(`./content/${collection_name}`);

        for (const file of files) {
            extension = path.extname(file);
            if (extension === '.json') {
                const filePath = path.join(`./content/${collection_name}`, file);
                const jsonData = fs.readFileSync(filePath, { encoding: 'utf-8' });
                const data = JSON.parse(jsonData);

                // id is the filename, so be careful if you change filenames
                // the overwrite portion of this could break in that case
                const result = await collection.replaceOne(
                    { _id: path.basename(file, extension)},
                    data,
                    { upsert: true }
                );
                console.log(`Processed ${file}: ${result.upsertedCount ? 'Inserted' : 'Updated'}`);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

main();
