const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    recherche: [{ type: String, required: true }], //c'est la race de l'animal recherché
    ageAnimal: { type: String, enum: ['jeune', 'adulte', 'senior'], required: true },
    euthanasie: { type: Boolean, required: true },
    genderAnimal: { type: String, enum: ['male', 'female'], required: true },
    likedAnimals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }], // Animaux likés
    dislikedAnimals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }], // Animaux dislikés
});
// Hacher le mot de passe avant de sauvegarder l'utilisateur
UserSchema.pre('save', async function(next) {
if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});
// Méthode pour comparer les mots de passe
UserSchema.methods.matchPassword = async function(enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);