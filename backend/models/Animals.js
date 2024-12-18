const mongoose = require('mongoose');
const AnimalSchema = new mongoose.Schema({
name: String,
age: Number,
race: String,
imageUrl: String,
likes: { type: Array, default: [] },
dislikes: { type: Array, default: [] },
});
module.exports = mongoose.model('Animal', AnimalSchema);