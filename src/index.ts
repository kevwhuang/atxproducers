import app from './app';
import mongoose from 'mongoose';

const connectToDB = async () => {
    const defaultMongoUri = 'mongodb://localhost/apa';
    const mongoUri = process.env.MONGODB_URI || defaultMongoUri;

    await mongoose.connect(mongoUri);
};
connectToDB();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
