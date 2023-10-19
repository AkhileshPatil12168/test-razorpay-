const express = require("express");
const Router = express.Router();
const { getKey,getOrder,paymentVerification } = require("./razoryPayController");

Router.get('/getkey',getKey)

Router.post("/getorder",getOrder)

Router.post("/paymentverification",paymentVerification )

module.exports = Router;