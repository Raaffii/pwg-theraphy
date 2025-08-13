const express = require("express");
const authRoute = require("./authRoutes");
const profileRoute = require("./profileRoutes");
const customerRoute = require("./customerRoutes");
const interestsRoute = require("./interestsRoutes");
const consentRoute = require("./consentRoute");
const therapistRoute = require("./therapistRoute");
const evaluationRoute = require("./evaluationRoute");
const productsRoute = require("./productsRoute");
const posRoute = require("./posRoute");

const Router = express.Router();

// Auth Route
Router.use("/auth", authRoute);
Router.use("/profile", profileRoute);
Router.use("/customer", customerRoute);
Router.use("/interests", interestsRoute);
Router.use("/consent", consentRoute);
Router.use("/therapist", therapistRoute);
Router.use("/evaluation", evaluationRoute);
Router.use("/products", productsRoute);
Router.use("/pos", posRoute);

module.exports = Router;
