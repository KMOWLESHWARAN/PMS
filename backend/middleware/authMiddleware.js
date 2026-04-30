const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "No token, access denied"
            });
        }
        const decode = jwt.verify(token, "secretKey");
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "No token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" })
    }
    next();
}

const isMerchantOrAdmin = (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "merchant") {
        return res.status(403).json({ message: "Access denied: Must be an Admin or Merchant" })
    }
    next();
}

module.exports = { protect, verifyToken, isAdmin, isMerchantOrAdmin };