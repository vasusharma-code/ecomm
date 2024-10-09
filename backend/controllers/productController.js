const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError  = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create Product-- Admin
exports.createProduct = catchAsyncError(async (req, res,next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success : true,
        product
    })
})

//Get All Products
exports.getAllProducts = catchAsyncError(async(req,res) =>{
    const  resultPerPage = 5;
    const productCount  = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({success : true,
        products})
})

//Get Single Product
exports.getProductDetail = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler("Product Not Found",404));
            }
            res.status(200).json({
                success : true,
                product,
                productCount,
            })
})

//Update Product--Admin
exports.updateProduct = catchAsyncError(async (req, res,next) => {
    let  product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler("Product Not Found",404));
            }
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new  : true,
                runValidators : true,
                useFindAndModify:false
                })
            
    res.status(200).json({
        success : true,
        product
    })
    
})
//Delete
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
