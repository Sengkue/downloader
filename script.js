const API_KEY = '32033819-d1c055cd90058f2879aa55993'; // Your Pixabay API key
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const imageResults = document.getElementById('image-results');
const downloadButton = document.getElementById('download-button');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`);
    const data = await response.json();
    displayImages(data.hits);
});

function displayImages(images) {
    imageResults.innerHTML = ''; // Clear previous results
    images.forEach(image => {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'image';
        imageDiv.innerHTML = `
            <input type="checkbox" class="checkbox" value="${image.largeImageURL}">
            <img src="${image.previewURL}" alt="${image.tags}">
        `;
        imageResults.appendChild(imageDiv);
    });
}

downloadButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.checkbox:checked');
    checkboxes.forEach(checkbox => {
        const imageUrl = checkbox.value;
        const link = document.createElement('a');
        
        // Generate the new file name
        const currentDateTime = new Date().toISOString().replace(/[:T]/g, '-').split('.')[0]; // Format: YYYY-MM-DD-HH-MM-SS
        const fileName = `bysengkuevang-${currentDateTime}.jpg`;

        link.href = imageUrl;
        link.download = fileName; // Set the new filename
        link.click();
    });
});
