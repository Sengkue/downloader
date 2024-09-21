const API_KEY = 'YOUR_UNSPLASH_API_KEY'; // Replace with your Unsplash API Key
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const imageResults = document.getElementById('image-results');
const downloadButton = document.getElementById('download-button');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}`);
    const data = await response.json();
    displayImages(data.results);
});

function displayImages(images) {
    imageResults.innerHTML = '';
    images.forEach(image => {
        const div = document.createElement('div');
        div.classList.add('image');
        div.innerHTML = `
            <input type="checkbox" class="checkbox" value="${image.urls.regular}">
            <img src="${image.urls.thumb}" alt="${image.description || 'Image'}">
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
