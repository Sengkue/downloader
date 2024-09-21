document.getElementById('download-button').addEventListener('click', () => {
    const url = document.getElementById('media-url').value;
    const mediaPreview = document.getElementById('media-preview');

    // Clear previous previews
    mediaPreview.innerHTML = '';

    // Create a link element for downloading
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = url.split('/').pop(); // Set the filename from the URL

    // Determine the media type
    const extension = url.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        // It's an image
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Image Preview';
        img.style.maxWidth = '300px'; // Limit image size
        mediaPreview.appendChild(img);
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
    } else {
        mediaPreview.innerHTML = 'Unsupported media type.';
        return;
    }

    // Add the download link
    mediaPreview.appendChild(downloadLink);
    downloadLink.innerText = 'Download Media';
});
