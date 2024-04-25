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
      navigate("/restaurants/");   //RG - to fix logging in on same screen
    }
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
      <div className="login-div">
        <i className="fa-solid fa-utensils" style={{ color: "rgb(141,4,4)", fontSize: "2em" }}></i>

        <h1>Log in to BookTable </h1>
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
              <a style={{color:"rgb(141,4,4)"}} href="#" className="demo-user-link" onClick={handleDemoLogin}>
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
