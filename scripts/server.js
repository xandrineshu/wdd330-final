import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import cors from "cors";

const app = express();
const upload = multer();

app.use(cors());

// server.js
// ... imports and setup
const API_KEY = "2b105qRcVdoYpbjT6VjGbS2Qe";

// 🔥 CRITICAL FIX: Add &api-version=1 to the URL
const PLANTNET_URL = `https://api.plantnet.org/v1/identify?api-key=${API_KEY}&api-version=1`;

// ... rest of the code
// ... ensure you restart your server after this change

app.post("/identify", upload.single("images"), async (req, res) => {
    try {
        // Removed redundant inner try/catch block for cleaner structure
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const form = new FormData();
        form.append("images", req.file.buffer, req.file.originalname);
        form.append("organs", "leaf");

        // Debug: log outgoing request
        console.log("Sending request to PlantNet:", PLANTNET_URL);
        console.log("Headers:", form.getHeaders());
        console.log("Uploaded file name:", req.file.originalname);

        const plantRes = await fetch(PLANTNET_URL, {
            method: "POST",
            body: form,
            headers: form.getHeaders()
        });

        const text = await plantRes.text();
        // Debug: log response
        console.log("PlantNet response status:", plantRes.status);
        console.log("PlantNet response body:", text);

        // Send the raw text back, including status code,
        // which the client side will handle.
        res.status(plantRes.status).send(text);
    } catch (err) {
        console.error("Proxy server error:", err);
        // Ensure to send a JSON response on 500 server error
        res.status(500).json({ error: "Proxy server error", detail: err.message });
    }
});

// Add a port listener so the server starts
const PORT = 3100;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});