const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');

const Animal = require('./models/Animals');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//user 
const authRoutes = require('./routes/users/auth');
const userAnimals = require('./routes/users/animal');


//organizations
const organizationAuth = require('./routes/organizations/auth');
const organizationAddAnimal = require('./routes/organizations/animal');


// Connectez-vous à MongoDB
const uri = 'mongodb+srv://raminjll:<password>@bdd-tinder.txtkf.mongodb.net/?retryWrites=true&w=majority&appName=bdd-tinder';

// Connectez-vous à MongoDB
mongoose.connect(uri)
    .then(() => console.log('Connecté à MongoDB Atlas'))
    .catch(err => console.error('Erreur de connexion à MongoDB Atlas :', err));


// Configurez CORS
app.use(cors({
    origin: 'http://localhost:3000', // Autoriser les requêtes du frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes HTTP autorisées
    credentials: true, // Autorisez les cookies si nécessaires
}));

// Pour traiter les données JSON
app.use(express.json());

// Routes d'authentification
app.use('/users/auth', authRoutes);
app.use('/organizations/auth', organizationAuth);

// Routes pour les organisations
app.use('/organizations/animals', organizationAddAnimal);

//routes pour les utilisateurs
app.use('/users/animals', userAnimals);

// Démarrez le serveur
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
