const video = document.getElementById("video");
const translationElement = document.getElementById("translation");

let model;

// Function to load the handpose model
async function loadModel() {
    model = await handpose.load();
    console.log("Handpose model loaded!");
    detectHand();
}

// Function to start detecting the hand gestures
async function detectHand() {
    const predictions = await model.estimateHands(video);
    
    if (predictions.length > 0) {
        // For now, we're just using a basic placeholder for detected gestures.
        // You would need to map actual hand positions to ASL gestures here.

        // Example: If a hand is detected, translate it as 'A'
        const gesture = "A";  // Placeholder logic for detecting ASL gesture 'A'

        // Update translation text
        translationElement.innerText = `Translation: ${gesture}`;
    } else {
        translationElement.innerText = `Translation: No hand detected`;
    }

    // Keep detecting hands in a loop
    requestAnimationFrame(detectHand);
}

// Access webcam and start the model
async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });
        video.srcObject = stream;
    } catch (error) {
        console.error("Error accessing webcam:", error);
    }
}

// Initialize the webcam and model
startWebcam();
loadModel();
