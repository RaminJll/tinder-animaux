const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const Organization = require('./models/Organization');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret); 
        const organization = await Organization.findById(decoded.id);
        if (!organization) {
            return res.status(404).json({ message: 'Organisation introuvable' });
        }

        req.user = organization; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddleware;
