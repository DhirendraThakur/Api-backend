const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

//multimedia is the folder name where images are stored

// the following code make the multimedia folder public
app.use(express.static(__dirname + "/multimedia"));
app.use(express.urlencoded({ extended: true }));
require("./database/database");
const customerRouter = require("./router/customerRouter");
const productRouter = require("./router/productRouter");
const workoutRouter = require("./router/workrouter");
const supplermentRouter = require("./router/supplementrouter");
const Feedback = require("./router/feedbackRouter");
app.use(customerRouter);
app.use(productRouter);
app.use(workoutRouter);
app.use(supplermentRouter);
app.use(Feedback);
app.listen("3500");
console.log("Listening on port 3500");