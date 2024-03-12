const express = require('express')
const firebase = require('firebase/app')
const config = require('../firebase-config.json')
const { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } = require('firebase/storage')
const multer = require('multer')
const Posao = require('../models/PosaoModel')
const jwt = require('jsonwebtoken')
const router = express.Router()

firebase.initializeApp(config)
const storage = getStorage()
router.use(express.json({ limit: '5mb' }));
router.use(express.urlencoded({ limit: '5mb', extended: true }));
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

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

router.get("/:id", async (req, res) => {
    const posaoId = req.params.id;
    try {
        const posao = await Posao.findById(posaoId);
        if (!posao) {
            return res.status(404).json({ message: "Posao nije pronađen." });
        }
        res.status(200).json(posao);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const poslovi = await Posao.find();
        res.status(200).json(poslovi);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    const posaoId = req.params.id;
    try {
        const posao = await Posao.findById(posaoId);
        if (!posao) {
            return res.status(404).json({ message: "Posao nije pronađen." });
        }

        const imageRef = ref(storage, `slike/${posao.slikaAlt}`);
        await deleteObject(imageRef);

        await Posao.findByIdAndDelete(posaoId);

        res.status(200).json({ message: "Posao uspešno obrisan." });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.put("/:id", verifyToken, upload.single("filename"), async (req, res) => {
    const posaoId = req.params.id;
    const { naziv, opis } = req.body;

    try {
        const posao = await Posao.findById(posaoId);
        if (!posao) {
            return res.status(404).json({ message: "Posao nije pronađen." });
        }

        // Ako postoji nova slika, ažuriraj je
        if (req.file) {
            const oldImageRef = ref(storage, `slike/${posao.slikaAlt}`);
            await deleteObject(oldImageRef);

            const dateTime = Date.now();
            const newStorageRef = ref(storage, `slike/${"slika" + dateTime}`);
            const newMetadata = {
                contentType: req.file.mimetype
            };
            const newSnapshot = await uploadBytesResumable(newStorageRef, req.file.buffer, newMetadata);
            const newDownloadURL = await getDownloadURL(newSnapshot.ref);

            // Ažuriraj sve informacije o poslu (tekstualna polja i slika)
            const updatedPosao = await Posao.findByIdAndUpdate(
                posaoId,
                { naziv, opis, slika: newDownloadURL, slikaAlt: "slika" + dateTime },
                { new: true }
            );

            res.status(200).json(updatedPosao);
        } else {
            // Ako nema nove slike, ažuriraj samo tekstualna polja
            const updatedPosao = await Posao.findByIdAndUpdate(
                posaoId,
                { naziv, opis },
                { new: true }
            );

            res.status(200).json(updatedPosao);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/",verifyToken, upload.single("filename"), async (req, res) => {
    const { naziv, opis } = req.body;
    try {
        const dateTime = Date.now()
        const storageRef = ref(storage, `slike/${"slika" + dateTime}`);
        const metadata = {
            contentType: req.file.mimetype
        }
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)
        const newPosao = new Posao({
            naziv: naziv,
            opis: opis,
            slika: downloadURL,
            slikaAlt: "slika" + dateTime
        })
        await newPosao.save()
        res.status(200).send(newPosao)
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports = router;
