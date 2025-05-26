// Get DOM elements
const searchIcon = document.getElementById('search-icon');
const searchPopup = document.getElementById('search-popup');
const closePopup = document.querySelector('.close-popup');
const searchInputWrapper = document.querySelector('.search-input-wrapper');
const searchInput = document.querySelector('.search-input');
const popularSearches = document.querySelector('.popular-searches');
const searchResults = document.querySelector('.search-results-suggesion');

// Function to blur/darken background content
function blurBackground() {
    document.body.style.filter = 'blur(3px) brightness(0.7)';
    document.body.style.transition = 'filter 0.3s ease';
    // Prevent body scrolling when popup is open
    document.body.style.overflow = 'hidden';
}

// show search popup when search icon is clicked
searchIcon.addEventListener('click', () => {
    searchPopup.classList.remove('hidden');
    popularSearches.classList.remove('hidden');
    searchResults.classList.add('hidden');
    searchInput.value = '';
});

// close popup with x 
closePopup.addEventListener('click', () => {
    searchPopup.classList.add('hidden');
});

// show search results when clicking on input wrapper
searchInputWrapper.addEventListener('click', () => {
    popularSearches.classList.add('hidden');
    searchResults.classList.remove('hidden');
});

// show search results when user starts typing
searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
        popularSearches.classList.add('hidden');
        searchResults.classList.remove('hidden');
    } else {
        // show popular searches suggestion again if input is cleared
        popularSearches.classList.remove('hidden');
        searchResults.classList.add('hidden');
    }
});

// close popup when clicking outside
searchPopup.addEventListener('click', (e) => {
    if (e.target === searchPopup) {
        searchPopup.classList.add('hidden');
    }
});