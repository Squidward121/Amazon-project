import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

// Auto generating HTML code according to no of data, so we don't have to copy paste HTML code manually. if there's a new data then JS will auto generate the HTML code by iterating.
let productHTML = '';

products.forEach( (products) => {
  productHTML = productHTML + `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${products.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${products.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${products.rating.stars *10}.png">
        <div class="product-rating-count link-primary">
          ${products.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(products.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${products.id}" >
        Add to Cart
      </button>
    </div>
  `;

  // "data-product-id" is a Data attribute for HTML element. It's used for to give any info we want to the element, first word should be "data" and next is a name we want, then assign the value you want.
});

document.querySelector('.products-grid-js').innerHTML = productHTML;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
     const productId = button.dataset.productId;
      // "dataset" is used to get all the info given to the data attribute in HTML. "dataset" act like a object, so to access the info we assigned, use the name we gave it in camelcase(.productId).

      let matchingItem;

      cart.forEach((item) => {
        if(productId === item.productId)
        {
          matchingItem = item;
          
        }
      });

      if(matchingItem) {
        matchingItem.quantity++;
      }
      else{
        cart.push(
          {
            productId,
            quantity: 1
          }
        );
      }

      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    });
  });
