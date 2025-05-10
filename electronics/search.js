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
            });
            return;
        }

        let firstMatch = null;
        
        products.forEach(product => {
            const productName = product.querySelector('.name h3').textContent.toLowerCase();
            
            if (productName.includes(searchTerm)) {
                product.style.display = '';
                product.classList.add('highlight');
                if (!firstMatch) {
                    firstMatch = product;
                }
            } else {
                product.style.display = 'none';
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

});