/* 
"XMLHttpRequest()" is a built-in class for requesting. it creates a new HTTP message to send to the backend.
message is also known as request
*/
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

//setuping the request:
xhr.open('GET', 'https://supersimplebackend.dev');    // this part setups the request.
/*
1st parameter is the type of HTTP message or the method of the requesting. there are several methods of requesting:
  1)GET - get some information from the backend.
  2)POST - create something (to send to backend and to recieve from the backend)
  3)PUT - Update something
  4)DELETE - delete something

2nd parameter is about where to send this HTTP message/request. so using HTTP we can send messages to any computer that's connected to the internet. to locate another computer we use a URL, we give the URL as string to the 2nd parameter.
*/

xhr.send();   // this part sends the request to the backend machine across the internet.

/*
after sending the request the backend will send a response to our computer, there'll be one response for one request, this is called request-response cycle.
So to get the response and to use it in our program we use the method ".response":
  xhr.response;

but there's a slight problem, when we send a request to the backend it takes time to travel across the internet and response to come back.
so the response will not available right away, so the response will be undefined at first, coz "xhr.send();" is an Asynchronous code, it means
it doesn't wait to finish the action of the line of code, it just immeadiatly goes to the next line, so without the request reaches there and without getting the response back if it goes to the next line immeadiatly, there's no response to get so it'll be undefined.
so we've to wait until the response comes back.
to wait we are using a technique before setuping of the request.

  xhr.addEventListener('load', () => {
    const response = xhr.response;
  });

'load' means the response has loaded. so we will listen for or wait for response to get loaded. so whenever the response comes we will store
the response and use it. so the timing issue for response to come back is solved, the response might come in the future, the assigned function
will only works when the response comes.
*/

/*
we can send different requests to the backend using URL paths. a URL path is the part that comes after the domain in the URL address.
eg:
  https://supersimplebackend.dev/hello          /hello is the URL path in here.
  https://supersimplebackend.dev/products/first       /products/first is the URL path in here.
  https://supersimplebackend.dev          if there's no URL path, "/" is the URL path in here, it's a default setting.

  Each URL path will give us a different responses.
*/


/*
status code:
  whenever we get a response from the backend there'll be always a status code which represent succession status of the request/response.
  a status code which starts with 4 or 5(400,404,500) is failed.
  starting with 4 means it's our problem, we could be set request to a URL that's not supported.
  starting with 5 means it's backend's problem, eg: backend is crashed.
  starting with 2(200,201,204) = succeeded. 
*/

/*
the URL paths of the backend is called API of that backend.
the backend can respond with different types of data:
  1) string or plain text
  2) JSON(using this we can send js objects to the backend across the internet)
  3) HTML
  4) image
*/