// =========================
// Identify Plants (Client)
// =========================

// Local proxy endpoint (NOT PlantNet directly — avoids CORS)
const PROXY_URL = "http://localhost:3100/identify";

// Select elements
const fileInput = document.getElementById("plant-image");
const identifyBtn = document.getElementById("identify-btn");
const previewContainer = document.getElementById("preview-container");
const previewImg = document.getElementById("preview-img");
const resultsContainer = document.getElementById("results-container");

let uploadedImageFile = null;

// -------------------------
// Image Preview
// -------------------------
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    uploadedImageFile = file;
    const reader = new FileReader();

    reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewContainer.style.display = "block";
    };

    reader.readAsDataURL(file);
});

// -------------------------
// Identify Plant
// -------------------------
identifyBtn.addEventListener("click", async () => {
    resultsContainer.innerHTML = "";

    if (!uploadedImageFile) {
        resultsContainer.innerHTML = `<p>Please upload an image first.</p>`;
        return;
    }

    try {
        const formData = new FormData();
        formData.append("images", uploadedImageFile, uploadedImageFile.name);
        formData.append("organs", "leaf");
        // Removed 'include-related-images' as it's optional and not needed for core functionality

        resultsContainer.innerHTML = `<p>Identifying plant... Please wait.</p>`;

        // Send request to local proxy
        const response = await fetch(PROXY_URL, {
            method: "POST",
            body: formData
        });

        // Read raw text for debugging or JSON
        const rawText = await response.text();

        if (!response.ok) {
            console.error("⚠ PlantNet/raw error text:", rawText);
            // This is the error seen in your image. It should now return the PlantNet error.
            throw new Error("PlantNet returned error " + response.status + " — " + rawText);
        }

        let data;
        try {
            data = JSON.parse(rawText);
        } catch (err) {
            console.error("JSON parse error:", rawText);
            throw new Error("Invalid JSON returned by server.");
        }

        // -------------------------
        // Display results
        // --------------------------
        if (!data.results || data.results.length === 0) {
            resultsContainer.innerHTML = `<p>No plant identified. Try a clearer image.</p>`;
            return;
        }

        const best = data.results[0];
        const name = best.species?.scientificName || "Unknown";
        const score = Math.round(best.score * 100);

        resultsContainer.innerHTML = `
            <div class="identified-plant-result">
                <h3>Result:</h3>
                <p><strong>${name}</strong></p>
                <p>Confidence: ${score}%</p>
            </div>
        `;

    } catch (error) {
        console.error("Identification error:", error);
        resultsContainer.innerHTML = `<p>Error identifying plant. Check console for details.</p>`;
    }
});