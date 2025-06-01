// manage the cart content across pages
class CartManager {
    constructor() {
        this.storageKey = 'marlowAndMaeCart';
        this.isInitialized = false;
        this.init();
    }

    init() {
        // sync existing items if we haven't loaded from storage yet
        if (!this.hasStoredCart()) {
            this.syncExistingCartToStorage();
        }
        
        this.renderCart();
        this.updateCartSubtotal();
        this.isInitialized = true;
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
        const cartItemsWrapper = document.querySelector('.cart-items-wrapper');
        if (!cartItemsWrapper) return;

        const existingItems = cartItemsWrapper.querySelectorAll('.cart-item');
        // don't sync if no items exist
        if (existingItems.length === 0) return; 

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
                console.log('Error syncing cart item:', error);
            }
        });

        if (cart.length > 0) {
            this.saveCart(cart);
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
        this.renderCart();
        this.updateCartSubtotal();
    }

    removeItem(index) {
        const cart = this.getCart();
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            this.saveCart(cart);
            this.renderCart();
            this.updateCartSubtotal();
        }
    }

    // placeholder texts is user haven't put any items
    showPlaceholder() {
        const cartItemsWrapper = document.querySelector('.cart-items-wrapper');
        const cartSubtotalWrapper = document.querySelector('.cart-subtotal-wrapper');
        
        if (!cartItemsWrapper || !cartSubtotalWrapper) return;

        // check if placeholder already exists
        let placeholder = cartItemsWrapper.querySelector('.cart-place-holder-text');
        
        if (!placeholder) {
            // create and add placeholder text
            placeholder = document.createElement('p');
            placeholder.className = 'cart-place-holder-text';
            placeholder.textContent = 'Your cart is empty.';
            cartSubtotalWrapper.insertAdjacentElement('beforebegin', placeholder);
        }
        
        // set subtotal to 0
        const subtotalAmount = document.querySelector('.subtotal-amount');
        if (subtotalAmount) {
            subtotalAmount.textContent = 'AUD$0.00';
        }
    }

    hidePlaceholder() {
        const placeholder = document.querySelector('.cart-place-holder-text');
        if (placeholder) {
            placeholder.remove();
        }
    }

    renderCart() {
        const cartItemsWrapper = document.querySelector('.cart-items-wrapper');
        const cartSubtotalWrapper = document.querySelector('.cart-subtotal-wrapper');
        
        if (!cartItemsWrapper || !cartSubtotalWrapper) return;

        // clear existing items (but keep subtotal wrapper and placeholder)
        const existingItems = cartItemsWrapper.querySelectorAll('.cart-item');
        existingItems.forEach(item => item.remove());

        const cart = this.getCart();
        
        if (cart.length === 0) {
            // show placeholder when cart is empty
            this.showPlaceholder();
        } else {
            // hide placeholder when cart has items
            this.hidePlaceholder();
            
            // add all cart items
            cart.forEach((item, index) => {
                const cartItemHTML = this.createCartItemHTML(item, index);
                cartSubtotalWrapper.insertAdjacentHTML('beforebegin', cartItemHTML);
            });
            
            // bind delete events after all items are added
            this.bindDeleteEvents();
        }
    }

    // html to add if user clicked on "Add to cart" button
    createCartItemHTML(productInfo, index) {
        return `
            <div class="cart-item" data-cart-index="${index}">
                <div class="cart-item-image-wrapper">
                    <img class="cart-item-image" src="${productInfo.imageSrc}" alt="${productInfo.name} in ${productInfo.color}">
                </div>
                <div class="cart-item-info-wrapper">
                    <h3 class="heading">${productInfo.name} - ${productInfo.color}</h3>
                    <p>Size: ${productInfo.size}</p>
                    <p>Price: ${productInfo.price}</p>
                    <p>Quantity: ${productInfo.quantity}</p>
                </div>
                <span class="material-symbols-outlined delete-cart-item" data-index="${index}">delete</span>
            </div>
        `;
    }

    updateCartSubtotal() {
        const cart = this.getCart();
        
        if (cart.length === 0) {
            this.showPlaceholder();
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
        
        const subtotalAmount = document.querySelector('.subtotal-amount');
        if (subtotalAmount) {
            subtotalAmount.textContent = `AUD$${total.toFixed(2)}`;
        }
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
        this.renderCart();
        this.updateCartSubtotal();
    }
}

// initialize cart manager globally
window.cartManager = new CartManager();