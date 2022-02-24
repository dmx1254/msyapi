const router = require("express").Router();
const ProductsModel = require("../models/ProductsModel");
const productsController = require("../controllers/productsControllers");

router.get("/products", productsController.getAllProducts);
router.get("/products/:id", productsController.getProduct);
router.get("/search/:searchQuery", productsController.productsSearch);
router.get("/products/search/category/:cat", async (req, res) => {
  
    const { cat } = req.params;
 
    const products = await ProductsModel.find();
    try {
      const productsCat = products.filter((product) =>
        product.category.toLowerCase().includes(cat.toLowerCase())
      );
      res.status(200).send(productsCat);
    } catch (error) {
      res.status(500).send(error);
    }
});

module.exports = router;
