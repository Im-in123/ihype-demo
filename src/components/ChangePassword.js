import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CHANGE_PASSWORD_URL } from '../urls';
import { store } from "../stateManagement/store";
import { axiosHandler, getToken } from "../helper";
import "./changePassword.css";
import {userDetailAction} from "../stateManagement/actions";

const ChangePassword = (props) => {
    const [passdata, setPassData] = useState("")
    const [fetching, setFetching] = useState(false)
    const [sh, setSh] = useState(true)




    const submit = async (e) => {
        e.preventDefault();
        setFetching(true)
        if(passdata.password === passdata.confirmPassword){
        const token = await getToken();
        console.log("pass data:::", passdata)
        const url = CHANGE_PASSWORD_URL;
        const method =  "post";
        const res = await axiosHandler({
          method,
          url,
          data: passdata,
          token,
        }).catch((e) => {
            alert(e.response.data.error)
            console.log(e.response.data.error)
        });
        if (res) {
            console.log("res data:::", res.data)
            alert(res.data.success)
        //   alert("Password Updated successfully!")
        }
      }else{
          alert("Passwords dont match!")
      }
      setFetching(false)
    };

      const onChange = (e) => {
        setPassData({
          ...passdata,
          [e.target.name]: e.target.value,
        });
      };

      const showpassword = (e) =>{
          console.log("show password")
        let vv = document.querySelectorAll('.vv')
        let shide  = document.getElementById("shide")
        if(sh){
            vv.forEach(function (el){
                el.type  = "text"
            })
            shide.innerText="hide password"
            setSh(false)
        }else{
            vv.forEach(function (el){
                el.type  = "password"
            })
            shide.innerText="show password"
            setSh(true)
        }
        
      }

    return(
        <div className="ChangePasswordMain">
            <div class="mainDiv">
  <div class="cardStyle">
    <form method="POST" onSubmit={submit}  name="signupForm" id="signupForm">
      
      <img src="" id="signupLogo"/>
      
      <h2 class="formTitle">
        Change Password
      </h2>
      
    <div class="inputDiv">
      <label class="inputLabel" for="currentPassword">Current Password</label>
      <input className="vv" type="password" id="currentPassword" name="currentPassword" 
      onChange={onChange}
      value={passdata.currentPassword}
      required/>
    </div>
    <div class="inputDiv">
      <label class="inputLabel" for="password">New Password</label>
      <input className="vv" type="password" id="password" name="password" 
      onChange={onChange}
      value={passdata.password}
      required
      />
    </div>
    <div class="inputDiv">
      <label class="inputLabel" for="confirmPassword">Confirm New Password</label>
      <input className="vv" type="password" id="confirmPassword" name="confirmPassword"
      onChange={onChange}
      value={passdata.confirmPassword}
     required
      />
    </div>
    <div className="inputDiv">
    <p id="shide" style={{color:"red", fontSize:"11px", float:"right"}} onClick={()=>showpassword()}>show password</p>

    </div>
    <div class="buttonWrapper">
      <button type="submit" id="submitButton" class="submitButton pure-button pure-button-primary">
          {fetching? (
        <span id="loader"></span>

          ):(
            <span>Continue</span>

          )}

      </button>
    </div>
      
  </form>
  </div>
</div>
        </div>
    )

}
export default ChangePassword;