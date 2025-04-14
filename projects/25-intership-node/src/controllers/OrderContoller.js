const { get } = require("mongoose");








const OrderModel = require("../models/OrderModel"); // Ensure correct model import
const ProductModel = require("../models/ProductModel"); // Ensure correct model import

// ✅ Add Order
const addOrder = async (req, res) => {
  try {
    const { userId, ProductId, quantity, addressId, size } = req.body;
console.log(ProductId)

    // Check if product exists and has sufficient stock
    const product = await ProductModel.findById(ProductId);
    console.log(product)
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }

    // Create new order
    const order = new OrderModel({
      userId,
      ProductId,
      quantity,
      addressId,
      size,
      status: "pending",
    });

    await order.save();

    // Update product stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error in addOrder:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};

// ✅ Get All Orders
const getorder = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("ProductId") // Populate product details
      .populate("userId") // Populate user details
      .populate("addressId"); // Populate address details

    res.status(200).json({
      success: true,
      message: "All orders fetched",
      data: orders,
    });
  } catch (err) {
    console.error("Error in getorder:", err);
    res.status(500).json({ success: false, message: "Error fetching orders", error: err.message });
  }
};

// ✅ Get Product by ID
const getproductById = async (req, res) => {
  try {
    const foundProduct = await ProductModel.findById(req.params.id);
    if (!foundProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product fetched successfully",
      data: foundProduct,
    });
  } catch (err) {
    console.error("Error in getproductById:", err);
    res.status(500).json({ success: false, message: "Error fetching product", error: err.message });
  }
};







const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching orders for user:', userId); // Debug log

    const orders = await OrderModel.find({ userId })
      .populate('ProductId', 'productname imageURL price')
      .populate('addressId', 'addressURL pincode')
      .sort({ createdAt: -1 });

    console.log('Found orders:', orders); // Debug log

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error in getOrdersByUserId:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedProduct = await OrderModel.findByIdAndDelete(orderId);
    
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Error deleting product",
      error: err.message 
    });
  }
};

  

module.exports = { addOrder, getorder, getproductById,getOrdersByUserId,deleteOrder };
