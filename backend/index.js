const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const productRouter = require("./routes/productRoutes");
app.use("/api/products", productRouter);

const categoryRouter = require("./routes/categoryRoutes");
app.use("/api/category", categoryRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log("server started");
});
