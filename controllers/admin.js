const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn
        
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const ImageURL = req.body.ImageURL;
    const discount=req.body.discount;
    const Price = req.body.Price;
    const description = req.body.description;
    const freedelivery=req.body.freedelivery;
   const product= new Product({
    title:title,
    ImageURL:ImageURL,
    Price:Price,
    discount:discount,
    description:description,
    freedelivery:freedelivery,
    userId:req.user
});
   product
   .save()
   .then(result => {
    // console.log(result);
    console.log("Created Product");
    res.redirect('/admin/products');
})
.catch(err => { 
    console.log(err) 
});
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
   Product.findById(prodId)
    .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                isAuthenticated: req.session.isLoggedIn
            })
         })
    .catch((erro)=>{console.log(erro);});
};


exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.ImageURL;
    const updatedDiscount=req.body.discount;
    const updatedPrice = req.body.Price;
    const updatedDesc = req.body.description;
    const updatedFree=req.body.freedelivery;
   Product.findById(prodId)
   .then(product => {
        product.title = updatedTitle;
        product.ImageURL = updatedImageUrl;
        product.discount = updatedDiscount;
        product.Price = updatedPrice;
        product.description = updatedDesc;
        product.freedelivery = updatedFree;
        return product.save()
    })
    .then(result=>{
        console.log('updated product')
        res.redirect('/admin/products');
    })
    .catch((erro)=>{console.log(erro)});
}

exports.getProducts = (req, res, next) => {
   Product.find()
    .then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            isAuthenticated: req.session.isLoggedIn
        });

}).catch((erro)=>{console.log(erro);});
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
    .then(()=>{
        console.log('DESTROY PRODUCT')
        res.redirect('/admin/products');
    })
    .catch((erro)=>{console.log(erro);});
  

}