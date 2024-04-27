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









   
  
    

  import { useState } from "react";
  import { NavLink, useNavigate } from "react-router-dom";
  import { thunkLogin } from "../../redux/session";
  import { useDispatch } from "react-redux";
  import { useModal } from "../../context/Modal";
  import "./LoginForm.css";
  
  
  function LoginFormModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const serverResponse = await dispatch(
        thunkLogin({
          email,
          password,
        })
        );
  
      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
        navigate("/photos/");   //RG - to fix logging in on same screen
      }
    };
  
    const handleDemoLogin = async (e) => {
    e.preventDefault();
    setEmail('demo@aa.io');
    setPassword('password');
      //RG - to automate login of Demo User
      const serverResponse = await dispatch(
        thunkLogin({
          email: 'demo@aa.io',
          password:'password'
        })
        );
  
      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
        navigate("/photos/");   
      }
      //RG - to automate login of Demo User
  };
  
    return (
      <>
        <div className="login-div">
          <i className="fa-brands fa-flickr"></i>
  
          <h1>Log in to Clickr </h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="div-login-label">
              <input
                className="login-input"
                placeholder="Email address"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            {errors.email && <p className="error-message">{errors.email}</p>}
            <div className="div-login-label">
              <input
                className="login-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
  
            <button className="signIn-btn" type="submit">
              Sign In
            </button>
            <div className="demo-link">
              <p>
                <a href="#" className="demo-user-link" onClick={handleDemoLogin}>
                  Demo User
                </a>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }
  
  export default LoginFormModal;