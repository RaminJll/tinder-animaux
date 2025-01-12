// routes/animals.js
const express = require('express');
const Animal = require('../../models/Animals');
const authMiddleware = require('../../authMiddleware');
const router = express.Router();

// Route pour récupérer tous les animaux pour les utilisateur
router.get('/all', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des animaux', error });
  }
});

module.exports = router;
