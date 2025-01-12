const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, enum: ['jeune', 'adulte', 'senior'], required: true },
    race: { type: String, required: true },
    euthanasie: { type: Boolean, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Utilisateurs qui ont liké
});

module.exports = mongoose.model('Animal', AnimalSchema);