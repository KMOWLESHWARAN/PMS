const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, PasswordResetOtp } = require("../models");
const sendOtp = require("../utils/sendOtp");

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
            { expiresIn: "1d" },
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

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
        }
        await PasswordResetOtp.destroy({ where: { email } });
        const otp = Math.floor(100000 + Math.random() * 900000);
        await PasswordResetOtp.create({
            email,
            otp,
            expires_at: new Date(Date.now() + 5 * 60 * 1000)
        });
        await sendOtp(email, otp);
        res.json({ message: "Otp send successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error Sending Otp" });
    }
};

const verifyOtp = async (req, res) => {
    try {
        let { email, otp } = req.body;
        otp = String(otp).trim();
        const record = await PasswordResetOtp.findOne({
            where: { email },
            order: [["createdAt", "DESC"]],
        });
        if (!record) {
            return res.status(400).json({ message: "No OTP found" });
        }
        if (String(record.otp) !== otp) {
            return res.status(400).json({ message: "Invalid Otp" });
        }
        if (record.expires_at < new Date()) {
            return res.status(400).json({ message: "Otp expired" });
        }
        record.is_used = true;
        await record.save();
        res.json({ message: "Otp verified" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const record = await PasswordResetOtp.findOne({
            where: { email, otp }
        });

        if (!record) {
            return res.status(400).json({
                message: "Invalid Otp"
            });
        }

        const user = await User.findOne({ where: { email } });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        record.is_used = true;
        await record.save();

        res.json({ message: "Password reset successful" });

    } catch (err) {
        res.status(500).json({ message: "Error resetting password" });
    }
};

module.exports = {
    registerUser, loginUser, forgetPassword, verifyOtp, resetPassword
};