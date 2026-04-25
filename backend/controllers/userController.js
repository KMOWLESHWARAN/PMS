const { User } = require("../models");

const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({
                message: "Role is required"
            });
        }
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.role = role;
        await user.save();

        res.json({
            message: "Role updated successfully",
            user
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error updating role"
        });
    }
};

module.exports = { updateUserRole };