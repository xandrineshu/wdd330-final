// server.js — FINAL FIXED WITH PROJECT NAME

import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import cors from "cors";

const app = express();
app.use(cors());
const upload = multer();

const API_KEY = "2b105qRcVdoYpbjT6VjGbS2Qe";

// ⭐ Correct public API URL for v1 + default project "all"
const PLANTNET_URL = `https://api.plantnet.org/v1/all/identify?api-key=${API_KEY}`;

console.log("🌱 PlantNet URL in use:", PLANTNET_URL);

app.post("/identify-plants", upload.single("image"), async (req, res) => {
    console.log("🔥 /identify-plants HIT");

    if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
    }

    console.log("📸 File received:", req.file.originalname);

    const form = new FormData();
    form.append("images[]", req.file.buffer, req.file.originalname);
    form.append("organs", "leaf");

    try {
        const response = await fetch(PLANTNET_URL, {
            method: "POST",
            body: form,
            headers: form.getHeaders(),
        });

        const text = await response.text();
        console.log("📥 PlantNet responded with", response.status);

        res.status(response.status).send(text);

    } catch (err) {
        console.error("💥 Server error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3100, () => {
    console.log("🚀 Server running at http://localhost:3100");
});
