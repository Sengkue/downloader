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

// Enter key functionality
document.getElementById("search-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchImages();
    }
});

document.getElementById("clear-icon").addEventListener("click", () => {
    document.getElementById("search-input").value = '';
});

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

        // Add double-click event for image preview
        img.addEventListener("dblclick", () => {
            const modal = document.getElementById("image-modal");
            const modalImg = document.getElementById("modal-image");
            const caption = document.getElementById("caption");
            modal.style.display = "block";
            modalImg.src = image.largeImageURL;
            caption.textContent = image.tags;
        });

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

// Modal close functionality
document.getElementById("modal-close").addEventListener("click", () => {
    document.getElementById("image-modal").style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
    const modal = document.getElementById("image-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

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
    const checkboxes = document.querySelectorAll(".checkbox:checked");
    checkboxes.forEach(checkbox => {
        const url = checkbox.value;
        const dateTime = new Date().toISOString().replace(/T/, '_').replace(/\..+/, ''); // Format: YYYY-MM-DD_HH:mm:ss
        const filename = `bysengkuevang_${dateTime}.jpg`;

        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;
                link.click();
                window.URL.revokeObjectURL(link.href); // Clean up
            })
            .catch(err => console.error("Download error:", err));
    });
});
