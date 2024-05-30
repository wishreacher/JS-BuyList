window.onload = function() {
    updateToBuyStats();
    updateBoughtStats();
}

function createProductItem(productName) {
    var newListItem = document.createElement('li');

    newListItem.className = 'product-item';

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

function updateToBuyStats() {
    var toBuyStats = document.querySelector('.left-badges');
    toBuyStats.innerHTML = ''; // Clear the current stats

    var productItems = document.querySelectorAll('.product-item');
    productItems.forEach(function(productItem) {
        var stateButton = productItem.querySelector('.product-state');
        if(stateButton.textContent === 'Не куплено') {
            var productName = productItem.querySelector('.product-label').textContent;
            var productQuantity = productItem.querySelector('.amount-text').textContent;

            var badge = document.createElement('div');
            badge.className = 'badge';
            badge.innerHTML = `<p class="badge-text">${productName}</p><p class="badge-amount">${productQuantity}</p>`;
            toBuyStats.appendChild(badge);
        }
    });
}

function updateBoughtStats() {
    var boughtStats = document.querySelector('.bought-badges');
    boughtStats.innerHTML = ''; // Clear the current stats

    var productItems = document.querySelectorAll('.product-item');
    productItems.forEach(function(productItem) {
        var stateButton = productItem.querySelector('.product-state');
        if(stateButton.textContent === 'Куплено') {
            var productName = productItem.querySelector('.product-label').textContent;
            var productQuantity = productItem.querySelector('.amount-text').textContent;

            var badge = document.createElement('div');
            badge.className = 'badge crossed-out';
            badge.innerHTML = `<p class="badge-text">${productName}</p><p class="badge-amount">${productQuantity}</p>`;
            boughtStats.appendChild(badge);
        }
    });
}

// Call these functions whenever a product's name, quantity, status, or existence changes
var container = document.getElementById('container');
container.addEventListener('click', function (event) {
    if (event.target.className === 'product-delete') {
        event.target.closest('.product-item').remove();
    }

    if (event.target.classList.contains('minus-button')) {
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

        var minusButton = amountText.previousElementSibling;

        minusButton.classList.remove('transparent-item');
    }

    if (event.target.classList.contains('product-state')) {
        var stateButton = event.target;
        var productItem = stateButton.closest('.product-item');
        var productLabel = productItem.querySelector('.product-label');
        var minusButton = productItem.querySelector('.minus-button');
        var plusButton = productItem.querySelector('.plus-button');
        var deleteButton = productItem.querySelector('.product-delete');

        if (stateButton.textContent === 'Не куплено') {
            stateButton.textContent = 'Куплено';
            productLabel.classList.add('crossed-out');
            minusButton.style.display = 'none';
            plusButton.style.display = 'none';
            deleteButton.style.display = 'none';
        } else {
            stateButton.textContent = 'Не куплено';
            productLabel.classList.remove('crossed-out');
            minusButton.style.display = '';
            plusButton.style.display = '';
            deleteButton.style.display = '';
        }
    }

    if (event.target.classList.contains('product-label')) {
        var productLabel = event.target;
        var productName = productLabel.textContent;

        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = productName;

        var productLabelWidth = parseFloat(window.getComputedStyle(productLabel).width);
        var adjustedWidth = productLabelWidth - 8;
        inputField.style.width = adjustedWidth + 'px';

        productLabel.replaceWith(inputField);

        inputField.focus();

        inputField.addEventListener('focusout', function () {
            var updatedProductName = inputField.value;

            inputField.replaceWith(productLabel);

            productLabel.textContent = updatedProductName;
        });
    }

    updateToBuyStats();
    updateBoughtStats();
});