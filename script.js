let currentPage = 1;
let imagesPerPage = 10;

document.getElementById("images-per-page").addEventListener("change", (event) => {
    imagesPerPage = parseInt(event.target.value, 10);
    currentPage = 1;
    fetchImages();
});

document.getElementById("search-button").addEventListener("click", () => {
    fetchImages();
});

// Function to fetch images from Pixabay API
function fetchImages() {
    const query = document.getElementById("search-input").value;
    const apiKey = '32033819-d1c055cd90058f2879aa55993';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${imagesPerPage}&page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayImages(data.hits);
            updatePagination(data.totalHits);
        })
        .catch(error => console.error("Error fetching images:", error));
}

// Display images in the UI
function displayImages(images) {
    const imageResults = document.getElementById("image-results");
    imageResults.innerHTML = ""; // Clear previous results

    images.forEach(image => {
        const div = document.createElement("div");
        div.classList.add("image");

        const img = document.createElement("img");
        img.src = image.webformatURL;
        img.alt = image.tags;

        // Add double-click event to show modal
        img.addEventListener("dblclick", () => {
            openModal(image.largeImageURL, image.tags);
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.value = image.largeImageURL;

        div.appendChild(img);
        div.appendChild(checkbox);
        imageResults.appendChild(div);
    });

    const selectAllCheckbox = document.getElementById("select-all");
    selectAllCheckbox.addEventListener("change", (event) => {
        const checkboxes = document.querySelectorAll(".checkbox");
        checkboxes.forEach(checkbox => {
            checkbox.checked = event.target.checked;
        });
    });
}

// Open modal for larger image view
function openModal(imageUrl, captionText) {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const caption = document.getElementById("caption");

    modal.style.display = "block";
    modalImage.src = imageUrl;
    caption.innerHTML = captionText;

    const closeModal = document.getElementById("close-modal");
    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

// Pagination and navigation
function updatePagination(totalHits) {
    const pageInfo = document.getElementById("page-info");
    const totalPages = Math.ceil(totalHits / imagesPerPage);

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prev-button").disabled = currentPage === 1;
    document.getElementById("next-button").disabled = currentPage === totalPages;
}

document.getElementById("prev-button").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchImages();
    }
});

document.getElementById("next-button").addEventListener("click", () => {
    currentPage++;
    fetchImages();
});

// Download button functionality
document.getElementById("download-button").addEventListener("click", () => {
    const selectedImages = Array.from(document.querySelectorAll(".checkbox:checked"));
    selectedImages.forEach(checkbox => {
        const link = document.createElement('a');
        link.href = checkbox.value;
        link.download = ''; // The image will be downloaded with its original name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

// Clear input functionality
document.getElementById("clear-icon").addEventListener("click", () => {
    document.getElementById("search-input").value = '';
});
