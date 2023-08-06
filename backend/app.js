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
const paymentsRouter = require("./routes/payments_router");
const emails_router = require("./routes/emails_router.js");

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
app.use("/payments", paymentsRouter)
app.use('/emails', emails_router);

module.exports = app;
