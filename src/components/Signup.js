import React, { useState, useContext, useEffect } from "react";
import "./login.css";
import { SIGNUP_URL } from "../urls";
import { loginRequest } from "./Login";
import { axiosHandler, errorHandler } from "../helper";
import { Link } from "react-router-dom";
import Loader from "../components/loader";


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
            <img src="/images/close.png" alt = "replace soon" onClick={() => setSignupError(null)} />
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
                      <input id="pass" type="password"  value={signupData.password} onChange={onChangeSignup}  className="input" data-type="password" name="password" required/>
                  </div>
                  <div className="group">
                      <label htmlFor="pass" className="label">Repeat Password</label>
                      <input id="pass" type="password"  name="password1" value={signupData.password1} onChange={onChangeSignup} className="input" data-type="password" required/>
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




{/* <form method="POST" onSubmit={onSubmit}>
  
  
<div className="login-wrap">


<div className="login-html">

<div className="errorHolder">
{error && (
<div >
 <div className="errordiv" dangerouslySetInnerHTML={{ __html: error }} />
 <img src="/images/close.png" alt = "replace soon" onClick={() => setError(null)} />
</div>
)}
</div>

<input id="tab-1" type="radio" name="tab" className="sign-in" /><label htmlFor="tab-1" className="tab"><Link to="/login">Sign In</Link></label>
<input id="tab-2" type="radio" name="tab" className="sign-up" checked /><label htmlFor="tab-2" className="tab"><Link to="/signup">Sign Up</Link></label> 

<div className="login-form">
   <div className="sign-in-htm">
       <div className="group">
           <label htmlFor="user" className="label">Username</label>
           <input id="user" type="text" className="input" name="username"  onChange={onChange} value={loginData.username} required/>
       </div>
       <div className="group">
           <label htmlFor="pass" className="label">Password</label>
           <input id="pass" type="password" className="input" data-type="password" name="password" onChange={onChange} value={loginData.password} required/>
       </div>
       <div className="group">
           <input id="check" type="checkbox" className="check" />
           <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
       </div>
       <div className="group">
           <input type="submit" className="button" value="Sign In"/>
       </div>
       <div className="hr"></div>
       <div className="foot-lnk">
           <a href="#forgot">Forgot Password?</a>
       </div>
   </div>
   <div className="sign-up-htm">
       <div className="group">
           <label htmlFor="user" className="label">Username</label>
           <input id="user" type="text" name="username1"   value={signupData.username1}  onChange={onChangeSignup} className="input"/> 
       </div>
       <div className="group">
           <label htmlFor="pass" className="label">Password</label>
           <input id="pass" type="password"  value={signupData.password1} onChange={onChangeSignup}  className="input" data-type="password" name="password1" />
       </div>
       <div className="group">
           <label htmlFor="pass" className="label">Repeat Password</label>
           <input id="pass" type="password"  name="password2" value={signupData.password2} onChange={onChangeSignup} className="input" data-type="password"/>
       </div>
       <div className="group">
           <label htmlFor="pass" className="label">Email Address</label>
           <input id="pass" type="text" name="email" value={signupData.email} onChange={onChangeSignup}  className="input"/>
       </div>
       <div className="group">
           <input type="submit" className="button" value="Sign Up"/>
       </div>
       <div className="hr"></div>
       <div className="foot-lnk">
           <label htmlFor="tab-1">Already Member?</label>
       </div>
   </div>
</div>

</div>
</div>
</form> */}