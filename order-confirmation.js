// The code in this file has been generated using Claude.ai (https://claude.ai)

// Dynamically display the information inputted by user in the payment page
document.addEventListener('DOMContentLoaded', function() {
    const orderData = JSON.parse(localStorage.getItem('orderConfirmation'));
    
    if (orderData) {
        // update the thank you message with the name
        document.querySelector('.thankyou-message').textContent = `Thank you ${orderData.name}!`;
        
        // update the email confirmation message
        document.querySelector('.confirmation-email-message').textContent = `We have sent an order confirmation email to: ${orderData.email}`;
        
        // clear the data after use
        localStorage.removeItem('orderConfirmation');
    }
});

// redirect back to home page
document.addEventListener('DOMContentLoaded', function() {
    const backToHomeBtn = document.querySelector('.back-to-home-btn');
    
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
