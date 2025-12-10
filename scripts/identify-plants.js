// identify-plants.js — FINAL VERSION

console.log("🌿 identify-plants.js loaded");

// ================================
// DOM Elements
// ================================
const fileInput = document.getElementById("plant-image");
const previewContainer = document.getElementById("preview-container");
const previewImg = document.getElementById("preview-img");
const identifyBtn = document.getElementById("identify-btn");
const resultsContainer = document.getElementById("results-container");

// ================================
// Show Preview on File Select
// ================================
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    previewImg.src = URL.createObjectURL(file);
    previewContainer.style.display = "block";
});

// ================================
// Identify Plant Button Click
// ================================
identifyBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload an image first.");
        return;
    }

    console.log("📸 Preparing image for upload:", file.name);

    const formData = new FormData();
    formData.append("image", file); // IMPORTANT: must match server.js field name

    try {
        console.log("📤 Sending to server...");

        // ⭐ MATCHES server.js route EXACTLY
        const response = await fetch("http://localhost:3100/identify-plants", {
            method: "POST",
            body: formData
        });

        const text = await response.text();

        console.log("📥 Raw server response:", text);

        // If PlantNet returned HTML → error
        if (text.startsWith("<")) {
            throw new Error("Server returned HTML error page.");
        }

        const data = JSON.parse(text);

        if (!response.ok) {
            throw new Error("PlantNet returned error " + response.status + " — " + text);
        }

        displayResults(data);

    } catch (err) {
        console.error("❌ Identification error:", err);
        resultsContainer.innerHTML = `
            <p style="color: red;">Error identifying plant. Check console for details.</p>
        `;
    }
});

// ================================
// Display Results from PlantNet API
// ================================
function displayResults(data) {
    console.log("🌿 Parsed identification data:", data);

    if (!data || !data.results || data.results.length === 0) {
        resultsContainer.innerHTML = `<p>No plant identified. Try another image.</p>`;
        return;
    }

    const best = data.results[0];
    const species = best.species;

    resultsContainer.innerHTML = `
        <h3>Best Match: ${species.scientificName}</h3>
        <p><strong>Common Names:</strong> ${species.commonNames.join(", ")}</p>
        <p><strong>Confidence:</strong> ${(best.score * 100).toFixed(2)}%</p>
        
        <h4>Images</h4>
        <img src="${best.images[0].url}" style="max-width:200px; border-radius:8px;">
    `;
}
