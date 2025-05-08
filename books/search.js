document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    // Select all book cards (adjust selector if needed)
    const products = document.querySelectorAll('.horror, .fantasy, .romantic, .acc, .eng');

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        products.forEach(product => {
            // Get all text content for searching
            const text = product.textContent.toLowerCase();
            if (text.includes(query)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    });
});