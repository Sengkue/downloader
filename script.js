let currentPage = 1;
let imagesPerPage = 10;

document.getElementById("images-per-page").addEventListener("change", (event) => {
    imagesPerPage = parseInt(event.target.value, 10);
    currentPage = 1;
    fetchImages();

    const selectedValue = parseInt(event.target.value, 10);
    const options = document.getElementById("images-per-page").options;

    // Hide all options first
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = "none";
    }

    // Show only relevant options based on selection
    if (selectedValue === 10) {
        options[0].style.display = "block"; // Show 10
        options[1].style.display = "block"; // Show 20
        options[2].style.display = "block"; // Show 30
        options[3].style.display = "block"; // Show 40
        options[4].style.display = "block"; // Show 50
        options[5].style.display = "block"; // Show 100
        options[6].style.display = "block"; // Show 200
    } else if (selectedValue === 100) {
        options[5].style.display = "block"; // Show 100
        options[6].style.display = "block"; // Show 200
    } else {
        // Show only selected option if other than 10 or 100
        options[selectedValue - 10].style.display = "block";
    }
});

// Initial call to set the dropdown visibility correctly
document.getElementById("images-per-page").dispatchEvent(new Event('change'));

// Other existing JavaScript code...
