// The code in this file has been generated using Claude.ai (https://claude.ai)

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

// for add to cart button
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    if (addToCartBtn) {
        function getCurrentProductInfo() {
            const productName = document.querySelector('.product-content-wrapper h1').textContent;
            const price = document.querySelector('.product-content-wrapper p').textContent;
            
            const selectedColorOption = document.querySelector('.color-option--clicked');
            let selectedColor = 'White';
            if (selectedColorOption) {
                if (selectedColorOption.classList.contains('color-option--white')) {
                    selectedColor = 'White';
                } else if (selectedColorOption.classList.contains('color-option--pink')) {
                    selectedColor = 'Pink';
                }
            }
            
            const selectedSizeOption = document.querySelector('.size-option--clicked');
            let selectedSize = null;
            if (selectedSizeOption) {
                selectedSize = selectedSizeOption.textContent.trim();
            }
            
            const quantityDisplay = document.getElementById('quantity-display');
            const quantity = quantityDisplay ? parseInt(quantityDisplay.textContent) || 1 : 1;
            
            const mainImage = document.querySelector('.main-image');
            const imageSrc = mainImage ? mainImage.src : '';
            
            return {
                name: productName,
                color: selectedColor,
                size: selectedSize,
                quantity: quantity,
                price: price,
                imageSrc: imageSrc
            };
        }

        function validateSelection(productInfo) {
            const errors = [];
            if (!productInfo.size) errors.push('Please select a size');
            if (productInfo.quantity < 1) errors.push('Please select a valid quantity');
            return errors;
        }

        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productInfo = getCurrentProductInfo();
            const errors = validateSelection(productInfo);
            
            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }
            
            // use the global cart manager
            window.cartManager.addItem(productInfo);
            
            // show the cart popup
            const cartPopup = document.getElementById('cart-popup');
            if (cartPopup) {
                cartPopup.classList.remove('hidden');
            }
        });
    }
});

// redirect to productpage.html if clicked on any product card
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            window.location.href = 'productpage.html';
        });
        
        card.style.cursor = 'pointer';
    });
});