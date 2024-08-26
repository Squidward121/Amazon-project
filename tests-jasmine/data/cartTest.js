import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  
  it('adds an existing product to the cart', () => {

    spyOn(localStorage, 'setItem'); // a mock only last for 1 test, that's why we mock 'setItem' here to mock multiple times.

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });    // used to create Mock version(a fake version) of object, in here it's localStorage, so with a fake version we can do anything we want with it. The 1st parameter is the object we want to mock, and 2nd is the method we want to mock. we usually create Mock when there is a flaky test situation.
    loadFromStorage();
    

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //it only works on spyOn mode, to check how many times localStorage.setItem have been called.
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});