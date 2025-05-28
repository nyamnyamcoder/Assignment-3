// Dynamically change the heading of the page
// based on where user redirected from
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    
    const productListingName = document.querySelector('.product-listing-name');
    
    if (title) {
        productListingName.textContent = title;
    } else {
        productListingName.textContent = "Shop All";
    }
});