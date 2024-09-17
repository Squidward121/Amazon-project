import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import headerCartQuantity from "./checkout/header.js";
import '../data/backend-practice.js';

renderOrderSummary();
renderPaymentSummary();
headerCartQuantity();