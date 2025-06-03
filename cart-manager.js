// The code in this file has been generated using Claude.ai (https://claude.ai)

// manage the cart content across pages
class CartManager {
    constructor() {
        this.storageKey = 'marlowAndMaeCart';
        this.isInitialized = false;
        
        // wait for DOM to be ready before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // check if any cart elements exist (popup or main page)
        const hasCartElements = this.getCartContainers().length > 0;
        
        if (!hasCartElements) {
            return;
        }

        // sync existing items if we haven't loaded from storage yet
        if (!this.hasStoredCart()) {
            this.syncExistingCartToStorage();
        }
        
        this.renderAllCarts();
        this.updateAllCartSubtotals();
        this.isInitialized = true;
    }

    // get all cart containers (popup and main page)
    getCartContainers() {
        return document.querySelectorAll('.cart-items-wrapper');
    }

    // get all subtotal containers
    getSubtotalContainers() {
        return document.querySelectorAll('.cart-subtotal-wrapper');
    }

    // get all subtotal amount elements
    getSubtotalAmounts() {
        return document.querySelectorAll('.subtotal-amount');
    }

    hasStoredCart() {
        const cart = localStorage.getItem(this.storageKey);
        return cart && JSON.parse(cart).length > 0;
    }

    getCart() {
        const cart = localStorage.getItem(this.storageKey);
        return cart ? JSON.parse(cart) : [];
    }

    saveCart(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }

    syncExistingCartToStorage() {
        // sync from any existing cart container
        const cartContainers = this.getCartContainers();
        
        for (let cartItemsWrapper of cartContainers) {
            const existingItems = cartItemsWrapper.querySelectorAll('.cart-item');
            if (existingItems.length === 0) continue;

            const cart = [];

            existingItems.forEach(item => {
                try {
                    const nameText = item.querySelector('h3').textContent;
                    const sizeText = item.querySelector('p:nth-child(2)').textContent;
                    const priceText = item.querySelector('p:nth-child(3)').textContent;
                    const quantityText = item.querySelector('p:nth-child(4)').textContent;
                    const imageSrc = item.querySelector('.cart-item-image').src;

                    // get the values
                    const nameParts = nameText.split(' - ');
                    const name = nameParts[0];
                    const color = nameParts[1] || 'White';
                    const size = sizeText.replace('Size: ', '');
                    const price = priceText.replace('Price: ', '');
                    const quantity = parseInt(quantityText.replace('Quantity: ', ''));

                    cart.push({
                        name,
                        color,
                        size,
                        quantity,
                        price,
                        imageSrc
                    });
                } catch (error) {

                }
            });

            if (cart.length > 0) {
                this.saveCart(cart);
                break; // stop after finding the first cart with items
            }
        }
    }

    addItem(productInfo) {
        const cart = this.getCart();
        
        // check if item already exists
        const existingItemIndex = cart.findIndex(item => 
            item.name === productInfo.name && 
            item.color === productInfo.color && 
            item.size === productInfo.size
        );
        
        if (existingItemIndex !== -1) {
            // update quantity if item exists
            cart[existingItemIndex].quantity += productInfo.quantity;
        } else {
            // add the new item
            cart.push(productInfo);
        }
        
        this.saveCart(cart);
        this.renderAllCarts();
        this.updateAllCartSubtotals();
    }

