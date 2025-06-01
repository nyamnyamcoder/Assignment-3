// The code in this file has been generated using Claude.ai (https://claude.ai)

// redirect to checkout.html if clicked on check-out btn
document.addEventListener('DOMContentLoaded', function() {
    const checkOutBtn = document.querySelectorAll('.check-out-btn');
    const checkOutToPaymentBtn = document.getElementById('check-out-to-payment');
    
    // handle regular checkout buttons (redirect to checkout.html)
    checkOutBtn.forEach(btn => {
        // skip the payment buttons since we handle them separately
        if (btn.id !== 'check-out-to-payment' && btn.id !== 'pay-now') {
            btn.addEventListener('click', function() {
                window.location.href = 'checkout.html';
            });
        }
    });

    // handle the specific checkout to payment button
    if (checkOutToPaymentBtn) {
        checkOutToPaymentBtn.addEventListener('click', function() {
            window.location.href = 'paymentpage.html';
        });
    }
});

// store the information user puts in payment page
document.addEventListener('DOMContentLoaded', function() {
    const billingCheckbox = document.getElementById('billing-address-checkbox');
    const billingAddressDiv = document.querySelector('.billing-address');
    
    if (billingCheckbox && billingAddressDiv) {
        billingCheckbox.addEventListener('change', function() {
            if (this.checked) {
                billingAddressDiv.style.display = 'none';
            } else {
                billingAddressDiv.style.display = 'block';
            }
        });
    }
});

// Store information put in checkout page
document.addEventListener('DOMContentLoaded', function() {
    const payNowBtn = document.getElementById('pay-now');
    
    if (payNowBtn) {
        payNowBtn.addEventListener('click', function() {
            // Get name and email from form
            const firstName = document.querySelector('.contact input[placeholder="First name"]').value;
            const email = document.querySelector('.contact input[type="email"]').value;
            
            // Validate required fields
            if (!firstName) {
                alert('Please enter your first name');
                return;
            }
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Save to localStorage
            const orderData = {
                name: firstName,
                email: email,
            };
            
            localStorage.setItem('orderConfirmation', JSON.stringify(orderData));
            
            // Redirect to order confirmation page
            window.location.href = 'orderconfirmation.html';
        });
    }
});