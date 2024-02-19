import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let mongoServer: MongoMemoryServer;
let client: MongoClient;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  client = new MongoClient(uri);
  await client.connect();

  (global as any).mongoClient = client;
});

afterAll(async () => {
  if (client) await client.close();
  await mongoServer.stop();
});
