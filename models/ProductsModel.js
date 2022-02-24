const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: String,
    },
imageUrl: {
    type: String,
},
title: {
    type: String,
},
status: {
    type: String,
},
location: {
    type: String,
},
avatar: {
    type: String,
},
price: {
    type: String,
},
date: {
    type: String,
},
link: {
    type: String,
},
currency: {
    type: String,
},
priority: {
    type: String,
},
category: {
    type: String,
},
});

const ProductsModel = mongoose.model("products", productSchema);
module.exports = ProductsModel