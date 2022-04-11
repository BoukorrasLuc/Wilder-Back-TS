import express, { Request, Response } from 'express';
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Import the Wilder model
const WilderModel = require('../models/Wilder');

// Route all Wilders
router.get('/api/wilder/read', async (req: Request, res: Response) => {
  try {
    const wilder = await WilderModel.find();

    res.status(200).json(wilder);
  } catch (error) {
    res.status(400).json({ error: error });
    console.log({ error: error });
  }
});

// Route Create
router.post('/api/wilder/create', async (req: Request, res: Response) => {
  try {
    const wilder = await WilderModel.findOne({ name: req.body.name });

    if (!wilder) {
      if (req.body.city && req.body.skills) {
        const newWilder = new WilderModel({
          name: req.body.name,
          city: req.body.city,
          skills: req.body.skills,
        });

        if (req.body.image) {
          const result = await cloudinary.uploader.upload(
            req.body.avatar.path,
            {
              folder: `/Wilder/users/${newWilder._id}`,
            }
          );
          newWilder.image = result;
        }

        await newWilder.save();
        console.log(`New Wilder created: ${newWilder.name}`);
        res.status(201).json(newWilder);
      } else {
        return res.status(400).json({ message: 'Missing parameters' });
      }
    } else {
      return res.status(409).json({
        message: 'An account already exists for this name.',
      });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.put('/api/wilder/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const wilderModify = await WilderModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    res
      .status(201)
      .json({ message: 'Wilder modified succesfully !', wilderModify });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Route delete
router.delete('/api/wilder/delete/:id', async (req: Request, res: Response) => {
  try {
    await WilderModel.deleteOne({ _id: req.params.id });

    res.json({ message: 'Wilder deleted succesfully !' });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
