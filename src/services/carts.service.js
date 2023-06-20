import {
    CartModel
} from '../DAO/models/carts.model.js';

export class CartService {
    constructor() {}

    // Crea carrito OK!!
    async newCart() {
        const newCart = await CartModel.create({
            products: []
        });
        return newCart;
    }
    
    //obtener carrito por id OK!!
    async getCartById(id) {
        const cart = await CartModel.findById(id);
        console.log(JSON.stringify(cart, null, 2));
        return cart;
    }


    async addProdtoCart(cId, pId) {
        const cart = await CartModel.findById(cId);
        const product = {
            product: pId,
            quantity: 1,
        };
        
        const productExist = cart.products.find((product) => product.product == pId);
        productExist ? productExist.quantity++ : cart.products.addToSet(product);
        await cart.save();
        return product;
    }


    //borrar todos los products  del carrito OK!!
    async clearCart(cid) {
        const cart = await CartModel.findById(cid);
        console.log(cart)
        cart.products = [];
        await cart.save();
    }

    //actualizar carrito con nuevo array de productos
    async updateCart(cid, products) {
        const cart = await CartModel.findById(cid);
        cart.products = products;
        await cart.save();
    }

    //eliminar un producto del carrito
    async deleteProductInCart(cid, productId) {
        const cart = await CartModel.findById(cid);
        cart.products = cart.products.filter(product => product.product.toString() !== productId);
        await cart.save();
    }

    async updateQuantity(cid, productId, quantity) {
        const cart = await CartModel.findById(cid);
        const product = cart.products.find(product => product.product.toString() === productId);
        if (product) {
            product.quantity = quantity;
            await cart.save();
        }
    }
}