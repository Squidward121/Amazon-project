/* 
  we are using class to group the properties and methods, so we can generate new multiple objects.
  each object will have all this properties and methods, but we differentiate them by names.
*/
// class is a better way to generate objects in object-oriented programming.
class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {             // it works as normal method except it runs automatically after creating the object. use "constructor" keyword.
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    
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
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

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
  }

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
  }

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
}


const cart = new Cart('cart-oop');    // this is how we generate a new object. the "new" keyword is used to let the compiler know that it's a new object.
const businessCart = new Cart('cart-business');    // the parameter we gives will go to constructor inside the class.
// by the way each object that we generate from a class is called the instance of the class.



console.log(cart);
console.log(businessCart);

// we can check if a object is a instance of a class or not:
console.log(businessCart instanceof Cart);  // so this will check if the "businessCart" is a object generated by the class "Cart".


/*
  so an whole basic idea is:
    OOP means organizing our code into objects coz it tries to represent the real world.
    Class is a feature which helps us to generate these objects0 multiple times, basically it's an object generator.
*/

/*
  benefits of using OOP:
  1) can use to generate objects multiple times and cleaner than using a function.
  2) Classes have extra features for OOP:
    *Constructor(lets us run setup code after creating an object)
    its useful when we have some setup code after creating the object, we can move the setup code into the constructor method and it'll automatically runs the method.
    so it's cleaner, we moved the code inside the class. And it can have parameters, arguments goes on object creating section and we give it inside the class calling.
    it has to be named "constructor", and should not return anything from the constructor.
*/