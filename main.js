function createProductItem(productName) {
    var newListItem = document.createElement('li');

    // Add class to the new li element
    newListItem.className = 'product-item';

    // Set the content of the new li element
    newListItem.innerHTML = `
        <p class="product-label">${productName}</p>
        <div class="product-amount">
            <button class="minus-button round-button" data-tooltip="-">-</button>
            <p class="amount-text">1</p>
            <button class="plus-button round-button" data-tooltip="+">+</button>
        </div>
        <div class="product-control">
            <button class="product-state" data-tooltip="Статус">Куплено</button>
            <button class="product-delete" data-tooltip="Видалити">×</button>
        </div>
    `;

    // Append the new li element to the product-list
    document.querySelector('.product-list').appendChild(newListItem);
}

document.getElementById('add-product-button').onclick = function() {
    var productName = document.getElementById('product-name');
    if(productName.value === '') {
        alert('Введіть назву продукту');
        return;
    }
    createProductItem(productName.value);
    productName.value = '';
    productName.focus();
}