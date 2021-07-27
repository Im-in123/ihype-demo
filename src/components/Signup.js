import React, { useState} from "react";
import "./login.css";
import { SIGNUP_URL } from "../urls";
import { loginRequest } from "./Login";
import { axiosHandler, errorHandler } from "../helper";
import { Link } from "react-router-dom";
import visibility from "../assets/visibility.svg";
import visibility_off from "../assets/visibility_off.svg"


const Signup = (props) =>{
    const [signupData, setSignupData] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [signupError, setSignupError] = useState();
  
    const onSubmitSignup = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSignupError(null);
      console.log(signupData.password, signupData.password1, "passsssswooords")
      if (signupData.password === signupData.password1){
        setLoading(true);
          const result = await axiosHandler({
          method: "post",
          url: SIGNUP_URL,
          data: signupData,
        }).catch((e) => {
        console.log("eerr::", e)
        setSignupError(errorHandler(e))});
     
    
        if (result) {
            console.log("result:::::, result")
            console.log("signupdata being passed to loginpage:::::::", signupData)
          await loginRequest(signupData, setSignupError, props);
        }
        setLoading(false);
  
       } else{
          setSignupError("The passwords don't match!");
          setLoading(false);
        } 
     
    };
  
    const onChangeSignup = (e) => {
      setSignupData({
        ...signupData,
        [e.target.name]: e.target.value,
      });
    };

  
    return (
        <form method="POST" onSubmit={onSubmitSignup}>
  
  
           <div className="login-wrap">
         
  
      <div className="login-html">
  
      <div className="errorHolder">
      {signupError && (
          <div >
            <div className="errordiv" dangerouslySetInnerHTML={{ __html: signupError }} />
            <img src="/images/close_white.svg" alt = "X" onClick={() => setSignupError(null)} />
          </div>
      )}
       </div>
  
          <input id="tab-1" type="radio" name="tab" className="sign-in" /><label htmlFor="tab-1" className="tab"><Link to="/login">Login</Link></label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" defaultChecked /><label htmlFor="tab-2" className="tab"><Link to="/signup">Signup</Link></label> 
  
          <div className="login-form">
             
              <div className="sign-up-htm">
                  <div className="group">
                      <label htmlFor="user" className="label">Username</label>
                      <input id="user" type="text" name="username"   value={signupData.username}  onChange={onChangeSignup} className="input" required/> 
                  </div>
                  <div className="group">
                      <label htmlFor="pass" className="label">Password</label>
                      <input id="pass"   value={signupData.password} onChange={onChangeSignup}  className="input" data-type="password" name="password" required
                     type={!showSignupPassword ? "password" : "text"}
                      />
                  </div>
                  <div className="group">
                      <label htmlFor="pass" className="label">Repeat Password</label>
                      <input id="pass"   name="password1" value={signupData.password1} onChange={onChangeSignup} className="input" data-type="password" 
                      type={!showSignupPassword ? "password" : "text"}
                      required
                      /> 
                      <p id="showshide"><img
                      src={!showSignupPassword ? visibility : visibility_off}
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                   alt="show/hide password" /></p><br></br>
                  </div>
                  <div className="group">
                      <label htmlFor="pass" className="label">Email Address</label>
                      <input id="pass" type="email" name="email" value={signupData.email} onChange={onChangeSignup}  className="input"  required/>
                  </div>
                 
                  <div className="group">
                      <input type="submit" className="button" value={loading ? 
                                "Signing up ..."
                            : "Signup"
                            }
                      />
                  </div>
                  {loading ? 
                  <div>
            <center>
            <p id="loader"></p>
            </center>
            </div>
           : ""
        }
                  <div className="hr"></div>
                  <div className="foot-lnk">
                      <label htmlFor="tab-1">Already Member?</label>
                  </div>
              </div>
          </div>
         
      </div>
  </div>
  </form>
      )
}

export default Signup;


