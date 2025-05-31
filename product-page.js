// for the quantity selector
document.addEventListener('DOMContentLoaded', function() {
    // Quantity selector functionality
    const decreaseBtn = document.getElementById('decrease-btn');
    const increaseBtn = document.getElementById('increase-btn');
    const quantityDisplay = document.getElementById('quantity-display');

    if (decreaseBtn && increaseBtn && quantityDisplay) {
        let currentQuantity = 1;
        const minQuantity = 1;
        const maxQuantity = 100;

        function updateQuantityDisplay() {
            quantityDisplay.textContent = currentQuantity;
        }

        function updateButtonStates() {
            decreaseBtn.disabled = currentQuantity <= minQuantity;
            increaseBtn.disabled = currentQuantity >= maxQuantity;
        }

        function decreaseQuantity() {
            if (currentQuantity > minQuantity) {
                currentQuantity--;
                updateQuantityDisplay();
                updateButtonStates();
            }
        }

        function increaseQuantity() {
            if (currentQuantity < maxQuantity) {
                currentQuantity++;
                updateQuantityDisplay();
                updateButtonStates();
            }
        }

        // set initial state
        updateQuantityDisplay();
        updateButtonStates();

        // add event listeners
        decreaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            decreaseQuantity();
        });

        increaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            increaseQuantity();
        });
    }
});

// for the size option selector
// Add this to your existing product-page.js file or create size-selector.js

document.addEventListener('DOMContentLoaded', function() {
    // Size selector functionality
    const sizeOptions = document.querySelectorAll('.size-option');
    const sizeDisplay = document.querySelector('.size-display');

    if (sizeOptions.length > 0 && sizeDisplay) {
        let selectedSize = null;

        function updateSizeDisplay(size) {
            sizeDisplay.textContent = `Size: ${size}`;
        }

        function clearSelectedStates() {
            sizeOptions.forEach(option => {
                option.classList.remove('size-option--clicked');
            });
        }

        function selectSize(sizeElement) {
            const size = sizeElement.textContent.trim();
            
            // clear the previous selection
            clearSelectedStates();
            
            // bold the class
            sizeElement.classList.add('size-option--clicked');
            
            // Update selected size and display
            selectedSize = size;
            updateSizeDisplay(size);
        }

        // Set initial state
        updateSizeDisplay('Select a size');

        // Add event listeners to all size options
        sizeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectSize(option);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Image gallery functionality
    const mainImage = document.querySelector('.main-image');
    const sideImages = document.querySelectorAll('.side-image');

    if (mainImage && sideImages.length > 0) {
        function clearSelectedImageStates() {
            sideImages.forEach(image => {
                image.classList.remove('side-image--clicked');
                image.classList.add('side-image--unclicked');
            });
        }

        function updateMainImage(newImageSrc) {
            mainImage.src = newImageSrc;
        }

        function selectImage(sideImageElement) {
            const imageSrc = sideImageElement.src;
            
            // Clear previous selections
            clearSelectedImageStates();
            
            // Add selected state to clicked image
            sideImageElement.classList.add('side-image--clicked');
            sideImageElement.classList.remove('side-image--unclicked');
            
            // Update main image
            updateMainImage(imageSrc);
        }

        // Add event listeners to all side images
        sideImages.forEach(image => {
            image.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectImage(image);
            });
        });
    }
});

// for color selection
document.addEventListener('DOMContentLoaded', function() {    
    const colorOptions = document.querySelectorAll('.color-option');
    const colorDisplay = document.querySelector('.color-display');
    const mainImage = document.querySelector('.main-image');

    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            
            // clear all color selections
            colorOptions.forEach(opt => opt.classList.remove('color-option--clicked'));
            
            // Add clicked state
            option.classList.add('color-option--clicked');
            
            // Decide color
            let colorKey = '';
            let colorName = '';
            
            if (option.classList.contains('color-option--white')) {
                colorKey = 'white';
                colorName = 'White';
            } else if (option.classList.contains('color-option--pink')) {
                colorKey = 'pink';
                colorName = 'Pink';
            }
            
            // Update color display
            colorDisplay.textContent = `Color: ${colorName}`;
            
            // Hide all images
            const allImages = document.querySelectorAll('.side-image');
            allImages.forEach(img => {
                img.classList.add('color-hidden');
                img.classList.remove('side-image--clicked');
                img.classList.add('side-image--unclicked');
            });
            
            // Show images of the selected color
            const colorImages = document.querySelectorAll(`[data-color="${colorKey}"]`);
            
            colorImages.forEach(img => {
                img.classList.remove('color-hidden');
            });
            
            // Set first image as active
            if (colorImages.length > 0) {
                const firstImage = colorImages[0];
                firstImage.classList.add('side-image--clicked');
                firstImage.classList.remove('side-image--unclicked');
                mainImage.src = firstImage.src;
            }
        });
    });
});