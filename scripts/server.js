// 🔥 Confirm the server file actually loads
console.log("🔥 SERVER FILE LOADED");

import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import cors from "cors";

// Init express
const app = express();
app.use(cors());

// Multer for file upload (memory storage)
const upload = multer();

// Your API key
const API_KEY = "2b105qRcVdoYpbjT6VjGbS2Qe";

// The correct PlantNet endpoint
const PLANTNET_URL = `https://my-api.plantnet.org/v1/identify?api-key=${API_KEY}`;

console.log("🌱 Using PlantNet URL:", PLANTNET_URL);

// -------------------------------
// IDENTIFY ROUTE
// -------------------------------
app.post("/identify", upload.single("images"), async (req, res) => {

    console.log("🔥 /identify route HIT");

    try {
        if (!req.file) {
            console.log("❌ No file received");
            return res.status(400).json({ error: "No image uploaded" });
        }

        console.log("📸 File received:", req.file.originalname, req.file.mimetype, req.file.size);

        const form = new FormData();
        form.append("images", req.file.buffer, req.file.originalname);
        form.append("organs", "leaf");

        console.log("📤 Sending image to PlantNet...");

        const plantRes = await fetch(PLANTNET_URL, {
            method: "POST",
            body: form,
            headers: form.getHeaders()
        });

        const rawText = await plantRes.text();

        console.log("📥 PlantNet responded with status:", plantRes.status);

        res.status(plantRes.status).send(rawText);

    } catch (err) {
        console.error("💥 Proxy server error:", err);
        res.status(500).json({ error: "Server error", detail: err.message });
    }
});

// -------------------------------
// START SERVER
// -------------------------------
const PORT = 5050;
app.listen(PORT, () => {
    console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
