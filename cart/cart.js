document.addEventListener('DOMContentLoaded', function() {
    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    function addToCart(product) {
        const cart = getCart();
        cart.push(product);
        saveCart(cart);
        updateCartBadge();
    }
    function updateCartBadge() {
        const cart = getCart();
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.textContent = cart.length;
        }
    }
    document.querySelectorAll('.add-to-cart').forEach(function(button) {
        button.addEventListener('click', function() {
            const productCard = button.closest('.product, .product-card, .acc, .eng, .horror, .fantasy, .romantic');
            if (!productCard) return;
            let name = productCard.querySelector('h3, .book-name')?.textContent?.trim() || '';
            let price = productCard.querySelector('.price, p')?.textContent?.trim() || '';
            let img = productCard.querySelector('img')?.getAttribute('src') || '';
            addToCart({ name, price, img });
        });
    });
    updateCartBadge();
    if (document.getElementById('cart-table')) {
        renderCart();
        document.getElementById('clear-cart').addEventListener('click', function() {
            localStorage.removeItem('cart');
            renderCart();
        });
        const checkoutButton = document.getElementById('checkout-button');
        const paymentOptions = document.getElementById('payment-options');
        const confirmPaymentButton = document.getElementById('confirm-payment');
        const cartTableBody = document.querySelector('#cart-table tbody');
        const visaDetails = document.getElementById('visa-details');
        checkoutButton.addEventListener('click', function() {
            paymentOptions.style.display = 'block';
        });
        document.querySelectorAll('input[name="payment-method"]').forEach(function(elem) {
            elem.addEventListener('change', function() {
                if (this.value === 'visa') {
                    visaDetails.style.display = 'block';
                } else {
                    visaDetails.style.display = 'none';
                }
            });
        });
        confirmPaymentButton.addEventListener('click', function() {
            const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
            if (selectedPaymentMethod) {
                if (selectedPaymentMethod.value === 'visa') {
                    const cardholderName = document.querySelector('input[name="cardholder-name"]').value;
                    const cardNumber = document.querySelector('input[name="card-number"]').value;
                    const expiryDate = document.querySelector('input[name="expiry-date"]').value;
                    const cvv = document.querySelector('input[name="cvv"]').value;
                    if (!cardholderName.match(/^[A-Za-z\s]+$/)) {
                        alert('Please enter a valid cardholder name.');
                        return;
                    }
                    if (!cardNumber.match(/^\d{16}$/)) {
                        alert('Please enter a valid 16-digit card number.');
                        return;
                    }
                    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
                        alert('Please enter a valid expiry date in MM/YY format.');
                        return;
                    }
                    if (!cvv.match(/^\d{3}$/)) {
                        alert('Please enter a valid 3-digit CVV.');
                        return;
                    }
                    alert('Visa payment selected. Details are correct.');
                } else {
                    alert(`You have selected ${selectedPaymentMethod.value} as your payment method.`);
                }
                localStorage.removeItem('cart');
                while (cartTableBody.firstChild) {
                    cartTableBody.removeChild(cartTableBody.firstChild);
                }
                updateCartBadge();
                document.getElementById('cart-total').innerHTML = '<strong>Total: 0.00 EGP</strong>';
            } else {
                alert('Please select a payment method.');
            }
        });
    }
    function renderCart() {
        const cart = getCart();
        const tbody = document.querySelector('#cart-table tbody');
        tbody.innerHTML = '';
        let total = 0;
        cart.forEach((item, idx) => {
            let priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            total += priceNum;
            tbody.innerHTML += `
                <tr>
                    <td><img src="${item.img}" style="width:50px;height:auto;"></td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td><button onclick="removeFromCart(${idx})">Remove</button></td>
                </tr>
            `;
        });
        document.getElementById('cart-total').innerHTML = `<strong>Total: ${total.toFixed(2)} EGP</strong>`;
    }
    window.removeFromCart = function(idx) {
        const cart = getCart();
        cart.splice(idx, 1);
        saveCart(cart);
        renderCart();
        updateCartBadge();
    };
});