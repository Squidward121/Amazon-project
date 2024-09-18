import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import headerCartQuantity from "./checkout/header.js";
// import '../data/backend-practice.js';


loadProducts( () => {
  renderOrderSummary();
  renderPaymentSummary();
});
headerCartQuantity();