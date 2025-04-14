const CartModel = require("../models/CartModel");

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity, price, productname, imageURL } = req.body;

        // Check if item already exists in cart
        const existingItem = await CartModel.findOne({ userId, productId });

        if (existingItem) {
            // Update quantity if item exists
            existingItem.quantity += quantity;
            await existingItem.save();
            res.status(200).json({
                message: "Cart item quantity updated",
                data: existingItem
            });
        } else {
            // Create new cart item
            const cartItem = await CartModel.create(req.body);
            res.status(201).json({
                message: "Item added to cart",
                data: cartItem
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error adding item to cart",
            error: err.message
        });
    }
};

// Get cart items by user ID
const getCartItems = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cartItems = await CartModel.find({ userId });
        res.status(200).json({
            message: "Cart items retrieved successfully",
            data: cartItems
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching cart items",
            error: err.message
        });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItemId = req.params.id;

        const updatedItem = await CartModel.findByIdAndUpdate(
            cartItemId,
            { quantity },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            message: "Cart item updated successfully",
            data: updatedItem
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating cart item",
            error: err.message
        });
    }
};

// Delete cart item
const deleteCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const deletedItem = await CartModel.findByIdAndDelete(cartItemId);

        if (!deletedItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            message: "Cart item deleted successfully",
            data: deletedItem
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting cart item",
            error: err.message
        });
    }
};

module.exports = {
    addToCart,
    getCartItems,
    updateCartItem,
    deleteCartItem
};
