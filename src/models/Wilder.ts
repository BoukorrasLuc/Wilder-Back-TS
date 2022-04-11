// Packages
import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Wilder extends Document {
  name: string;
  city: string;
  skills: Array<{ name: string; votes: number }>;
  image: File;
}

export interface File {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Wilder>({
  name: { type: String, required: true },
  city: String,
  skills: [{ title: String, votes: Number }],
  image: {
    name: String,
    size: Number,
    type: String,
    extension: String,
    content: Buffer,
  },
});

// 3. Create a Model.
const WilderModel = model<Wilder>('Wilder', schema);

module.exports = WilderModel;
