import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import headerCartQuantity from "./checkout/header.js";
// import '../data/backend-practice.js';

/* this is a method of callback to handle the asynchronous code which will the call the functions back after the completion of "loadProducts()". 
loadProducts( () => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/


/*
Promises are better way to handle asynchronous code like "loadProducts()".
it lets us wait for some asynchronous code to finish, before going to the next step, just like "done()" in jasmine.
promise is a class, so we've to create it as a object using "new", and we've to give an arrow function as a parameter, and inside it where we write our asynchronous code.
when we create the promise it'll run the code inside the arrow function immediately, and this arrow function gets a parameter called "resolve", it's a function and we
can think of it as jasmine's "done()" function. So "resolve" lets us control when to go to the next step.
now with "resolve" let's work with an asynchronous code for eg: 
  
  new Promise( (resolve) => {
    loadProducts(() => {
      resolve();
    })
  });

  in above we created a new promise and wrote an asynchronous function which is "loadProducts()", and for "loadProducts()" we gave it a callback function as arrow function and inside we gave "resolve()".
  when the action of "loadProducts()" is finished we'll call "resolve()" to resolve it and to go to the next step, and we've to define the next step. for eg:

  new Promise( (resolve) => {
    loadProducts(() => {
      resolve();
    })
  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  })

  we use the method ".then()" to go to the next step, inside we give a function to run after we resolve.
  so basically promise split our code into two parts, first part waits for the function to get resolved and second part runs some function after it resolved.
  so first part waits and second part do some actions after the wait.
  promise helps to split our code into seperate steps, and we can wait to finish one step to finish before going to the next step.


promises are seperate line of code or its a seperate thread of code. when we wait for the "loadProducts()" to resolve and when we run all the next steps after all the promises it kinda works in the background or as a side work and the other sychronous codes will be running at the time. this bcoz promises has to wait to get
resolved, and no one knows when'll it get resolved, so this line of asychronous code will be keeped on the background or as a seperate thread of code and when it gets 
resolved this seperate thread of flowing will be keeped for it's next steps(".then()") to works, the original flow of asychronous code will be running at the time
but this will run as a sidework.
so these 2 groups or 2 flows of code are running at the same time, the reason promises are designed this way is bcoz it allows JS to do multple things at the same time.
*/

/* 
new Promise( (resolve) => {
  loadProducts(() => {
    resolve();
  })

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
why should we use promise instead of callback ?

  when using callback method, there'd be some situation where we've to wait for multiple asynchronous codes, so we're gonna have to use multiple callbacks,
  and multiple callbacks cause a lot of nesting. for eg:

  loadProducts(() => {
    loadCart(() => {
      loadOrders(() => {
        loadAccount(() => {
          loadHistory(() => {
            loadProducts(() => {
              renderOrderSummary();
              renderPaymentSummary();
            });
          });
        });
      });
    });
  });

  as you can see this all loading from backend and when we've multiple callbacks it becomes more and more nested and it's hard to read and 
  understand and it have more index.
  
  promises solve this problem by letting us flatten our code by spliting the code into each steps. lets work with an eg but with promise:


  new promise((resolve) => {
    loadProducts(() => {
      resolve();
    });  

  }).then(() => {
    return new promise((resolve) => {
      loadCart(() => {
        resolve();  
      });
    })

  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();  
  });


  so promise lets us have many steps as we want. and even though it requires a bunch of setup code it keeps our code relatevely flat and so
  easy to read and understand, the code doesn't become more and more nested. 
  And promise is the preffered way to handle asynchronous code instead of callbacks.

*/

/*
promise has two more features:
  1) we can give resolve a value as an argument. for eg:

  new promise((resolve) => {
    loadProducts(() => {
      resolve('value1');    whatever we give resolve it'll be saved in parameter "value" of .then(), so basically we can share the value b/w the steps.
    });  

  }).then((value) => {
    return new promise((resolve) => {
      loadCart(() => {
        resolve();  
      });
    })

  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();  
  });


  2) we can run multiple promises at the same time.
  currently we wait for things to load one at a time, for eg:

  new promise((resolve) => {          first we wait for the "loadProducts()" to resolve, if it's finished then only we go to next promises.
    loadProducts(() => {
      resolve();
    });  

  }).then(() => {
    return new promise((resolve) => {
      loadCart(() => {
        resolve();  
      });
    })

  }).then(() => {
    renderOrderSummary();
    renderPaymentSummary();  
  });

  so as you can see we wait for each promises to load one by one, but what if we can load every promises at one time, it'll be more efficient.
  for that we use "Promise.all()", it lets us run multiple promises at the same time and wait for all of them to finish. lets replace the og code at line 55-63 by adding an extra promise:
  
  Promise.all([
  // inside this array we can give multiple promises to wait for.
  
    new promise((resolve) => {
      loadProducts(() => {
        resolve('value1');
      });  
    }),
    
    new promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    })

  ]).then((values) => {
    renderOrderSummary();
    renderPaymentSummary(); 
  });

  so we basically created an array of promises and then we gonna give this array to Promise.all(), and its gonna wait for all the promises to finish before going to
  the next step.
  also the values we give to resolve() as an argument is saved in the parameter "values" of then as an array.
*/

