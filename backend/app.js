// modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");


const usersRouter = require("./routes/users_router");
const productsRouter = require("./routes/products_router");
const ordersRouter = require("./routes/orders_router");
const cartsRouter = require("./routes/carts_router");
const categoriesRouter = require("./routes/categories_router");


const app = express();

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// routes
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/carts", cartsRouter);
app.use("/categories", categoriesRouter);

module.exports = app;
