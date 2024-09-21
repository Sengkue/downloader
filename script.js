const API_KEY = '32033819-d1c055cd90058f2879aa55993'; // Your Pixabay API key

document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`);
    const data = await response.json();

    displayImages(data.hits);
});

function displayImages(images) {
    const imageResults = document.getElementById('image-results');
    imageResults.innerHTML = ''; // Clear previous results

    images.forEach(image => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');
        imageDiv.innerHTML = `
            <img src="${image.webformatURL}" alt="${image.tags}">
            <input type="checkbox" class="checkbox" data-url="${image.largeImageURL}">
        `;
        imageResults.appendChild(imageDiv);
    });
}

// Function to generate a formatted date string
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

document.getElementById('download-button').addEventListener('click', () => {
    const selectedImages = document.querySelectorAll('.image input[type="checkbox"]:checked');

    selectedImages.forEach((checkbox) => {
        const imageUrl = checkbox.dataset.url; // Use the data attribute
        const link = document.createElement('a');
        const formattedDate = getFormattedDate();
        link.href = imageUrl;
        link.download = `sengkuevang_${formattedDate}.jpg`; // Custom filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
