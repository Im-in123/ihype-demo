import { Link } from "react-router-dom";
import React, { useState, useContext,  } from "react";
import { FORGOT_PASSWORD_URL } from '../urls';
import { store } from "../stateManagement/store";
import { axiosHandler, getToken } from "../helper";
import "./forgotPassword.css";



const ForgotPassword =()=>{
  const {state:{userDetail}, dispatch} = useContext(store)

    const [fdata, setFdata] = useState("")
    const [fetching, setFetching] = useState(false)
  

    const onChange = (e) => {
        setFdata({
          ...fdata,
          [e.target.name]: e.target.value,
        });
      };

    const submit = async (e) => {
        e.preventDefault();
        setFetching(true)
        // const token = await getToken();
        console.log("fdata:::", fdata)
        const url = FORGOT_PASSWORD_URL;
        const method =  "post";
        const res = await axiosHandler({
          method,
          url,
          data: fdata,
        }).catch((e) => {
            alert(e.response.data.error)
            console.log(e.response.data.error)
        });
        if (res) {
            console.log("res data:::", res.data)
            alert(res.data.success)
            let conti = document.getElementById("conti")
            conti.innerHTML = "Request has been sent, click the link your email address to continue!!"
            conti.style.color ="red"
        }
    }

return(
    <div className = "ForgotMain">

        <div class="container-center">
    <center>
    {/* <img  /> */}
      </center>
  <h2>Don't Worry!</h2>
  <form className="formf" method="POST" onSubmit={submit}>
    <h5 className=".h44" id="conti" >
      Just provide your email<br/> 
      and we can do the rest
    </h5>
    <formgroup>
      <input type="email" name="email"
      value={fdata.email}
      onChange={onChange}
      required = {true}
      />
      <label for="email"><br/>Email</label>
      <span>enter your email</span>
    </formgroup>
    
  
    <button id="login-btn">Request reset</button>
    
  </form>
 
{userDetail ?(
 "" 
):(
  <p>Did you remember? <Link to="/login" >Login</Link></p> 
)}
</div>




    </div>

)

}
export default ForgotPassword;