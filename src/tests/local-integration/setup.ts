import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import app from '../../app';
import http from 'http';

let mongoServer: MongoMemoryServer;
let client: MongoClient;
let server: http.Server;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;
  client = new MongoClient(uri);
  await client.connect();  
  (global as any).mongoClient = client;
  console.debug(`MongoDB server started at ${uri}`);

  // Start the Express server
  const port = process.env.PORT || 3002;
  server = app.listen(port);
  (global as any).expressServer = server;
  console.debug(`Express server listening at http://localhost:${port}`);
});

afterAll(async () => {
  if (client) await client.close();
  await mongoServer.stop();

  await new Promise<void>((resolve) => server.close(() => resolve()));
});
