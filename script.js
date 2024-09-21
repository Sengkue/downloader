document.getElementById("download-btn").addEventListener("click", function () {
    const mediaUrl = document.getElementById("media-url").value;

    // Reset display styles
    document.getElementById("image-preview").style.display = 'none';
    document.getElementById("video-preview").style.display = 'none';
    document.getElementById("media-preview").style.display = 'none';

    // Check if it's an image or video based on file extension
    const isImage = /\.(jpeg|jpg|gif|png|webp)$/.test(mediaUrl);
    const isVideo = /\.(mp4|webm|ogg|mov)$/.test(mediaUrl);

    if (isImage) {
        // Display image
        document.getElementById("image-preview").src = mediaUrl;
        document.getElementById("image-preview").style.display = 'block';
        document.getElementById("download-link").href = mediaUrl;
        document.getElementById("download-link").setAttribute('download', 'image-file.jpg');  // Change filename as needed
        document.getElementById("media-preview").style.display = 'block';

    } else if (isVideo) {
        // Display video
        document.getElementById("video-preview").src = mediaUrl;
        document.getElementById("video-preview").style.display = 'block';
        document.getElementById("download-link").href = mediaUrl;
        document.getElementById("download-link").setAttribute('download', 'video-file.mp4');  // Change filename as needed
        document.getElementById("media-preview").style.display = 'block';

    } else {
        alert("The URL does not seem to be a valid image or video URL.");
    }
});
