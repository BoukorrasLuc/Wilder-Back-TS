// Packages
import express, { Request, Response, Application } from 'express';
import { connect } from 'mongoose';
require('dotenv').config();
import cors from 'cors';
const cloudinary = require('cloudinary').v2;

// App Config
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_PUBLIC_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Models
const WilderModel = require('./models/Wilder');

// Database
connect(process.env.MONGODB_URI as string, {
  autoIndex: true,
})
  .then(() => {
    return console.log('Connected to MongoDB database...');
  })
  .catch((err) => console.log('Could not connect', err));

const wilderRoutes = require('./routes/wilder');
app.use(wilderRoutes);

// Routes
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello Typescript with Node.js!');
});

// Start server
app.listen(process.env.PORT, (): void => {
  console.log(`Server Running here 👉`);
});
