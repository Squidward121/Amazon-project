creating frontend according to MVC(Model-View-Controller):

 create the design first with HTML and CSS, then work with JS.
 When working with JS first:   
  1) save the datas to a file
  2) Generate the HTML from JS according to the saved data
  3) Make it interactive with JS

 If you want to update anything or any values on the page:
  1) first update the data where it is saved
  2) then Regenerate all the HTML code inside JS(making every code inside a function related to generating HTML is the best idea,
   so you can call the function anywhere a updating needs, it'll regenerate the HTML code according to the saved data.)



MVC is a popular technique used by many frameworks and developers.
In MVC we split our code into 3 parts:-
  1) Model = this is where we saves and manages the data. In our project all the code inside the data folder is called the Model.

  2) View = this takes the data and displays it on the page. In our project in "amazon.js" we take the datas from the "products.js" and displays it by generating the HTML.

  3) Controller = this runs some code when we interact with the page. In our project all the event-listeners would be the controller, coz it do something when we interact with page/view.

  so basically we divide our code into model, view and controller, and they interact with each other like trinity and they loop through each other.  
  first we use the Model to generate the View, 
  then when we interact with the View it'll run the Controller,
  then the Controller will update the Model,
  and finally we use the updated Model to Re-generate the View.

  so that's how MVC works, instead of updating the page directly with DOM, we just update the data and Re-generate all the HTML.
  So we use MVC, coz doing this it makes sure the page always matches the saved data.
  so MVC is known as a design pattern, it's a way to organize and design our code.
  Many JS frameworks works based on MVC.
