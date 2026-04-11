const Product = require("../models");

const createProduct = async (req, res) => {
    try {
        const { title, description, brand, category_id, is_active } = req.body;

        const product = await Product.create({
            title,
            description,
            brand,
            category_id,
            is_active,
        });
        res.status(201).json({
            message: "Product Created",
            product,
        });

    } catch (err) {
        res.status(500).json({ message: "Internal Error" })
    }
};

module.exports = { createProduct };