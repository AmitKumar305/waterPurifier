const ProductModel = require('../models/product.models.js');
const uploadOnCloudinary = require('../services/cloudinary.js');

const CATEGORY = {
    DOMESTIC_WATER_PURIFIERS: 1,
    COMMERCIAL_WATER_PURIFIERS: 2,
    WATER_SOFTNERS: 3,
    ACCESSORIES: 4,
    HIGH_PH_PURIFIERS: 5,
}

const addProduct = async (req, res) => {
    const { title, category, brand, price, discountedPrice } = req.body;

    if (!(title || category || brand || price || discountedPrice)) {
        return res.status(400).json({
            message: 'Missing required fields',
        });
    }

    const uploadedFile = await uploadOnCloudinary(req.files?.image?.data);

    const product = new ProductModel({
        title,
        category,
        brand,
        price,
        discountedPrice,
        image: uploadedFile?.url || '',
    });
    await product.save();

    return res
        .status(200)
        .json({
            message: 'Product added successfully',
            data: product,
        });
};


module.exports = addProduct;
