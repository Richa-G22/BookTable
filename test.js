  //npx sequelize model:generate --name Restaurant --attributes 
  //restaurantType:String,ownerId:Integer,address:String,city:String,state:String,
  //country:String,zipCode:Integer,phone:String,name:string,
  //description:string,cuisines:string,locationMapUrl:String,dayClosed:String,
  //hoursOfOperation:String,avgMealPrice:String,parkingAvailability:String,
  //paymentOption:String,dressCode:String,executiveChef:String,menuUrl:String;


  //npx sequelize model:generate --name Review --attributes
  //restaurantId:integer,userId:integer,review:string,stars:integer;


  //npx sequelize model:generate --name ReviewImage --attributes
  //reviewId:Integer,reviewUrl:String;


  //npx sequelize model:generate --name RestaurantImage --attributes
  //restaurantId:integer,restaurantUrl:String; 


  //npx sequelize model:generate --name MenuDish --attributes
  //restaurantId:integer,dishCategory:String,dishName:String,dishIngredients:String,dishPrice:decimal,
  //dishCalories:integer,dishAllergies:String; 


  //npx sequelize model:generate --name Holiday --attributes
  //restaurantId:integer,occasion:String; 


  //npx sequelize model:generate --name Booking --attributes 
  //restaurantId:integer,userId:integer,slotId:integer,bookingDate:date;


  //npx sequelize model:generate --name Slot --attributes
  //restaurantId:integer,slotStartTime:time,slotDuration:integer,tableCapacity:integer,tableNum:integer;









   
  
    

  .profile-dropdown {
    position: absolute;
    
  }
  
  .hidden {
    display: none;
  }
  
  .logo-div {
    display: flex;
    align-items: center;
    padding-left: 120px;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    color:white;
    font-size: 25px;
    font-weight: bolder;
  
  }
  
  .nav-header {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 2px solid rgb(230, 224, 224);
    text-decoration: none;
    background-color: black;
  }
  
  .nav-footer {
    position: fixed;
    bottom: 0;
    overflow: hidden;
    z-index: 10;
    background-color: black;
    width: 100%;
    height: 40px;
    
  }
  
  .profile-menu-button{
    display: flex;
    border-radius: 15px;
    width: 65px;
    height: 30px;
    align-items: center;
    justify-content: center;
  }
  
  .create-new-album{
    color: rgb(35, 35, 124);
    font-size: 20px;
  }
  
  .bottom-menu{
    display: flex;
    border-bottom: 2px solid rgb(211, 208, 208);
    /* height: 40px; */
    height: 2.5em;
    align-items:center;
    padding-bottom: 2px;
    box-sizing: border-box;
  }
  
  .menu{
    display: flex;
    color: white;
  }
  
  .logout-button {
    border: 1px solid black;
    border-radius: 50px;
    font-size: 14px;
    margin: 5px 0;
    background-color: rgb(102, 100, 100);
    cursor: pointer;
    color: white;
    padding: 7px;
  }
  
  .nav-image {
    border-top: black 2px;
    display: flex;
    height: 300px;
    width: 100%
  }
  
  .nav-background-image {
    background-image: url("https://photofocus.com/photography/five-tips-to-photograph-cityscape-panoramas/attachment/killing-softly/");
    border-top: black 2px;
    display: flex;
    height: 300px;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  
  .footer-text {
    color: rgb(223, 220, 220);
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 12px;
    font-family: serif;
  }
  
  .container {
    display: flex;
    align-items: last baseline;
    justify-content: center;
    padding-bottom: 20px;
    padding-left: 45%;
  }
  
  .nav-links {
    text-decoration: none;
    padding-top: 2px;
    color: black;
  }