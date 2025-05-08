document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    
    // Function to remove highlights from all products
    function removeHighlights() {
        document.querySelectorAll('.product').forEach(product => {
            product.classList.remove('highlight');
        });
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const products = document.querySelectorAll('.product');
        
        // Remove previous highlights
        removeHighlights();

        // If search is empty, show all products and maintain layout
        if (!searchTerm) {
            products.forEach(product => {
                product.style.display = '';
                product.style.visibility = 'visible';
            });
            return;
        }

        let firstMatch = null;
        
        products.forEach(product => {
            // Get product name from h3 and price from .price
            const productNameElem = product.querySelector('h3');
            const productPriceElem = product.querySelector('.price');
            const productName = productNameElem ? productNameElem.textContent.toLowerCase() : '';
            const productPrice = productPriceElem ? productPriceElem.textContent.toLowerCase() : '';
            
            if (productName.includes(searchTerm) || productPrice.includes(searchTerm)) {
                product.style.visibility = 'visible';
                product.style.display = '';
                product.classList.add('highlight');
                
                if (!firstMatch) {
                    firstMatch = product;
                }
            } else {
                product.style.visibility = 'hidden';
                product.style.display = '';
            }
        });

        // Scroll to first match if found, with improved positioning
        if (firstMatch) {
            const headerOffset = 150; // Adjust based on your header height
            const elementPosition = firstMatch.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });

    // Clear highlights when search is cleared
    searchInput.addEventListener('blur', function() {
        if (!this.value) {
            removeHighlights();
        }
    });
});