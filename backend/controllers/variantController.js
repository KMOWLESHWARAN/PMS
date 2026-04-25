const { Variant } = require("../models");

const createVariant = async (req, res) => {
    console.log(req.body)
    try {
        const { product_id, sku, price, discount_price, stock, attributes } = req.body;

        if (!product_id || !sku || !price || !stock) {
            return res.status(400).json({
                message: "Required fields missing",
            });
        }

        const existing = await Variant.findOne({
            where: {
                sku,
                product_id
            }
        });

        if (existing) {
            return res.status(400).json({
                message: "Variant already exist"
            });
        }

        const variant = await Variant.create({
            product_id,
            sku,
            price,
            discount_price,
            stock,
            attributes,
        });

        res.status(201).json({
            message: "Variant Created",
            variant,
        });
    } catch (err) {
        console.error("Variant Error:", err);
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        });
    }
};

const getVariant = async (req, res) => {
    try {
        const variant = await Variant.findAll();
        res.status(200).json({
            variant
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Error"
        });
    }
};

const updateVariant = async (req, res) => {
    try {
        const { id } = req.params;
        const variant = await Variant.findByPk(id);

        if (!variant) {
            res.status(404).json({ message: "Variant not found" });
        }

        await variant.update(req.body);

        res.status(200).json({
            message: "Varinat Updated",
            variant
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Error" });
    }
};

const deleteVariant = async (req, res) => {
    try {
        const { id } = req.params;

        const varient = await Variant.findByPk(id);
        if (!varient) {
            res.status(404).json({ message: "Varinat not found" });
        }
        await varient.destroy();

        res.status(200).json({
            message: "Varinat Deleted"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Error"
        });
    }
};

module.exports = { createVariant, getVariant, updateVariant, deleteVariant };