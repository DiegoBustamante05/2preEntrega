import express from "express";
import { CartModel } from "../DAO/models/carts.model.js";
import { CartService } from "../services/carts.service.js";


export const routerViewCarts = express.Router();




routerViewCarts.get("/", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const cart = await CartModel.getCartById(id);
        console.log(cart)
        return res.render('cart', { title: "Cart", cart: cart} );
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "error getting products" })
    }
});

