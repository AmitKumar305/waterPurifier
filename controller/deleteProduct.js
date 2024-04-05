const ProductModel = require('../models/product.models.js');

const deleteProduct = async (req, res) => {
    const { productId } = req.body;

    const product = await ProductModel.findOne({
        _id: productId,
    });

    if (!product) {
        return res.status(400).json({
            message: 'No product found',
        });
    }
    await ProductModel.findByIdAndDelete({
        _id: productId,
    });

    return res
        .status(200)
        .json({
            message: 'Product deleted successfully',
        });
};

module.exports = deleteProduct;
