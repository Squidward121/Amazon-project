// let's create a function to create multiple objects:
// naming convention: use PascalCase(start every word in cap) for things that generate objects.
function Cart(localStorageKey) {
  const cart = {
    cartItems : undefined,
  
    // "this" will give the object which contains the function, so when we change the object's name later, it won't be a problem. 
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      
      if(!this.cartItems){
        this.cartItems = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },
    
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    
    addToCart(productId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId)
        {
          matchingItem = cartItem;
          
        }
      });
    
      if(matchingItem) {
        matchingItem.quantity++;
      }
      else{
        this.cartItems.push(
          {
            productId,
            quantity: 1,
            deliveryOptionId: '1'
          }
        );
      }
    
      this.saveToStorage();
    },
  
  
    removeFromCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach( (cartItem) => {
        if(cartItem.productId !== productId)
        {
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart;
    
      this.saveToStorage();
    },
  
  
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId)
        {
          matchingItem = cartItem;
          
        }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');


cart.loadFromStorage();
businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);

/* 
  This is the basic idea behind the OOP, organizing our into an object.

  Why do we use OOP?
  -it tries to represent the real world.

  for eg:
    In real world a cart is a physical object, In OOP we represent this physical object in a digital object/js object(the variable cart).
    In physical cart can have products inside, In js object can also have products inside(adding default products in "loadFromStorage()").
    In physical cart we can add products or remove products, In js object we can also add or remove products("addToCart()" and "removeFromCart()").

  so as you can see OOP tries to represent real world objects, this makes easier to understand and write code coz we are relating to the real world.

  And it's easier to create multiple carts using OOP by simply copy-pasting and by changing it's name.
*/