// Promise.all([
//   loadProductsFetch()

//   ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary(); 
// });



/*
Async Await:
  its even better way to handle asynchronous code.
  currently we are using promise to handle asynchronous code, but the problem with that it creates lot of extra code for eg: we've to create 
  a new promise then inner function then resolving it and we need to use ".then()". 
  Async Await is a shortcut for promises. it doesn't need any extra code.
  "async" makes a function to return a promise, so basically all the code we write inside the function will automatically wraps in a promise.
  
  async function loadPage() {
    console.log('load page');
  }

  this above code is a shortcut for below code:
  
  function loadPage() {
  return new Promise((resolve) => {
    console.log('load page');
    resolve();
  });


  when we return a value it'll be saved on the parameter of next .then(), and we can access down below. 

  async function loadPage() {
  console.log('load page');
  return 'value2';
  }

  loadPage().then((value) => {
    console.log('next step');
    console.log(value);
  });
  }




  now you might be wondering what's the point of this feature ? i mean it reduces the code, but what else ?
  the reason we use "async" it lets us use the second feature called "await".
  await lets us wait for a promise to finish, before going to the next line. lets do an eg with an asynchronous code, lets pick "loadProductsFetch()":

  async function loadPage() {
    console.log('load page');

  loadProductsFetch().then(() => {
    
  });

  }

  loadPage().then(() => {
    console.log('next step');
  });


  so "loadProductsFetch()" loads products from the backend, and usually this returns a promise, so one way to wait for this to finish use .then(), so it'll run the 
  inner function after the "loadProductsFetch()" is finished.
  
  now "await" gives us another way to wait for this promise to finish.
  instead of using .then(), at the front of the "loadProductsFetch()" write "await".

  async function loadPage() {
    console.log('load page');

    await loadProductsFetch();
  }

  loadPage().then(() => {
    console.log('next step');
  });


  "await" basically lets us write asynchronous code like normal code or sychronous code. now it'll wait for "loadProductsFetch()" to finish and it'll get the respond 
  back from the backend before going to the next line. so we dont have to write any .then(), we just've to write like a normal code line by line.



  async function loadPage() {
    console.log('load page');

    await loadProductsFetch();

    return 'value2';
  }

  this above code is a shortcut to the below code respectively:

  function loadPage() {

    return new Promise((resolve) => {
      console.log('load page');
      resolve();

    }).then(() => {
    return loadProductsFetch();

    }).then(() => {
      return  new Promise ((resolve) => {
        resolve('value2');  
      });
    });
  }



  and this makes our code a lot easier to read. its a shortcut for promises.
  await can be only used inside async function.
  also the closest function has to be async, means:

  async function outerFunction() {
    console.log('hello');

    function innerFunction() {
      await loadProductsFetch();
    }
  }

  you cant use await on innerFunction which hasn't declared as async function.

  so when we work with asynchronous code a best practice is to use async await over promises and callbacks.
*/

async function loadPage() {
  // to handle errors in async await we'll put all promise codes into "try{}" and if any error occurs it'll be catched on the "catch()" and we can write code to handle it.
  // the "error" parameter in "catch()" contains info about the error.
  try{
    await loadProductsFetch();
  
  } catch (error) {
    console.log('Unexpected error. Please try again later');
    console.log(error);
  }

  renderOrderSummary();
  renderPaymentSummary(); 
}

loadPage();

headerCartQuantity();

/*
more details about try/catch:

1) we can manually create errors, to do that we use "throw" + a value inside "try". eg:
  try{
    throw 'error';
    await loadProductsFetch();
  
  } catch (error) {
    console.log('Unexpected error. Please try again later');
    console.log(error);
  }

now it'll skip the rest of the code inside the "try" and goes straight to "catch"



2) to throw an error in the future inside promise we use a 2nd param called reject() :
  
  return new promise((resolve, reject) => {
      loadCart(() => {
        reject('error3');
        // resolve();  
      });
  })


3) we can also use try/catch with normal code or sychronous code to catch errors. its available on outside async await.
*/