import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

let mongoServer: MongoMemoryServer;
let client: MongoClient;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  client = new MongoClient(uri);
  await client.connect();

  (global as any).mongoClient = client;
  
  const db = client.db("testDB");
  
  // Load jDilla data
  const jDillaData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'jDilla.json'), 'utf-8'));
  
  // Insert jDilla data into the database
  await db.collection('producers').insertOne(jDillaData);
});

afterAll(async () => {
  if (client) await client.close();
  await mongoServer.stop();
});
