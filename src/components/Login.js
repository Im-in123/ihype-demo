import React, { useState, useEffect } from "react";
import "./login.css";
import { LOGIN_URL } from "../urls";
import { checkAuthState, tokenName } from "../customs/authController";
import { axiosHandler, errorHandler } from "../helper";
import { Link } from "react-router-dom";
import visibility from "../assets/visibility.svg";
import visibility_off from "../assets/visibility_off.svg"


export const loginRequest = async (data, setError, props) => {
    console.log(data,"dataaaaaaa")
    const result = await axiosHandler({
      method: "post",
      url: LOGIN_URL,
      data: data,
    }).catch((e) => setError(errorHandler(e)));
    if (result) {
      console.log(result, "resuuuuuuuuuuuult")
      console.log(result.data, "resultdatttaaaaa")
      localStorage.setItem(tokenName, JSON.stringify(result.data));
      
      props.history.push("/");
    }
  };


const Login= (props) => {
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [checking, setChecking] = useState(localStorage.getItem(tokenName));

  useEffect(() => {
    if (checking) {
      checkAuthState(
        () => null,
        () => props.history.push("/"),
        props
      );
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(loginData,"login dataaaaaaa")
    await loginRequest(loginData, setError, props);
    setLoading(false);
  };

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };


    return (
      <body>
      <form method="POST" onSubmit={onSubmit} className="Mainone" 
      // style={{ 
      //   backgroundImage: `url(${process.env.PUBLIC_URL + '/images/'})` ,
      //   backgroundRepeat: 'no-repeat',
      //   backgroundSize:'100vw 100vh',
      //   width:'100vw',
      //   height:'100vh',
      //               }}
                    >


         <div className="login-wrap">
  
	<div className="login-html">

    <div className="errorHolder">
    {error && (
        <div >
          <div className="errordiv" dangerouslySetInnerHTML={{ __html: error }} />
          <img src="/images/close_white.svg" alt = "X" onClick={() => setError(null)} />
        </div>
    )}
     </div>

		<input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label htmlFor="tab-1" className="tab"><Link to="/login">Login</Link></label>
		<input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab"><Link to="/signup">Sign Up</Link></label> 

		<div className="login-form">
			<div className="sign-in-htm">
				<div className="group">
					<label htmlFor="user" className="label">Username</label>
					<input id="user" type="text" className="input" name="username"  onChange={onChange} value={loginData.username} required/>
				</div>
				<div className="group">
					<label htmlFor="pass" className="label">Password</label>
					<input id="pass" className="input" data-type="password" name="password" onChange={onChange} value={loginData.password} required
          type={!showPassword ? "password" : "text"}
          />
          <p id="showshide"><img
                      src={!showPassword ? visibility : visibility_off}
                      onClick={() => setShowPassword(!showPassword)}
                   alt="show/hide password" /></p><br></br>
				</div>
				<div className="group">
					<input id="check" type="checkbox" name="check" className="check" onChange={onChange}/>
					<label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
				</div>
				<div className="group">
					<input type="submit" className="button" value={loading ? 
            "Logging In"
           : "Login"
        }
                    
                    />
				</div>
                {loading ? 
            <center>
              <p id="loaderlogin"></p>
            </center>
           : ""
        }
				<div className="hr"></div>
				<div className="foot-lnk">
        <Link to="/forgot-password">Forgot password?</Link>          
				</div>
			</div>
		
		</div>
       
	</div>
</div>
</form>
</body>
    )
}

export default Login;