const productsModel = require('./products.model');

module.exports = {
    Query: {
        products: () => {
            return productsModel.getAllProducts();
        },
        productsByPrice: (_, args) => { // if dont use previous arguments named as a _
            return productsModel.getProductsByPrice(args.min, args.max);
        },
        product: (_, args) => {
            return productsModel.getProductById(args.id);
        }
    },
    Mutation: {
        addNewProduct: (_, args) => {
            return productsModel.addNewProduct(args.id, args.description, args.price);
        }
    }
};

/**
 * ecample queries 
 * 1-
 * ------------------------------
 * {
  productsByPrice(min: 10, max: 50) {
    description
    price
  }
  orders {
    subtotal
    items {
      quantity
      product {
        id
        price
        reviews {
          rating
          comment
        }
      }
    }
  }
}
2-
--------------------------------------------
{
  products {
    description
  }
  orders {
    subtotal
    items {
      quantity
      product {
        id
        price
        reviews {
          rating
          comment
        }
      }
    }
  }
}
3-
-----------------------------------------------
   products(id:"bluejean") {
    description
    reviews{
        comments
        rating
    }
  }
productsByPrice(min: 10, max: 50) {
    description
    price
  }
  orders {
    subtotal
    items {
      quantity
      product {
        id
        price
        reviews {
          rating
          comment
        }
      }
    }
  }
}
example mutations
1-
----------------------------------------------
mutation{
    addNewProduct(id:"orangejacket",description:"",price:70.55)
    {// this is the return statement
        id
        reviews{
            rating
        }
    }
}
 * 
 * 
 */