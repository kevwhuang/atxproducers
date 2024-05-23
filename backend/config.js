require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    cluster: process.env.MONGO_CLUSTER,
    apiArgs: process.env.MONGO_ARGS || 'retryWrites=true&w=majority',
    dbName: process.env.DATABASE_NAME || 'atxproducers',
    dbSchemaPath: process.env.DB_SCHEMA || 'schemas/collections.json',
    stage: process.env.STAGE || 'production'
};
