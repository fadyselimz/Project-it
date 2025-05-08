
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

    // Attach event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(function(button) {
        button.addEventListener('click', function() {
            // Find product info (customize selectors as needed)
            const productCard = button.closest('.product, .product-card, .acc, .eng, .horror, .fantasy, .romantic');
            if (!productCard) return;
            let name = productCard.querySelector('h3, .book-name')?.textContent?.trim() || '';
            let price = productCard.querySelector('.price, p')?.textContent?.trim() || '';
            let img = productCard.querySelector('img')?.getAttribute('src') || '';
            addToCart({ name, price, img });
            alert('Added to cart!');
        });
    });

    // Update badge on page load
    updateCartBadge();

    // Cart page logic
    if (document.getElementById('cart-table')) {
        renderCart();
        document.getElementById('clear-cart').addEventListener('click', function() {
            localStorage.removeItem('cart');
            renderCart();
        });
        document.getElementById('checkout-btn').addEventListener('click', function() {
            // Show a simple prompt for payment method (only cash allowed)
            if (confirm('Pay cash only. Proceed to checkout?')) {
                // Clear the cart
                localStorage.removeItem('cart');
                renderCart();
                updateCartBadge();
                alert('Thank you for your purchase! Please pay cash.');
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