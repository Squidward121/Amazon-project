import {cart} from '../../data/cart-class.js';
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import  formatCurrency from "../utils/money.js";
import { addOrder } from '../../data/orders.js';


export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let cartQuantity = 0;

  cart.cartItems.forEach((cartItem) => {
    const Product = getProduct(cartItem.productId);
    productPriceCents += Product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

    cartQuantity += cartItem.quantity;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">
      $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try{
        const response = await fetch('https://supersimplebackend.dev/orders', {
  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
  
        });
        // this time we defined the request in a object, we defined the method, headers(which give the backend more info about our request), and the body(where we give the data to send to the backend)
        // in here the method is POST, thats why we've to define it like that. but if it was GET we dont need to define anything.
        // and then we wait for the respond to comeback using "await" in front of fetch, and fetch will return the respond and we'll save it in variable "response".
  
        const order = await response.json();
        // and then we take the json data that attached to the response and bcoz it "response.json()" is a promise we've to wait for it to finish the action and then we save result in variable order.
        addOrder(order);
      
      } catch(error) {
        console.log('Unexpected error, try again later');
      }

      // "window.location" lets us control the URL input area of browser, and using ".href" we can make it to go to another page.
      window.location.href = 'orders.html';
    });
}