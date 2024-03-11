const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

router.use(express.json());

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Korisničko ime i lozinka su obavezni podaci.' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Korisnik već postoji.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Registracija uspešna.' });
    } catch (error) {
        console.error('Greška pri registraciji:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Pogrešno korisničko ime ili lozinka.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Pogrešno korisničko ime ili lozinka.' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.TAJNI_KLJUC);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Greška pri prijavi:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
