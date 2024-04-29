import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

// function LoginFormModal() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const serverResponse = await dispatch(
//       thunkLogin({
//         email,
//         password,
//       })
//     );

//     if (serverResponse) {
//       setErrors(serverResponse);
//     } else {
//       closeModal();
//     }
//   };

//   return (
//     <>
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         {errors.email && <p>{errors.email}</p>}
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.password && <p>{errors.password}</p>}
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   );
// }

// function LoginFormModal() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const serverResponse = await dispatch(
  //     thunkLogin({
  //       email,
  //       password,
  //     })
  //     );

  //   if (serverResponse) {
  //     setErrors(serverResponse);
  //   } else {
  //     closeModal();
  //     navigate("/restaurants/");   //RG - to fix logging in on same screen
  //   }
  // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     return dispatch(thunkLogin({ email, password }))
      
//     if (serverResponse) {
//       setErrors({'email' : "The provided credentials were invalid"});
//     } else {
//       closeModal();
//       navigate("/restaurants/");   //RG - to fix logging in on same screen
//     }
//   };

//   const handleDemoLogin = async (e) => {
//   e.preventDefault();
//   setEmail('demo@user.io');
//   setPassword('password');
//     //RG - to automate login of Demo User
//     const serverResponse = await dispatch(
//       thunkLogin({
//         email: 'demo@user.io',
//         password:'password'
//       })
//       );

//     if (serverResponse) {
//       setErrors(serverResponse);
//     } else {
//       closeModal();
//       navigate("/restaurants/");   
//     }
//     //RG - to automate login of Demo User
// };

//   return (
//     <>
//       <div className="login-div">
//         <i className="fa-solid fa-utensils" style={{ color: "rgb(141,4,4)", fontSize: "2em" }}></i>

//         <h1>Log in to BookTable </h1>
//         {errors.email && (<p className='error'>{errors.email}</p>)}
//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="div-login-label">
//             <input
//               className="login-input"
//               placeholder="Email address"
//               type="text"
//               value={email}
//               // onChange={(e) => setEmail(e.target.value)}
//               onChange={(e) => {setErrors({}),setEmail(e.target.value)}}
//               required
//             />
//           </div>

//           {errors.email && <p className="error-message">{errors.email}</p>}
//           <div className="div-login-label">
//             <input
//               className="login-input"
//               placeholder="Password"
//               type="password"
//               value={password}
//               // onChange={(e) => setPassword(e.target.value)}
//               onChange={(e) => {setErrors({}),setPassword(e.target.value)}}
//               required
//             />
//           </div>
//           {errors.password && (
//             <p className="error-message">{errors.password}</p>
//           )}

//           <button className="signIn-btn" type="submit" disabled=
//                     {email.length <= 3 || password.length <= 5}>
//             Log In
//           </button>
//           <div className="demo-link">
//             <p>
//               <a style={{color:"rgb(141,4,4)"}} href="#" className="demo-user-link" onClick={handleDemoLogin}>
//                 Demo User
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default LoginFormModal;
function LoginFormModal() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(thunkLogin({ email, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log('......message...', data.message)
        console.log('......data.......',data)
        console.log('.....datatype of data.....', typeof(data))
        console.log('.....errors.....', errors)
        
        if (data) {
          console.log('......inside if loop....', data.message);
          //setErrors((errors) => ({ ...errors, ...data.message }));
          setErrors({'email' : "The provided credentials are invalid"});
        } 
        
      });
  };
  
    const handleDemoLogin = async (e) => {
  e.preventDefault();
  setEmail('demo@user.io');
  setPassword('password');
    //RG - to automate login of Demo User
    const serverResponse = await dispatch(
      thunkLogin({
        email: 'demo@user.io',
        password:'password'
      })
      );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/restaurants/");   
    }
    //RG - to automate login of Demo User
};
    
  

  return (
    <>
        <div style={{display:"flex", justifyContent:"center", alignContent:"center", paddingTop:"2em"}}>
            <i className="fa-solid fa-utensils" style={{ color: "rgb(141,4,4)", fontSize: "2em", paddingRight:"1em", marginTop:"0.75em"}}></i>
            <h1 className="log-in">Log In</h1>
        </div>

          <div className="login-input-fields-div">
          {errors.email && (<p className='error'>{errors.email}</p>)}
            <form onSubmit={handleSubmit}>
              <div>
                  <input className='form-input-fields'
                    type="text"
                    placeholder='Username or Email'
                    value={email}
                    onChange={(e) => {setErrors({}),setEmail(e.target.value)}}
                    required
                  />
              </div>
              <br></br>
                
              <div>
                  <input className='form-input-fields'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => {setErrors({}),setPassword(e.target.value)}}
                    required
                  /> 
              </div>
              <br></br>

              <div>
                    <button className="log-in-button" type="submit" disabled=
                    {email.length <= 3 || password.length <= 5}>Log In</button>
              </div>
              <br></br>

              <div>
                    <button
                      className="demo-user-button" type="submit"
                      onClick={handleDemoLogin}
                        // e.preventDefault();
                        // setCredential("Demo-lition"),
                        // setPassword("password")}}
                    >
                      Log in as Demo User
                    </button>
              </div>      
            </form>
          </div>    
    </>
  );
}

export default LoginFormModal;
