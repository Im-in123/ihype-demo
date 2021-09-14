import React, { useState, useContext, useEffect } from "react";
import { PROFILE_URL } from '../urls';
import { store } from "../stateManagement/store";
import { axiosHandler, getToken } from "../helper";
import "./userProfileUpdate.css";
import {userDetailAction} from "../stateManagement/actions";


const UserProfileUpdate =(props)=>{
    const {state:{userDetail}, dispatch} = useContext(store)
    const [profileData, setProfileData] = useState({
        ...userDetail,
        user_id: userDetail.user.id,
        is_verified:true
      });

    useEffect(() =>{
      
      if(!userDetail.user.is_verified){
        window.location.href = "/verify";
      }
   
    }, [])
      
    const submit = async (e) => {
        e.preventDefault();
        const token = await getToken();
        console.log("Profile data:::", profileData)
        // console.log("idcheck", userDetail.user.id)
        const url =
          PROFILE_URL +
          `${userDetail.first_name ? `/${userDetail.id}` : ""}`;
        console.log("url::::", url)
        const method = userDetail.first_name ? "patch" : "post";
        console.log("method:::::",method)
        const profile = await axiosHandler({
          method,
          url,
          data: profileData,
          token,
        }).catch((e) => {
          console.log("res:::", e)
          alert(e)
        });
        if (profile) {
            console.log("profile data:::",profile.data)
          dispatch({ type: userDetailAction, payload: profile.data });
          alert("Updated successfully!")
        }
      };

      const onChange = (e) => {
        setProfileData({
          ...profileData,
          [e.target.name]: e.target.value,
        });
      };
    

    return(
        <div className="ProfileMain">
 <div class="container1">
<form method="POST" onSubmit={submit} >
<h1 class="title">Modify your profile</h1>
<div class="form-group a">
        <label for="name">Username</label>
        <input id="name" type="text"
       value={userDetail.user.username +"    [NB:username cannot be modified!]"} 
        disabled/>
    </div>
<div class="grid">

    
    <div class="form-group a">
        <label for="name">Name</label>
        <input id="name" type="text"
        value={profileData.name}
        name="name"
        onChange={onChange}
        required = {true}
        />
    </div>

    <div class="form-group b">
        <label for="first-name">First name</label>
        <input id="first-name" type="text"
        value={profileData.first_name}
        name="first_name"
        onChange={onChange}
        required = {true}
        />
    </div>

    {/* <div class="form-group email-group">
        <label for="email">Email</label>
        <input id="email" type="text"/>
    </div> */}

    <div class="form-group phone-group">
        <label for="phone">Telephone (mobile)</label>
        <input id="phone" type="text"
        value={profileData.phone_number}
        name="phone_number"
        onChange={onChange}
        required = {true}
        />

    </div>

    <div class="textarea-group">
        <label for="bio">Bio</label>
        <textarea id="bio"
        value={profileData.bio}
        name="bio"
        onChange={onChange}
        required = {true}
        ></textarea>
    </div>

    {/* <div class="form-group">
        <label for="address">Adress</label>
        <input id="address" type="text"/>
    </div> */}

    <div class="form-group">
        <label for="city">City</label>
        <input id="city" type="text"
        value={profileData.city}
        name="city"
        onChange={onChange}
        required = {true}
        />
    </div>

    {/* <div class="form-group">
        <label for="zip">Code postal</label>
        <input id="zip" type="text"/>
    </div> */}
</div>

<div class="checkboxes">

    <div class="checkbox-group">
        <input id="newsletter" type="checkbox"/>
        <label for="newsletter">Do you wanna recieve updates</label>
    </div>

   

</div>

<div class="button-container">
    <button class="button" type="submit" >Save modifications</button>
</div>
</form>
</div>      

  </div>
    )
}
export default UserProfileUpdate;