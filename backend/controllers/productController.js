const { Product, Category } = require("../models");

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
        console.error("Error creating product:", err);
        res.status(500).json({ message: "Internal Error", error: err.message })
    }
};

const getProducts = async (req, res) => {
    try {
        const product = await Product.findAll({ include: Category });

        res.json(product);
    } catch (err) {
        console.log("Error fetching products:", err);
        res.status(500).json({ message: "Internal Error" })
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, brand, category_id, is_active } = req.body;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        await product.update({
            title,
            description,
            brand,
            category_id,
            is_active,
        });

        res.status(200).json({
            message: "Product Updated",
            product,
        });
    } catch (err) {
        console.err("Error", err);
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        await product.destroy();
        res.status(200).json({
            message: "Product Deleted",
        });
    } catch (err) {
        console.err("Error", err);
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };