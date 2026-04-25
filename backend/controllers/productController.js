const { Product, Category, Variant, sequelize } = require("../models");
const csv = require("csv-parser");
const stream = require("stream");
const { Parser } = require("json2csv");
const { Op } = require("sequelize");

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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const search = req.query.search || "";
        const category = req.query.category || "all";

        console.log('Query params:', req.query);

        const offset = (page - 1) * limit;

        let where = {};
        if (search) {
            where[Op.or] = [
                {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('LOWER', sequelize.col('Product.title')), 'LIKE', `%${search.toLowerCase()}%`)
                    ]
                },
                {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('LOWER', sequelize.col('Product.brand')), 'LIKE', `%${search.toLowerCase()}%`)
                    ]
                }
            ];
        }
        if (category !== "all" && category !== "") {
            where.category_id = category;
        }

        console.log('Sequelize where clause:', where);

        const { count, rows } = await Product.findAndCountAll({
            where,
            include: [{ model: Category, attributes: ["name"] }],
            limit,
            offset,
            order: [["id", "DESC"]]
        });

        res.json({
            data: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (err) {
        console.log("Error fetching products:", err);
        res.status(500).json({ message: "Internal Error", error: err.message });
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

const bulkImportProducts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const results = [];

        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.file.buffer);

        bufferStream
            .pipe(csv())
            .on("data", (row) => {
                results.push(row);
            })
            .on("end", async () => {

                console.log("Parsed Data:", results);

                const existing = await Product.findAll({
                    attributes: ["title", "brand"]
                });

                const existingSet = new Set(
                    existing.map(p => `${p.title}-${p.brand}`)
                );

                let newProducts = [];
                let skipped = 0;

                for (let row of results) {
                    const key = `${row.title}-${row.brand}`;

                    if (existingSet.has(key)) {
                        skipped++;
                        continue;
                    }

                    existingSet.add(key);

                    newProducts.push({
                        title: row.title,
                        description: row.description,
                        brand: row.brand,
                        category_id: row.category_id || null,
                        is_active: true
                    });
                }

                await Product.bulkCreate(newProducts, {
                    ignoreDuplicates: true
                });

                res.json({
                    inserted: newProducts.length,
                    skipped
                });
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Import failed" });
    }
};

const exportProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Category, attributes: ["name"] }]
        });

        const formatted = products.map(p => ({
            title: p.title,
            description: p.description,
            brand: p.brand,
            category: p.Category?.name
        }));
        const parser = new Parser();
        const csv = parser.parse(formatted);

        res.header("Content-Type", "text/csv");
        res.attachment("products.csv");
        res.send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Export Failed" });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct, bulkImportProducts, exportProducts };