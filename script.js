document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('image');
    const video = document.getElementById('video');

    // Set download link for the image
    const downloadImageLink = document.getElementById('download-image');
    downloadImageLink.href = image.src;

    // Set download link for the video
    const downloadVideoLink = document.getElementById('download-video');
    downloadVideoLink.href = video.querySelector('source').src;
});
