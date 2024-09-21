const API_KEY = '32033819-d1c055cd90058f2879aa55993'; // Replace with your Pixabay API Key
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
        div.classList.add('link');
        div.innerHTML = `
            <input type="checkbox" class="checkbox" value="${image.largeImageURL}">
            <a href="${image.largeImageURL}" download>${image.tags || 'Download Image'}</a>
        `;
        imageResults.appendChild(div);
    });
}

downloadButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.checkbox:checked');
    checkboxes.forEach(checkbox => {
        const link = document.createElement('a');
        link.href = checkbox.value;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
