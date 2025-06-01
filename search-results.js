// The code in this file has been generated using Claude.ai (https://claude.ai)

// Dynamically set the search results heading
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    const searchTermElement = document.querySelector('.search-term');
    
    if (searchTerm && searchTermElement) {
        searchTermElement.textContent = `"${searchTerm}"`;
    } else {
        searchTermElement.textContent = "Shop All";
    }
});