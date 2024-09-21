document.getElementById("download-btn").addEventListener("click", function () {
    const videoUrl = document.getElementById("video-url").value;

    // Reset display styles
    document.getElementById("video-preview").style.display = 'none';
    document.getElementById("video-preview-section").style.display = 'none';

    // Check if the URL is a valid video URL based on file extension
    const isVideo = /\.(mp4|webm|ogg|mov)$/.test(videoUrl);

    if (isVideo) {
        // Display video
        document.getElementById("video-preview").src = videoUrl;
        document.getElementById("video-preview").style.display = 'block';
        document.getElementById("download-link").href = videoUrl;
        document.getElementById("download-link").setAttribute('download', 'video-file.mp4');  // Change filename as needed
        document.getElementById("video-preview-section").style.display = 'block';

    } else {
        alert("Please enter a valid video URL (e.g., .mp4, .webm, .ogg, .mov)");
    }
});
