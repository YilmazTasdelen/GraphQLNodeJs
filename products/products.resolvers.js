const productsModel = require('./products.model');

module.exports = {
    Query: {
        products: () => {
            return productsModel.getAllProducts();
        },
        productsByPrice: (_, args) => { // if dont use previous arguments named as a _
            return productsModel.getProductsByPrice(args.min, args.max);
        }
    }
}; 