// get DOM elements for search
const searchIcon = document.getElementById('search-icon');
const searchPopup = document.getElementById('search-popup');
const closePopup = document.querySelector('.close-popup');
const searchInputWrapper = document.querySelector('.search-input-wrapper');
const searchInput = document.querySelector('.search-input');
const popularSearches = document.querySelector('.popular-searches');
const searchResults = document.querySelector('.search-results-suggesion');

// get DOM elements for cart
const cartIcon = document.getElementById('cart-icon');
const cartPopup = document.getElementById('cart-popup');
const cartClosePopup = cartPopup.querySelector('.close-popup');
const deleteCartItems = document.querySelectorAll('.delete-cart-item');


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

// show cart popup when cart icon is clicked
cartIcon.addEventListener('click', () => {
    cartPopup.classList.remove('hidden');
});

// close popup with x
cartClosePopup.addEventListener('click', () => {
    cartPopup.classList.add('hidden');
});

// delete cart items
deleteCartItems.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', () => {
        deleteBtn.closest('.cart-item').remove();
    });
});

// close popup when clicking outside
cartPopup.addEventListener('click', (e) => {
    if (e.target === cartPopup) {
        cartPopup.classList.add('hidden');
    }
});