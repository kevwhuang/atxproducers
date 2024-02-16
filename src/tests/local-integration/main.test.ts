import { MongoClient, Db } from 'mongodb';

describe('Local Integration Tests', () => {
  let client: MongoClient;
  let db: Db; // Explicitly type the `db` variable as `Db`

  beforeAll(async () => {
    // Assuming the MongoDB connection setup is handled in setup.ts
    // Connect to the in-memory database
    client = (global as any).mongoClient;
    db = client.db(); // `db` is now correctly typed as `Db`
  });

  it('should match the producer data with the jDilla JSON file', async () => {
    const producerData = await db.collection('producers').findOne({ alias: 'J Dilla' });
    
    // Directly load the jDilla JSON file for comparison
    const jDillaData = require('./data/jDilla.json');
    
    if (producerData !== null) {
        expect(producerData.name).toEqual(jDillaData.name);
    } else {
        fail('Producer data not found');
    }
  });
});
