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

document.getElementById("select-all").addEventListener("change", (event) => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach(checkbox => {
        checkbox.checked = event.target.checked;
    });
});

document.getElementById("download-button").addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkbox:checked");
    checkboxes.forEach(checkbox => {
        const url = checkbox.value;
        const dateTime = new Date().toISOString().replace(/T/, '_').replace(/\..+/, '');
        const filename = `bysengkuevang_${dateTime}.jpg`;

        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;
                link.click();
                window.URL.revokeObjectURL(link.href);
            })
            .catch(err => console.error("Download error:", err));
    });
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

        img.addEventListener("dblclick", () => {
            openImagePreview(image.largeImageURL);
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.value = image.largeImageURL;

        div.appendChild(img);
        div.appendChild(checkbox);
        imageResults.appendChild(div);
    });
}

function openImagePreview(imageUrl) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("modal-content");

    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.classList.add("close");

    closeButton.onclick = () => {
        document.body.removeChild(modal);
    };

    modal.appendChild(closeButton);
    modal.appendChild(img);
    document.body.appendChild(modal);
}

function updatePagination(totalHits) {
    const pageInfo = document.getElementById("page-info");
    const totalPages = Math.ceil(totalHits / imagesPerPage);

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prev-button").disabled = currentPage === 1;
    document.getElementById("next-button").disabled = currentPage === totalPages;
}
