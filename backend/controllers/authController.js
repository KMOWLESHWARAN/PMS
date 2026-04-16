const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exist"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            role,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid details"
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            "secretKey",
            { expiresIn: "1h" },
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "Login successful",
            token: token
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};
module.exports = { registerUser, loginUser }