// cart.js

// Массив для хранения товаров в корзине
let cart = [];

// Функция для добавления товара в корзину
function addToCart(item) {
    cart.push(item);
}

// Функция для получения всех товаров в корзине
function getCart() {
    return cart;
}

// Функция для очистки корзины
function clearCart() {
    cart = [];
}

// Экспортируем функции
module.exports = {
    addToCart,
    getCart,
    clearCart
};

