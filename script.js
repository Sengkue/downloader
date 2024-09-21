document.getElementById("get-thumbnail").addEventListener("click", function () {
    const youtubeUrl = document.getElementById("youtube-url").value;
    const videoId = extractVideoId(youtubeUrl);

    if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        document.getElementById("thumbnail-img").src = thumbnailUrl;
        document.getElementById("download-link").href = thumbnailUrl;
        document.getElementById("thumbnail-section").style.display = 'block';
    } else {
        alert("Invalid YouTube URL. Please enter a valid one.");
    }
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}
