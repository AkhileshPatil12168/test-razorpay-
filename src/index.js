const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require("dotenv").config();



app.use(
    "*",
    cors({
        origin: ["http://localhost:1234"],
        credentials: true,
    })
);



const Router = require("./routes.js");

app.use("/", Router);

app.listen(process.env.PORT, () => console.log(process.env.PORT+" server is running"));
