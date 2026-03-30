const express = require("express");
const router = express.Router();
const multer = require("multer");
const Document = require("../models/Document");

// storage
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });
// ✅ UPLOAD WITH VERSION
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { tags, username, permission } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "File missing" });
        }

        const originalName = req.file.originalname;

        // ✅ find existing versions
        const existingDocs = await Document.find({ originalName });

        let version = 1;

        if (existingDocs.length > 0) {
            const latest = existingDocs.sort((a, b) => b.version - a.version)[0];
            version = latest.version + 1;
        }

        const newDoc = new Document({
            filename: req.file.filename,
            tags,
            owner: username,
            permission,
            originalName,
            version
        });

        await newDoc.save();

        res.json({ message: "Uploaded version " + version });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Upload failed" });
    }
});

// GET ALL
router.get("/", async (req, res) => {
    const docs = await Document.find();
    res.json(docs);
});

// SEARCH
router.get("/search", async (req, res) => {
    const q = req.query.q;

    const docs = await Document.find({
        tags: { $regex: q, $options: "i" }
    });

    res.json(docs);
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ error: "Not found" });
        }

        if (doc.permission !== "edit") {
            return res.status(403).json({ error: "No permission" });
        }

        await Document.findByIdAndDelete(req.params.id);

        res.json({ message: "Deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});

module.exports = router;