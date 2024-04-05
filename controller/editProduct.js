const ProductModel = require('../models/product.models.js');
const uploadOnCloudinary = require('../services/cloudinary.js');

const editProduct = async (req, res) => {
    const { productId, title, category, brand, price, discountedPrice } = req.body;

    if (!productId) {
        return res.status(400).json({
            message: 'productId is required',
        });
    }

    const product = await ProductModel.findOne({
        _id: productId,
    });

    if (!product) {
        return res.status(400).json({
            message: 'No product found',
        });
    }

    const uploadedFile = await uploadOnCloudinary(req.files?.image?.data);

    const updatedProduct = await ProductModel.findByIdAndUpdate({
        _id: productId,
    },
    {
        title,
        category,
        brand,
        price,
        discountedPrice,
        image: uploadedFile?.url,
    }, {
        new: true,
    });

    return res
        .status(200)
        .json({
            message: 'Product updated successfully',
            data: updatedProduct,
        });
};

module.exports = editProduct;
