const { MongoClient } = require('mongodb');
const { user, password, cluster, apiArgs, dbName, dbSchemaPath, stage: environment } = require('./config');

let client;
const mongo_uri = `mongodb+srv://${user}:${password}@${cluster}/?${apiArgs}`

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(mongo_uri);
        await client.connect();
    }
    return client;
}

module.exports = { connectToDatabase };