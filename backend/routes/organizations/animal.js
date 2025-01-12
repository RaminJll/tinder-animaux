const express = require('express');
const Animal = require('../../models/Animals');
const authMiddleware = require('../../authMiddleware');
const router = express.Router();

// Route pour ajouter un animal
router.post('/add', authMiddleware, async (req, res) => {
    const { name, age, race, euthanasie, gender, description, imageUrl } = req.body;

    try {
        // Créez un nouvel animal lié à l'organisation connectée
        const animal = await Animal.create({
            name,
            age,
            race,
            euthanasie,
            gender,
            description,
            imageUrl,
            organization: req.user._id, // L'organisation provient du middleware
        });

        // Ajoutez l'animal à la liste des animaux de l'organisation
        req.user.animals.push(animal._id);
        await req.user.save();

        res.status(201).json({ message: 'Animal ajouté avec succès', animal });
    } catch (err) {
        console.error("Erreur lors de l'ajout de l'animal :", err);
        res.status(400).json({ message: 'Erreur lors de l\'ajout de l\'animal', error: err.message });
    }
});


// Route pour récupérer les animaux d'une organisation
router.get('/organizationAnimal', authMiddleware, async (req, res) => {
    try {
        const animals = await Animal.find({ organization: req.user._id });

        // Renvoyer la liste des animaux
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des animaux", error });
    }
});

module.exports = router;
