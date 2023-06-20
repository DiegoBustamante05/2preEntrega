import {
    Schema,
    model
} from 'mongoose';

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
            },
            quantity: { type: Number, default: 1 }
        }, ],
        required: true,
    },
});

cartSchema.pre("findById", function () {
    this.populate("products.product");
});
export const CartModel = model('carts', cartSchema);