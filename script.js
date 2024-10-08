let currentPage = 1;
let imagesPerPage = 10;

// Update the number of images per page
document.getElementById("images-per-page").addEventListener("change", (event) => {
    imagesPerPage = parseInt(event.target.value, 10);
    currentPage = 1;
    fetchImages();
});

// Trigger search on Enter key
document.getElementById("search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchImages();
    }
});

// Clear icon functionality
const searchInput = document.getElementById("search-input");
const clearIcon = document.getElementById("clear-icon");

searchInput.addEventListener("input", () => {
    clearIcon.style.display = searchInput.value.length > 0 ? 'block' : 'none';
});

clearIcon.addEventListener("click", () => {
    searchInput.value = "";
    clearIcon.style.display = 'none';
});

// Search button functionality
document.getElementById("search-button").addEventListener("click", () => {
    fetchImages();
});

// Fetch images from Pixabay API
async function fetchImages() {
    const query = document.getElementById("search-input").value;
    const apiKey = '32033819-d1c055cd90058f2879aa55993';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${imagesPerPage}&page=${currentPage}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.hits);
        updatePagination(data.totalHits);
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Display images in results
function displayImages(images) {
    const imageResults = document.getElementById("image-results");
    imageResults.innerHTML = ""; // Clear previous results

    images.forEach(image => {
        const div = document.createElement("div");
        div.classList.add("image");

        const img = document.createElement("img");
        img.src = image.webformatURL;
        img.alt = image.tags;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.value = image.largeImageURL;

        div.appendChild(img);
        div.appendChild(checkbox);
        imageResults.appendChild(div);
    });

    // Select all functionality
    const selectAllCheckbox = document.getElementById("select-all");
    selectAllCheckbox.addEventListener("change", (event) => {
        const checkboxes = document.querySelectorAll(".checkbox");
        checkboxes.forEach(checkbox => {
            checkbox.checked = event.target.checked;
        });
    });
}

// Update pagination
function updatePagination(totalHits) {
    const pageInfo = document.getElementById("page-info");
    const totalPages = Math.ceil(totalHits / imagesPerPage);

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prev-button").disabled = currentPage === 1;
    document.getElementById("next-button").disabled = currentPage === totalPages;
}

// Previous page button functionality
document.getElementById("prev-button").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchImages();
    }
});

// Next page button functionality
document.getElementById("next-button").addEventListener("click", () => {
    currentPage++;
    fetchImages();
});

// Download selected images functionality
document.getElementById("download-button").addEventListener("click", async () => {
    const checkboxes = document.querySelectorAll(".checkbox:checked");
    for (const checkbox of checkboxes) {
        const url = checkbox.value;
        const dateTime = new Date().toISOString().replace(/T/, '_').replace(/\..+/, '');
        const randomSuffix = Math.floor(Math.random() * 1000000);
        const filename = `sengkuevang_${dateTime}_${randomSuffix}.jpg`;

        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(link.href); // Clean up
        } catch (err) {
            console.error("Download error:", err);
        }
    }
});
