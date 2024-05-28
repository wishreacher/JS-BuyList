function createProductItem(productName) {
    var newListItem = document.createElement('li');

    // Add class to the new li element
    newListItem.className = 'product-item';

    // Set the content of the new li element
    newListItem.innerHTML = `
        <p class="product-label">${productName}</p>
        <div class="product-amount">
            <button class="minus-button round-button transparent-item" data-tooltip="-">-</button>
            <p class="amount-text">1</p>
            <button class="plus-button round-button" data-tooltip="+">+</button>
        </div>
        <div class="product-control">
            <button class="product-state" data-tooltip="Статус">Не куплено</button>
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

var container = document.getElementById('container');
container.addEventListener('click', function(event) {
    if (event.target.className === 'product-delete') {
        event.target.closest('.product-item').remove();
    }
    // if(event.target.className === 'product-state') {
    //     var stateButton = event.target;
    //     if(stateButton.textContent === 'Не куплено') {
    //         stateButton.textContent = 'Куплено';
    //     } else {
    //         stateButton.textContent = 'Не куплено';
    //     }
    // }
    if(event.target.classList.contains('minus-button')) {
        var amountText = event.target.nextElementSibling;
        var amount = parseInt(amountText.textContent);
        if (amount > 1) {
            amountText.textContent = amount - 1;
        }
        if (amountText.textContent == 1) {
            event.target.classList.add('transparent-item');
        }
    }

    if (event.target.classList.contains('plus-button')) {
        var amountText = event.target.previousElementSibling;
        var amount = parseInt(amountText.textContent);
        amountText.textContent = amount + 1;

        // Get the corresponding minus button
        var minusButton = amountText.previousElementSibling;

        // Remove the 'transparent-item' class from the minus button
        minusButton.classList.remove('transparent-item');
    }

    if(event.target.classList.contains('product-state')) {
        var stateButton = event.target;
        var productItem = stateButton.closest('.product-item');
        var productLabel = productItem.querySelector('.product-label');
        var minusButton = productItem.querySelector('.minus-button');
        var plusButton = productItem.querySelector('.plus-button');
        var deleteButton = productItem.querySelector('.product-delete');

        if(stateButton.textContent === 'Не куплено') {
            // Mark the product as bought
            stateButton.textContent = 'Куплено';
            productLabel.classList.add('crossed-out');
            minusButton.style.display = 'none';
            plusButton.style.display = 'none';
            deleteButton.style.display = 'none';
        } else {
            // Mark the product as not bought
            stateButton.textContent = 'Не куплено';
            productLabel.classList.remove('crossed-out');
            minusButton.style.display = '';
            plusButton.style.display = '';
            deleteButton.style.display = '';
        }
    }
});