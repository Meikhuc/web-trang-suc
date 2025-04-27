document.addEventListener('DOMContentLoaded', function () {
    const priceCheckboxes = document.querySelectorAll('#priceDropdown input[type="checkbox"]');
    const colorCheckboxes = document.querySelectorAll('#colorDropdown input[type="checkbox"]');
    const materialCheckboxes = document.querySelectorAll('#materialDropdown input[type="checkbox"]');
    const stoneCheckboxes = document.querySelectorAll('#stoneDropdown input[type="checkbox"]');
    const sortSelect = document.getElementById('sort-select');
    const productItems = document.querySelectorAll('.product-bst-item');

    // Hàm lọc sản phẩm
    function filterProducts() {
        const selectedPrices = getSelectedValues(priceCheckboxes);
        const selectedColors = getSelectedValues(colorCheckboxes);
        const selectedMaterials = getSelectedValues(materialCheckboxes);
        const selectedStones = getSelectedValues(stoneCheckboxes);

        productItems.forEach(product => {
            const priceText = product.querySelector('.price').textContent.trim();
            const priceNumber = Number(priceText.replace(/[^\d]/g, ''));
            const productTitle = product.querySelector('p a').textContent.trim();

            let priceMatch = selectedPrices.length === 0 || selectedPrices.some(range => {
                if (range.includes('Nhỏ hơn')) return priceNumber < 5000000;
                if (range.includes('5.000.000') && range.includes('7.000.000')) return priceNumber >= 5000000 && priceNumber <= 7000000;
                if (range.includes('7.000.000') && range.includes('10.000.000')) return priceNumber >= 7000000 && priceNumber <= 10000000;
                if (range.includes('10.000.000') && range.includes('15.000.000')) return priceNumber >= 10000000 && priceNumber <= 15000000;
                if (range.includes('15.000.000') && range.includes('20.000.000')) return priceNumber >= 15000000 && priceNumber <= 20000000;
                if (range.includes('Lớn hơn')) return priceNumber > 20000000;
                return true;
            });

            let colorMatch = selectedColors.length === 0 || selectedColors.some(color => productTitle.includes(color));
            let materialMatch = selectedMaterials.length === 0 || selectedMaterials.some(material => productTitle.includes(material));
            let stoneMatch = selectedStones.length === 0 || selectedStones.some(stone => productTitle.includes(stone));

            product.style.display = (priceMatch && colorMatch && materialMatch && stoneMatch) ? 'block' : 'none';
        });
    }

    // Hàm lấy danh sách giá trị đã chọn
    function getSelectedValues(checkboxes) {
        return Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.parentElement.textContent.trim());
    }

    // Hàm sắp xếp sản phẩm
    function sortProducts() {
        const productsArray = Array.from(productItems);
        const sortType = sortSelect.value;

        productsArray.sort((a, b) => {
            const priceA = Number(a.querySelector('.price').textContent.replace(/[^\d]/g, ''));
            const priceB = Number(b.querySelector('.price').textContent.replace(/[^\d]/g, ''));
            return sortType === 'Giá thấp đến cao' ? priceA - priceB
                : sortType === 'Giá cao đến thấp' ? priceB - priceA
                : 0;
        });

        const parent = productItems[0].parentNode;
        productsArray.forEach(product => parent.appendChild(product));
    }

    // Bắt sự kiện thay đổi cho checkbox
    function setupSingleSelect(checkboxes) {
        checkboxes.forEach(cb => {
            cb.addEventListener('change', function () {
                if (this.checked) {
                    checkboxes.forEach(other => {
                        if (other !== this) other.checked = false;
                    });
                }
                filterProducts();
            });
        });
    }

    setupSingleSelect(priceCheckboxes);
    colorCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    materialCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    stoneCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    sortSelect.addEventListener('change', sortProducts);
});