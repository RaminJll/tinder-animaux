const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const Organization = require('./models/Organization');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Récupérer le token de l'en-tête

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret); // Remplacez par votre secret JWT
        const organization = await Organization.findById(decoded.id); // Assurez-vous que le payload contient l'ID
        if (!organization) {
            return res.status(404).json({ message: 'Organisation introuvable' });
        }

        req.user = organization; // Ajouter l'organisation au req
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddleware;
