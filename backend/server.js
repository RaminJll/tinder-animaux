const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
mongoose.connect('mongodb+srv://raminjll:273RJrjllfi.@bdd-tinder.txtkf.mongodb.net/?retryWrites=true&w=majority&appName=bdd-tinder', { useNewUrlParser: true, useUnifiedTopology: true })
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));


const Animal = require('./models/Animals');
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
app.use(express.json());


app.post('/animals', async (req, res) => {
    const { name, age, race, imageUrl } = req.body;
    const animal = new Animal({ name, age, race, imageUrl });
    await animal.save();
    res.send(animal);
});



app.get('/animals', async (req, res) => {
    const animals = await Animal.find();
    res.send(animals);
});