    removeItem(index) {
        const cart = this.getCart();
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            this.saveCart(cart);
            this.renderAllCarts();
            this.updateAllCartSubtotals();
        }
    }

    // show placeholder in all cart containers
    showPlaceholderInContainer(cartItemsWrapper, cartSubtotalWrapper) {
        if (!cartItemsWrapper || !cartSubtotalWrapper) return;

        // check if placeholder already exists in this container
        let placeholder = cartItemsWrapper.querySelector('.cart-place-holder-text');
        
        if (!placeholder) {
            // create and add placeholder text
            placeholder = document.createElement('p');
            placeholder.className = 'cart-place-holder-text';
            placeholder.textContent = 'Your cart is empty.';
            cartSubtotalWrapper.insertAdjacentElement('beforebegin', placeholder);
        }
    }

    // hide placeholder in specific container
    hidePlaceholderInContainer(cartItemsWrapper) {
        const placeholder = cartItemsWrapper.querySelector('.cart-place-holder-text');
        if (placeholder) {
            placeholder.remove();
        }
    }

    // render cart in all containers
    renderAllCarts() {
        const cartContainers = this.getCartContainers();
        const cart = this.getCart();

        cartContainers.forEach((cartItemsWrapper, containerIndex) => {
            // find the corresponding subtotal wrapper for this container
            const cartSubtotalWrapper = cartItemsWrapper.parentElement.querySelector('.cart-subtotal-wrapper');
            
            if (!cartSubtotalWrapper) {
                return;
            }

            // clear existing items in this container
            const existingItems = cartItemsWrapper.querySelectorAll('.cart-item');
            existingItems.forEach(item => item.remove());

            if (cart.length === 0) {
                // show placeholder when cart is empty
                this.showPlaceholderInContainer(cartItemsWrapper, cartSubtotalWrapper);
            } else {
                // hide placeholder when cart has items
                this.hidePlaceholderInContainer(cartItemsWrapper);
                
                // add all cart items to this container
                cart.forEach((item, index) => {
                    const cartItemHTML = this.createCartItemHTML(item, index);
                    cartSubtotalWrapper.insertAdjacentHTML('beforebegin', cartItemHTML);
                });
            }
        });
        
        // bind delete events after all items are added to all containers
        this.bindDeleteEvents();
    }

    // html to add if user clicked on "Add to cart" button
    createCartItemHTML(productInfo, index) {
        return `
            <div class="cart-item" data-cart-index="${index}">
                <div class="cart-item-content-wrapper">
                    <div class="cart-item-image-wrapper">
                        <img class="cart-item-image" src="${productInfo.imageSrc}" alt="${productInfo.name} in ${productInfo.color}">
                    </div>
                    <div class="cart-item-info-wrapper">
                        <h3 class="heading">${productInfo.name} - ${productInfo.color}</h3>
                        <p>Size: ${productInfo.size}</p>
                        <p>Price: ${productInfo.price}</p>
                        <p>Quantity: ${productInfo.quantity}</p>
                    </div>
                </div>

                <span class="material-symbols-outlined delete-cart-item" data-index="${index}">delete</span>
            </div>
        `;
    }

    // update subtotal in all containers
    updateAllCartSubtotals() {
        const cart = this.getCart();
        const subtotalAmounts = this.getSubtotalAmounts();
        
        if (cart.length === 0) {
            // set all subtotals to 0
            subtotalAmounts.forEach(element => {
                if (element) {
                    element.textContent = 'AUD$0.00';
                }
            });
            return;
        }
        
        // calculate total from stored cart data
        let total = 0; 
        cart.forEach(item => {
            const priceMatch = item.price.match(/[\d.]+/);
            if (priceMatch) {
                total += parseFloat(priceMatch[0]) * item.quantity;
            }
        });
        
        // update all subtotal amounts
        subtotalAmounts.forEach(element => {
            if (element) {
                element.textContent = `AUD$${total.toFixed(2)}`;
            }
        });
    }

    bindDeleteEvents() {
        // remove any existing event listeners first
        const deleteButtons = document.querySelectorAll('.delete-cart-item');
        deleteButtons.forEach(button => {
            // create a new event listener for each button
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // add the click event to the new button
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const index = parseInt(newButton.getAttribute('data-index'));
                this.removeItem(index);
            });
        });
    }

    clearCart() {
        localStorage.removeItem(this.storageKey);
        this.renderAllCarts();
        this.updateAllCartSubtotals();
    }
}

// initialize cart manager globally
if (!window.cartManager) {
    window.cartManager = new CartManager();
}