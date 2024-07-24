document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            mainImage.src = thumbnail.src;
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card') || e.target.closest('.product-details');
            const productName = productCard.querySelector('h2') ? productCard.querySelector('h2').innerText : productCard.querySelector('.product-name').innerText;
            const productPrice = parseFloat(productCard.querySelector('.product-price').innerText.replace('$', ''));

            const productIndex = cart.findIndex(product => product.name === productName);

            if (productIndex > -1) {
                cart[productIndex].quantity += 1;
            } else {
                const product = {
                    name: productName,
                    price: productPrice,
                    quantity: 1
                };
                cart.push(product);
            }

            updateCart();
            localStorage.setItem('cart', JSON.stringify(cart));
            e.target.classList.add('clicked');
            setTimeout(() => {
                e.target.classList.remove('clicked');
            }, 200);
        });
    });

    function updateCart() {
        if (cartItems) {
            cartItems.innerHTML = '';
            let total = 0;
            cart.forEach((product, index) => {
                total += product.price * product.quantity;
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="item-name">${product.name}</span>
                    <span class="item-quantity">x${product.quantity}</span>
                    <span class="item-price">$${(product.price * product.quantity).toFixed(2)}</span>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(li);
            });
            totalAmount.innerText = total.toFixed(2);
        }
        cartCount.innerText = cart.reduce((count, product) => count + product.quantity, 0);
    }

    if (cartItems) {
        cartItems.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-from-cart')) {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        });
    }

    updateCart();
});


