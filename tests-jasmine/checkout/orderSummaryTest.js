// this is an Integration test.
/* look for this two while testing :
    1) How the page looks.
    2) How the page behaves when something changes. */
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {cart} from '../../data/cart-class.js';
import { loadProducts } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll( (done) => {
    loadProducts( () => {
      done();    // lets us control when to go to the next step.
    });
  });

  beforeEach(() => {
    /* This is beforeEach() hook, and it'll run the code we write before each of our test down below. there are several hooks in jasmine:
    *afterEach() = runs code after each test.
    *beforeAll() = runs code before all tests.
    *afterAll() = runs code after all tests. */
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"> </div>
      <div class="js-payment-summary"> </div>
    `;

    cart.cartItems = [{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }];

    cart.loadFromStorage();

    renderOrderSummary();
  });

  it('displays the cart', () => {

    expect(
      document.querySelectorAll('.js-cart-item-container').length     // checks if the cart contains two containers.
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');    // it checks if the selected element contains the text 'Quantity: 2'.

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');


    document.querySelector('.js-test-container').innerHTML = '';
  });


  it('removes a product', () => {

    document.querySelector(`.js-delete-link-${productId1}`).click;
   
    expect(
      document.querySelectorAll('.js-cart-item-container').length     // checks if the cart contains two containers.
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);


    document.querySelector('.js-test-container').innerHTML = '';
  });
});