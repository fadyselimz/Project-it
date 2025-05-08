document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    
    function removeHighlights() {
        document.querySelectorAll('.product').forEach(product => {
            product.classList.remove('highlight');
        });
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const products = document.querySelectorAll('.product');
        
        removeHighlights();

        if (!searchTerm) {
            products.forEach(product => {
                product.style.display = '';
            });
            return;
        }

        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productPrice = product.querySelector('.price').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productPrice.includes(searchTerm)) {
                product.style.display = '';
                product.classList.add('highlight');
            } else {
                product.style.display = 'none';
            }
        });
    });

    searchInput.addEventListener('blur', function() {
        if (!this.value) {
            removeHighlights();
        }
    });
});