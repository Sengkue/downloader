const API_KEY = '32033819-d1c055cd90058f2879aa55993'; // Replace with your actual API key
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const imageResults = document.getElementById('image-results');
const downloadButton = document.getElementById('download-button');

searchButton.addEventListener('click', async () => {
    const query = encodeURIComponent(searchInput.value);
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`);
    const data = await response.json();
    displayImages(data.hits);
});

function displayImages(images) {
    imageResults.innerHTML = '';
    images.forEach(image => {
        const div = document.createElement('div');
        div.classList.add('image');

        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = image.largeImageURL;
        checkbox.classList.add('checkbox');

        div.appendChild(img);
        div.appendChild(checkbox);
        imageResults.appendChild(div);
    });
}

downloadButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.checkbox:checked');
    checkboxes.forEach(checkbox => {
        const imageUrl = checkbox.value;
        const imageId = checkbox.value.split('/').pop().split('_')[0]; // Get a short name from the URL
        const filename = `image_${imageId}.jpg`; // Create a shorter filename

        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename; // Set the custom filename
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
    });
});
