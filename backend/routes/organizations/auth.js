const express = require('express');
const jwt = require('jsonwebtoken');
const Organization = require('../../models/Organization');
const router = express.Router();

// Récupération de la clé secrète pour le token
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

// Route d'inscription
router.post('/register', async (req, res) => {
    const { email, password, name, siret, phone, address, ville, codePostal } = req.body;
    console.log("Données reçues :", req.body); // Vérifiez que les données arrivent correctement

    try {
        const organization = await Organization.create({ siret, email, password, name, phone, address, ville, codePostal });
        // Utilisation de jwtSecret pour signer le token
        const token = jwt.sign({ id: organization._id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error("Erreur lors de la création de l'utilisateur:", err);
        res.status(400).json({ message: 'Erreur lors de la création de l’utilisateur', error: err.message });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const organization = await Organization.findOne({ email });
    if (!organization || !(await organization.matchPassword(password))) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }
    // Utilisation de jwtSecret pour signer le token
    const token = jwt.sign({ id: organization._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
