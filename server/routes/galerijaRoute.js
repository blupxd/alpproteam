const express = require('express');
const firebase = require('firebase/app');
const config = require('../firebase-config.json');
const { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } = require('firebase/storage');
const multer = require('multer');
const Galerija = require('../models/GalerijaModel');
const jwt = require('jsonwebtoken')
const router = express.Router();

firebase.initializeApp(config);
const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });
router.use(upload.any())

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Unauthorized - Invalid authorization header format' });
    }

    jwt.verify(token, process.env.TAJNI_KLJUC, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden - Invalid token' });
        }
        req.user = user;
        next();
    });
}


router.get("/", async (req, res) => {
    try {
        const slike = await Galerija.find();
        res.status(200).json(slike);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const slika = await Galerija.findById(req.params.id);
        res.status(200).json(slika);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.delete("/:id",verifyToken, async (req, res) => {
    const slikaId = req.params.id;
    try {
        const slika = await Galerija.findById(slikaId);
        if (!slika) {
            return res.status(404).json({ message: "Slika nije pronađena." });
        }

        const imageRef = ref(storage, `slike/${slika.slikaAlt}`);
        await deleteObject(imageRef);

        await Galerija.findByIdAndDelete(slikaId);

        res.status(200).json({ message: "Slika uspešno obrisana." });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/:id", verifyToken, upload.single("filename"), async (req, res) => {
    const slikaId = req.params.id;
    const { posao } = req.body;

    try {
        const slika = await Galerija.findById(slikaId);
        if (!slika) {
            return res.status(404).json({ message: "Slika nije pronađena." });
        }

        if (req.file) {
            const oldImageRef = ref(storage, `slike/${slika.slikaAlt}`);
            await deleteObject(oldImageRef);

            const dateTime = Date.now();
            const newStorageRef = ref(storage, `slike/${"slika" + dateTime}`);
            const newMetadata = {
                contentType: req.file.mimetype
            };
            const newSnapshot = await uploadBytesResumable(newStorageRef, req.file.buffer, newMetadata);
            const newDownloadURL = await getDownloadURL(newSnapshot.ref);

            // Update image data in MongoDB
            const updatedSlika = await Galerija.findByIdAndUpdate(
                slikaId,
                {
                    slikaURL: newDownloadURL,
                    slikaAlt: "slika" + dateTime,
                    posao: posao
                },
                { new: true }
            );

            return res.status(200).json(updatedSlika);
        } else if (posao) {
            // Update only posao field
            const updatedSlika = await Galerija.findByIdAndUpdate(slikaId, { posao: posao }, { new: true });
            return res.status(200).json(updatedSlika);
        } else {
            return res.status(400).json({ message: "Nijedna promena nije poslata." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});


router.post("/", verifyToken, upload.single("filename"), async (req, res) => {
    try {
        const dateTime = Date.now();
        const storageRef = ref(storage, `slike/${"slika" + dateTime}`);
        const metadata = {
            contentType: req.file.mimetype
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const posao = req.body.posao || '';

        const newSlika = new Galerija({
            slikaURL: downloadURL,
            slikaAlt: "slika" + dateTime,
            posao: posao
        });

        await newSlika.save();
        res.status(200).send(newSlika);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
