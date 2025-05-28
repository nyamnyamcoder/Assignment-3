// get DOM elements for search icon
const searchIcon = document.getElementById('search-icon');
const searchPopup = document.getElementById('search-popup');
const searchClosePopup = searchPopup.querySelector('.close-popup');
const searchInputWrapper = document.querySelector('.search-input-wrapper');
const searchInput = document.querySelector('.search-input');
const popularSearches = document.querySelector('.popular-searches');
const searchResults = document.querySelector('.search-results-suggesion');

// get DOM elements for cart icon
const cartIcon = document.getElementById('cart-icon');
const cartPopup = document.getElementById('cart-popup');
const cartClosePopup = cartPopup.querySelector('.close-popup');
const deleteCartItems = document.querySelectorAll('.delete-cart-item');

// get DOM elements for hamburger menu icon
const hamburgerMenuIcon = document.getElementById('menu-icon');
const hamburgerMenuPopup = document.getElementById('hamburger-menu-popup');
const hamburgerMenuClosePopup = hamburgerMenuPopup.querySelector('.close-popup');

// Search popup
// show search popup when search icon is clicked
searchIcon.addEventListener('click', () => {
    searchPopup.classList.remove('hidden');
    popularSearches.classList.remove('hidden');
    searchResults.classList.add('hidden');
    searchInput.value = '';
});

// close popup with x 
searchClosePopup.addEventListener('click', () => {
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

// Dynamically takes in the search terms
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            window.location.href = `searchresults.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
});

// close popup when clicking outside
searchPopup.addEventListener('click', (e) => {
    if (e.target === searchPopup) {
        searchPopup.classList.add('hidden');
    }
});

// Cart popup
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

// Hamburger menu popup (on mobile version only)
// show popup when clicked on hamburger menu icon
hamburgerMenuIcon.addEventListener('click', () => {
    hamburgerMenuPopup.classList.remove('hidden');
});

// close popup with x
hamburgerMenuClosePopup.addEventListener('click', () => {
    hamburgerMenuPopup.classList.add('hidden');
});

// close popup when clicking outside
hamburgerMenuPopup.addEventListener('click', (e) => {
    if (e.target === hamburgerMenuPopup) {
        hamburgerMenuPopup.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const shopNowButtons = document.querySelectorAll('.shop-now-cta');
    
    shopNowButtons.forEach(button => {
      button.addEventListener('click', function () {
        window.location.href = 'productlistings.html';
      });
    });
});

// Dynamically update the heading of product listings page
document.addEventListener('DOMContentLoaded', function() {
    // If redirected from shop now cta buttons
    const shopNowButtons = document.querySelectorAll('.shop-now-cta');
    shopNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'productlistings.html?title=Shop All';
        });
    });

    // If redirected from category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = card.querySelector('.category-name').textContent.trim();
            window.location.href = `productlistings.html?title=Shop ${categoryName}`;
        });
    });
});