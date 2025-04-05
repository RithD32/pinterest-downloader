document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('pinterest-url');
    const downloadBtn = document.getElementById('download-btn');
    const resultContainer = document.getElementById('result');

    downloadBtn.addEventListener('click', function() {
        const pinterestUrl = urlInput.value.trim();
        
        if (!pinterestUrl) {
            showError('Please enter a Pinterest URL');
            return;
        }
        
        if (!isValidPinterestUrl(pinterestUrl)) {
            showError('Please enter a valid Pinterest URL');
            return;
        }
        
        // Show loading state
        resultContainer.innerHTML = '<div class="loading">Processing your request...</div>';
        resultContainer.classList.add('active');
        
        // Call the RapidAPI endpoint
        // Note: In a real implementation, you would handle the API key securely
        // This is for demonstration purposes only
        fetchVideoUrl(pinterestUrl);
    });

    function isValidPinterestUrl(url) {
        // Simple validation to check if URL contains pinterest domain
        return url.includes('pinterest.com') || url.includes('pin.it');
    }

    function showError(message) {
        resultContainer.innerHTML = `<div class="error-message">${message}</div>`;
        resultContainer.classList.add('active');
    }

    function fetchVideoUrl(url) {
        // Note: In a production environment, you should not expose your API key in client-side code
        // This would normally be handled by a backend service
        
        // For demonstration, we'll show a placeholder result
        setTimeout(() => {
            // Simulate successful response
            const mockResult = {
                success: true,
                title: "Pinterest Video",
                videoUrl: "#" // In a real implementation, this would be the actual video URL
            };
            
            displayResult(mockResult);
        }, 2000);
        
        /* Uncomment and modify this for actual API integration
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
                'X-RapidAPI-Host': 'pinterest-video-downloader1.p.rapidapi.com'
            }
        };

        fetch(`https://pinterest-video-downloader1.p.rapidapi.com/?url=${encodeURIComponent(url)}`, options)
            .then(response => response.json())
            .then(response => {
                if (response.status === 'success' && response.data && response.data.videos) {
                    displayResult({
                        success: true,
                        title: response.data.title || "Pinterest Video",
                        videoUrl: response.data.videos
                    });
                } else {
                    showError('Could not extract video. Please check the URL and try again.');
                }
            })
            .catch(err => {
                console.error(err);
                showError('An error occurred while processing your request. Please try again later.');
            });
        */
    }

    function displayResult(result) {
        if (result.success) {
            resultContainer.innerHTML = `
                <div class="video-result">
                    <div class="video-info">
                        <h3>${result.title}</h3>
                        <p>Your video is ready to download!</p>
                    </div>
                    <a href="${result.videoUrl}" class="download-btn" target="_blank" download>Download Video</a>
                    <p class="note">Note: For demonstration only. In the real implementation, this would download the actual video.</p>
                </div>
            `;
        } else {
            showError(result.message || 'An error occurred while processing your request.');
        }
    }
});
