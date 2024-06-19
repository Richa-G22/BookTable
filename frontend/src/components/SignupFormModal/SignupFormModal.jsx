import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImg, setProfileImg] = useState("https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  let foundError = false;

  const validate = () => {
    foundError = false;
    setErrors({});
    
    if (!firstName.trim()) {
        foundError = true;
        setErrors((errors) => ({ ...errors, firstName: "First Name is required" }));
        // currErrors.push("First Name is required")
        // setErrors(currErrors);
        
    }

    if (!lastName.trim()) {
        foundError = true;
        setErrors((errors) => ({ ...errors, lastName: "Last Name is required" }));
        // currErrors.push("Last Name is required")
        // setErrors(currErrors);
        
    }

    if (!password.trim()) {
        foundError = true;
        setErrors((errors) => ({ ...errors, password: "Password is required" }));
        // currErrors.push("Password is required")
        // setErrors(currErrors);
        
    }

    if (!confirmPassword.trim()) {
        foundError = true;
        setErrors((errors) => ({ ...errors, confirmPassword: "Confirm Password is required" }));
        // currErrors.push("Confirm Password is required")
        // setErrors(currErrors);
        
    }

    if (!email.trim()) {
        foundError = true;
        setErrors((errors) => ({ ...errors, email: "Email is required" }));
        // currErrors.push("Email is required")
        // setErrors(currErrors);
        
    }

    if (!username.trim()) {
        foundError = true;
        setErrors((errors) => ({ ...errors, username: "Username is required" }));
        // currErrors.push("Username is required")
        // setErrors(currErrors);
        
    }

    if (password && password.length < 6) {
        foundError = true;
        setErrors((errors) => ({ ...errors, password: "Password should have atleast 6 characters" }));
        // currErrors.push("Password should have atleast 6 characters")
        // setErrors(currErrors);
        
    }

    if (confirmPassword !== password) {
        foundError = true;
        setErrors((errors) => ({ ...errors, confirmPassword: "Confirm Password field must be the same as the Password field" }));
        // currErrors.push("Password should have atleast 6 characters")
        // setErrors(currErrors);
        
    }

    if (username && username.length < 4) {
        foundError = true;
        setErrors((errors) => ({ ...errors, username: "Username should have atleast 4 characters" }));
        // currErrors.push("Username should have atleast 4 characters")
        // setErrors(currErrors);
       
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();

  //   if (password !== confirmPassword) {
  //     return setErrors({
  //       confirmPassword:
  //         "Confirm Password field must be the same as the Password field",
  //     });
  //   }

  //   const serverResponse = await dispatch(
  //     thunkSignup({
  //       email,
  //       username,
  //       firstName,
  //       lastName,
  //       password,
  //     })
  //   );

  //   if (serverResponse) {
  //     setErrors(serverResponse);
  //   } else {
  //     closeModal();
  //   }
  // };
  // if (!foundError && password === confirmPassword) {
  if (!foundError) {
    setErrors({});
    return dispatch(
      thunkSignup({
        email,
        username,
        firstName,
        lastName,
        password
      })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors({...data.errors });
        //  setErrors(data.errors);
        }
      });
  }
  // return setErrors({...errors,
  //   confirmPassword: "Confirm Password field must be the same as the Password field"
  // });
};

  return (
    <>
      {/* <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
  </form> */}
  <div style={{display:"flex", justifyContent:"center", alignContent:"center", paddingTop:"2em"}}>
  <i className="fa-solid fa-utensils" style={{ color: "rgb(141,4,4)", fontSize: "2em", paddingRight:"1em", marginTop:"0.75em"}}></i>
          <h1 className="sign-up">Sign Up</h1>
      </div>
    
      {errors.firstName && <p className="error" style={{paddingLeft:"3rem", paddingTop:"1rem"}}>{errors.firstName}</p>}
      {errors.lastName && <p className="error" style={{paddingLeft:"3rem", paddingTop:"1rem"}}>{errors.lastName}</p>}
      {errors.email && <p className="error" style={{paddingLeft:"3rem", paddingTop:"1rem"}}>{errors.email}</p>}
      {errors.username && <p className="error" style={{paddingLeft:"3rem", paddingTop:"1rem"}}>{errors.username}</p>}
      {errors.password && <p className="error" style={{paddingLeft:"3rem", paddingTop:"1rem"}}>{errors.password}</p>}
      {errors.confirmPassword && <p className="error" style={{paddingLeft:"3rem", paddingTop:"1rem"}}>{errors.confirmPassword}</p>}

      <div className='input-fields-div'>
      <form onSubmit={handleSubmit}>
        <div>
          <input className='input'
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          /> 
        </div>
        <br></br>

        <div>
          <input className='input'
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          /> 
        </div>
        <br></br>
        
        <div>
          <input className='input'
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> 
        </div>
        <br></br>

        <div>
          <input className='input'
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /> 
        </div>   
        <br></br> 
        
        <div>
          <input className='input'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> 
        </div>
        <br></br>

        <div>   
          <input className='input'
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          /> 
        </div> 

        {/* <div>   
          <input className='input'
            type="password"
            placeholder='Confirm Password'
            defaultValue={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
            required
          /> 
        </div>  */}
        <br></br> 
        
        {/* <button className="sign-up-button" type="submit" disabled={
          email.length === 0 || username.length < 4 ||
          firstName.length === 0 || lastName.length === 0 ||
          password.length < 6 || confirmPassword.length === 0
        }>Sign Up</button>  */}
        <button className="sign-up-button" type="submit">Sign Up</button> 
       
      </form>
      </div>
    </> 
  );
}

export default SignupFormModal;
