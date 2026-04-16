const { Category } = require("../models");

const createCategory = async (req, res) => {
    try {
        const { name, parent_id } = req.body;

        const category = await Category.create({
            name,
            parent_id: parent_id || null,
        });

        res.status(201).json({
            message: "Category created successfully",
            category,
        });
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [['id', 'ASC']]
        });

        res.status(200).json(categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        });
    }
};
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, parent_id } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await category.update({
            name,
            parent_id: parent_id || null,
        });

        res.status(200).json({
            message: "Category updated successfully",
            category,
        })
    } catch (err) {
        console.error("Error updated category:", err);
        res.status(500).json({
            message: "Interval Error",
            error: err.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        });
    }
};

module.exports = { createCategory, getCategories, deleteCategory, updateCategory };
