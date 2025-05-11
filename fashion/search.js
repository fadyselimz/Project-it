document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const productCards = document.querySelectorAll('.product');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchValue = searchInput.value.toLowerCase();

            for (let i = 0; i < productCards.length; i++) {
                const card = productCards[i];

                const title = card.querySelector('h3').textContent.toLowerCase();
                
                
                if (title.includes(searchValue)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
});