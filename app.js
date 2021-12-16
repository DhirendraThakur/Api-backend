const express = require ("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
require ("./database/database");
const customerRouter = require ("./router/customerRouter");
app.use(customerRouter);
app.listen("90");