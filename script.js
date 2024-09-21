const API_KEY = 'YOUR_PIXABAY_API_KEY'; // Replace with your Pixabay API Key
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const imageResults = document.getElementById('image-results');
const downloadButton = document.getElementById('download-button');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=20`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayImages(data.hits);
    } catch (error) {
        console.error("Error fetching images:", error);
        imageResults.innerHTML = '<p>Could not fetch images. Please try again.</p>';
    }
});

function displayImages(images) {
    imageResults.innerHTML = '';
    if (!images || images.length === 0) {
        imageResults.innerHTML = '<p>No images found.</p>';
        return;
    }
    
    images.forEach(image => {
        const div = document.createElement('div');
        div.classList.add('image');
        div.innerHTML = `
            <input type="checkbox" class="checkbox" value="${image.largeImageURL}">
            <img src="${image.previewURL}" alt="${image.tags}">
        `;
        imageResults.appendChild(div);
    });
}

downloadButton.addEventListener('click', async () => {
    const checkboxes = document.querySelectorAll('.checkbox:checked');
    for (const checkbox of checkboxes) {
        const url = checkbox.value;
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = url.substring(url.lastIndexOf('/') + 1); // Get the file name from the URL
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});
