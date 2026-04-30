const { Notification } = require("../models");

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { role: req.user.role },
            order: [['createdAt', 'DESC']],
            limit: 15
        })
        res.status(200).json({ notifications });

    } catch (err) {
        console.error("Error", err);
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        })
    }
};

const markRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }
        await notification.update({ isRead: true });
        res.status(200).json({
            message: "Marked as read"
        });
    } catch (err) {
        console.error("Error", err);
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        })
    }
}
module.exports = { getNotifications, markRead };