const routes = require('express').Router();
const CartController = require('../controllers/CartController');

// Add item to cart
routes.post('/add', CartController.addToCart);

// Get cart items by user ID
routes.get('/get/:userId', CartController.getCartItems);

// Update cart item quantity
routes.put('/update/:id', CartController.updateCartItem);

// Delete cart item
routes.delete('/delete/:id', CartController.deleteCartItem);

module.exports = routes;