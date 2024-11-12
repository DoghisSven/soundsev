function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    // Check if file is either .mp3 or .wav
    if (file.type !== 'audio/mp3' && file.type !== 'audio/wav') {
        alert("Only MP3 and WAV files are allowed.");
        return;
    }

    // Display upload status
    document.getElementById('upload-status').textContent = "Uploading...";

    const formData = new FormData();
    formData.append("file", file);

    fetch("/upload", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('upload-status').textContent = "File uploaded successfully!";
            displayUploadedSound(data.filename);
        } else {
            document.getElementById('upload-status').textContent = "Error uploading file.";
        }
    })
    .catch(error => {
        document.getElementById('upload-status').textContent = "Error uploading file.";
        console.error("Error:", error);
    });
}

function displayUploadedSound(filename) {
    const soundContainer = document.getElementById('uploadedSounds');
    const soundElement = document.createElement('button');
    soundElement.classList.add('sound-card');
    soundElement.textContent = filename;

    soundElement.onclick = () => {
        const audio = new Audio(`/uploads/${filename}`);
        audio.play();
    };

    soundContainer.appendChild(soundElement);
}
