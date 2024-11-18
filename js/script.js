const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');
let cart = [];
let totalPrice = 0;

// Обработчик клика по навигации
nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const section = document.querySelector(`[data-section="${href}"]`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Добавление эффектов наведения на секции
sections.forEach((section) => {
    section.addEventListener('mouseover', () => section.classList.add('hover'));
    section.addEventListener('mouseout', () => section.classList.remove('hover'));
});

// Функция для переключения меню
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('hidden');
}

// Функция для добавления товара в корзину
function addToCart(productId) {
    const productElement = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!productElement) {
        console.error(`Товар с ID ${productId} не найден`);
        return;
    }

    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    totalPrice += productPrice;
    updateCart();
}

// Функция для обновления содержимого корзины
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - ${item.quantity} шт. по ${item.price}₽`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.onclick = () => removeFromCart(item.id);
        itemElement.appendChild(removeButton);
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('total-price').textContent = `Итого: ${totalPrice}₽`;
    document.getElementById('cart-count').textContent = cart.length;
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        totalPrice -= cart[productIndex].price * cart[productIndex].quantity;
        cart.splice(productIndex, 1);
        updateCart();
    }
}

// Функция для переключения видимости корзины
function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.classList.toggle('active');
}

// Функция для оформления заказа
function checkout() {
    if (cart.length === 0) {
        alert("Корзина пуста!");
    } else {
        alert("Оформление заказа...");
        // Здесь можно добавить логику оформления заказа
    }
}

function submitFeedback(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Здесь вы можете отправить данные на сервер или обработать их как вам нужно
    console.log("Имя:", name);
    console.log("Email:", email);
    console.log("Сообщение:", message);

    alert("Спасибо за ваш отзыв!");

    // Очищаем форму
    document.getElementById('feedback-form').reset();
}
