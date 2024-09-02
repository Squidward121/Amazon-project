import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import headerCartQuantity from "./checkout/header.js";
import '../data/cart-class.js';

renderOrderSummary();
renderPaymentSummary();
headerCartQuantity();