const express = require("express");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const path = require("path");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();

dotenv.config();
connectDB();
app.use(express.json());

app.use("/api", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/categories/", categoryRouter);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../", "frontend", "build");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("api running on main port...");
  });
}

app.use(errorHandler);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server connecting on ${port}`);
});
