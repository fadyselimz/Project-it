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

        if (firstMatch) {
            const headerOffset = 150;
            const elementPosition = firstMatch.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });

});