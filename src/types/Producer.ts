import mongoose from 'mongoose';

const producerSchema = new mongoose.Schema({
    admin: Boolean,
    featured: Boolean,
    speaker: Boolean,
    alias: String,
    description: String,
    name: String,
    photo: String,
    genres: [String],
    instruments: [String],
    links: {
      bandcamp: String,
      instagram: String,
      soundcloud: String,
      spotify: String,
      tiktok: String,
      website: String,
    },
    workstations: [String],
  });

const Producer = mongoose.model('Producer', producerSchema);

export default Producer;
