const ProductModel = require('../models/product.models.js');

const listProducts = async (req, res) => {
    const { category } = req.body;
    const categoryFilter = category ? { category } : {};
    const products = await ProductModel.find(categoryFilter).select('-__v');

    return res
        .status(200)
        .json({
            message: 'Products fetched successfully',
            data: products,
        });
};

module.exports = listProducts;
