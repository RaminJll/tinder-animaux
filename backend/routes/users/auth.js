const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const router = express.Router();

// Récupération de la clé secrète pour le token
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

// Route d'inscription
router.post('/register', async (req, res) => {
    const { email, password, name, recherche, ageAnimal, euthanasie, genderAnimal } = req.body;
    console.log("Données reçues :", req.body); // Vérifiez que les données arrivent correctement

    try {
        const user = await User.create({ email, password, name, recherche, ageAnimal, euthanasie, genderAnimal });
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error("Erreur lors de la création de l'utilisateur:", err);
        res.status(400).json({ message: 'Erreur lors de la création de l’utilisateur', error: err.message });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }
    // Utilisation de jwtSecret pour signer le token
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
});
module.exports = router;