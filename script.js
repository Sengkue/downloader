document.getElementById("search-button").addEventListener("click", async () => {
    const query = document.getElementById("search-input").value;
    const apiKey = '32033819-d1c055cd90058f2879aa55993';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.hits);
    } catch (error) {
        console.error("Error fetching images:", error);
    }
});

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
}

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
