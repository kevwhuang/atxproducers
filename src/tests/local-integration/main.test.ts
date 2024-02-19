import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { MongoClient, Db } from 'mongodb';

describe('Local Integration Tests', () => {
  const baseURL = process.env.API_BASE_URL || 'http://localhost:3000/api';

  it('should match the producer data with the jDilla JSON file', async () => {
    // Load DB with jDilla data
    let client: MongoClient;
    let db: Db;
    const jDillaData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'jDilla.json'), 'utf-8'));
    beforeAll(async () => {
      // Assuming the MongoDB connection setup is handled in setup.ts
      // Connect to the in-memory database
      client = (global as any).mongoClient;
      db = client.db();
      await db.collection('producers').insertOne(jDillaData);
    });

    try {
      const response = await axios.get(`${baseURL}/producers`, { params: { alias: 'J Dilla' } });
      const producerData = response.data;
      expect(producerData.name).toEqual(jDillaData.name);
    } catch (error) {
      console.error('Error fetching producer data:', error);
      // Explicitly fail the test if the API call fails
      expect(error).toBeUndefined();
    }
  }, 1000);
});
