document.getElementById('download-button').addEventListener('click', () => {
    const url = document.getElementById('media-url').value;
    const mediaPreview = document.getElementById('media-preview');

    // Clear previous previews
    mediaPreview.innerHTML = '';

    // Create a link element for downloading
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = url.split('/').pop(); // Set the filename from the URL

    // Check if the URL is an image or video
    const extension = url.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        // It's an image
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Image Preview';
        img.style.maxWidth = '300px'; // Limit image size
        mediaPreview.appendChild(img);
        mediaPreview.appendChild(downloadLink);
        downloadLink.innerText = 'Download Image';
    } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
        // It's a video
        const video = document.createElement('video');
        video.controls = true;
        video.width = 300;

        const source = document.createElement('source');
        source.src = url;
        source.type = `video/${extension}`;
        video.appendChild(source);
        
        mediaPreview.appendChild(video);
        mediaPreview.appendChild(downloadLink);
        downloadLink.innerText = 'Download Video';
    } else {
        mediaPreview.innerHTML = 'Unsupported media type. Please provide a direct image or video URL.';
        return;
    }
});
