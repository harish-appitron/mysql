const express = require("express")
const indexRouter = express.Router();

const auth = require("./auth");

indexRouter.use("/auth", auth);

module.exports = indexRouter;