import '../../data/cart-class.js';

export function headerCartQuantity() {
  let cartQuantity = 0;

  cart.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
}

export default headerCartQuantity;