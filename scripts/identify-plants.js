// =================================================================
// 🌳 Pl@ntNet API Integration Script (scripts/identify-plants.js)
// =================================================================

// *** IMPORTANT: Insert your actual Pl@ntNet API Key here ***
const API_KEY = "2b105qRcVdoYpbjT6VjGbS2Qe";
const API_URL = "https://my-api.plantnet.org/v2/identify/all";

// --- DOM Elements ---
const imageInput = document.getElementById('plant-image');
const identifyButton = document.getElementById('identify-btn');
const resultsContainer = document.getElementById('results-container');
const previewContainer = document.getElementById('preview-container');
const previewImg = document.getElementById('preview-img');

// --- Event Listeners ---

// 1. Image Change Listener (for previewing the image)
imageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result;
            previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewContainer.style.display = 'none';
        previewImg.src = '';
    }
});

// 2. Button Click Listener (for running identification)
identifyButton.addEventListener('click', identifyPlant);


/**
 * Main function to handle file upload and call the Pl@ntNet API.
 */
async function identifyPlant() {
    const file = imageInput.files[0];

    // --- Validation and Setup ---
    if (!file) {
        resultsContainer.innerHTML = '<p class="error-message">Please select an image file first.</p>';
        return;
    }

    if (API_KEY === "INSERT_YOUR_PLANTNET_API_KEY_HERE" || API_KEY === "") {
        resultsContainer.innerHTML = '<p class="error-message">**ERROR**: Please insert your actual Pl@ntNet API key into the script.</p>';
        return;
    }

    // You could add a hidden select element for organ, but for simplicity, 
    // we'll default to 'auto' for now.
    const organ = 'auto';

    // 1. UI feedback
    identifyButton.disabled = true;
    identifyButton.textContent = 'Identifying...';
    resultsContainer.innerHTML = '<div class="loading-spinner"></div><p>Analyzing image with Pl@ntNet...</p>';

    // Optional: Add a simple spinner style to your CSS
    /*
    .loading-spinner { border: 4px solid rgba(0,0,0,.1); border-left-color: #007bff; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin: 10px auto; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    */

    try {
        // 2. Prepare the payload as MultipartFormData
        const formData = new FormData();
        formData.append('images', file);
        formData.append('organs', organ);

        // 3. Make the API request
        const response = await fetch(`${API_URL}?api-key=${API_KEY}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle HTTP errors or API-specific errors
            const errorMessage = data.message || response.statusText;
            throw new Error(`Identification Failed: ${errorMessage}. Check your API key and network connection.`);
        }

        // 4. Display the results
        displayResults(data);

    } catch (error) {
        console.error('Identification failed:', error);
        resultsContainer.innerHTML = `<p class="error-message">${error.message}</p>`;
    } finally {
        // 5. UI cleanup
        identifyButton.disabled = false;
        identifyButton.textContent = 'Identify Plant';
    }
}


/**
 * Formats and displays the identification results in the resultsContainer.
 * @param {object} data - The JSON response from the Pl@ntNet API.
 */
function displayResults(data) {
    let htmlContent = '<h3>Identification Results</h3>';

    if (data.results && data.results.length > 0) {
        htmlContent += '<h4>Top Matches:</h4>';

        data.results.slice(0, 3).forEach((match, index) => {
            const probability = (match.score * 100).toFixed(2);
            const species = match.species.scientificNameWithoutAuthor;
            const commonName = match.species.commonNames ? match.species.commonNames.join(', ') : 'N/A';
            const genus = match.species.genus.scientificNameWithoutAuthor;

            htmlContent += `
                <div class="plant-match" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 4px;">
                    <strong>#${index + 1} Match (${probability}%)</strong>
                    <p>
                        <strong>Common Name(s):</strong> ${commonName}<br>
                        <strong>Scientific Name:</strong> <em>${species}</em><br>
                        <strong>Genus:</strong> <em>${genus}</em>
                    </p>
                    <button class="add-to-plants-btn" data-scientific-name="${species}" data-common-name="${commonName}">
                        Add to My Plants
                    </button>
                </div>
            `;
        });
    } else {
        htmlContent += '<p>Sorry, the plant could not be identified. Please ensure the image is clear and focused on the plant.</p>';
    }

    resultsContainer.innerHTML = htmlContent;

    // Add event listeners for the "Add to My Plants" buttons
    document.querySelectorAll('.add-to-plants-btn').forEach(button => {
        button.addEventListener('click', handleAddToPlants);
    });
}


/**
 * Placeholder function for integrating with the 'My Plants' list and Firebase.
 * @param {Event} event - The click event.
 */
function handleAddToPlants(event) {
    // This is where you would integrate with your Firebase/Database logic
    const scientificName = event.target.dataset.scientificName;
    const commonName = event.target.dataset.commonName;

    alert(`Adding ${commonName || scientificName} to your plant collection. (Integration logic to Firebase/Database goes here!)`);

    // In a real application, you would:
    // 1. Get the current logged-in user ID (from firebase-login.js)
    // 2. Call a function to save the plant details (scientificName, commonName)
    //    to your Firebase Firestore/Realtime Database under that user's ID.
}


// --- Final Setup ---

// Optionally disable the button until a file is selected (for better UX)
imageInput.addEventListener('change', () => {
    identifyButton.disabled = imageInput.files.length === 0;
});

// Disable the button on load
identifyButton.disabled = true;

// You can add styles/classes to your mobile.css or desktop.css to make the results look good!