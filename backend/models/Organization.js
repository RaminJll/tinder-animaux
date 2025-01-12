const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const OrganizationSchema = new mongoose.Schema({
    siret: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: Number, required: true },
    animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
});

OrganizationSchema.pre('save', async function(next) {
if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});
// Méthode pour comparer les mots de passe
OrganizationSchema.methods.matchPassword = async function(enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Organization', OrganizationSchema);
