const ProductsModel = require("../models/ProductsModel");

module.exports.getAllProducts = async (req, res) => {
  const products = await ProductsModel.find();
  try {
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send("wait later and try again", error);
  }
};

module.exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductsModel.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.productsSearch = async (req, res) => {
  const { searchQuery } = req.params;
  const products = await ProductsModel.find();

  try {
    const productSearch = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    res.status(200).send(productSearch);
  } catch (error) {
    res.status(500).send(error);
  }
};
