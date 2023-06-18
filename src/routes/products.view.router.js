import express from "express";
import { ProductManager } from "../DAO/productManager.js";
import { ProductModel } from "../DAO/models/products.model.js";

const productManager = new ProductManager();

export const routerViewProducts = express.Router();




routerViewProducts.get("/", async (req, res) => {
        const { page } = req.query
        console.log(page)
        const limitedProducts = await ProductModel.paginate({}, { limit:9, page: page || 1 });
        const products = limitedProducts.docs.map(product=>{
            return{
                thumbnail: product.thumbnail,
                title: product.title,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
            };
        });
        
        return res.render('home', { title: "Products", products: products} );
});
