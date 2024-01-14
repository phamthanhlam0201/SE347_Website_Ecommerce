import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
    size: {
      type: String,
      required: true,
      default: '',
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    color: {
      type: String,
      required: true,
      default: '',
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
