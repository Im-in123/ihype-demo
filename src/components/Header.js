import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { store } from "../stateManagement/store";
import { logout } from "../customs/authController";


const Header = (props) => {
    const {
        state: { userDetail },
      } = useContext(store);
    const [closedown, setClosedown] = useState(true)
    
    
    return (
        <nav className="Header">
            <div className="Logo">
                <img src="/images/iHype3.bmp" alt="u wish u were here"/>
            </div>
            <div className="NavMenuSmall">
                
<div className="container">
  <div className="tutorial">
    <ul>
     <Link to="/">
        
<li><img src="/images/home-icon.svg" alt=".." />Home</li></Link> 
     
      <li onClick={() => setClosedown(!closedown)}><img src="/images/expand.svg" />Menu 
      {/* <i className="fa fa-angle-down"></i> */}
      {closedown ?
     ""
      :
      <ul>
      <Link to="/search"><li>Search<img className="img1" src="/images/search_black.svg"/></li></Link>
      <Link to="/movies">  <li>Movies </li></Link>
      <Link to="/series"><li>Series</li></Link> 
      <Link to="/watchlist"><li>Watchlist</li></Link> 

    </ul>
      }
        
      </li>
    
    </ul>
   
  </div>
</div>
{/* <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'/>
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/> */}
            </div>

            <div className="NavMenu">
                <div className="diva">
                    <img src="/images/home-icon.svg" alt=".." />
                    <Link to="/"><span>HOME</span></Link> 
                </div>
                <div className="diva">
                    <img src="/images/search-icon.svg" alt=".." />
                    <Link to="/search"><span>SEARCH</span></Link> 
                </div>
                <div className="diva">
                    <img src="/images/watchlist-icon.svg" alt=".." />
                    <Link to="/watchlist"><span>WATCHLIST</span></Link> 
                </div>
                {/* <div className="diva">
                    <img src="/images/original-icon.svg" alt=".." />
                    <span>ORIGINALS</span>
                </div> */}
                <div className="diva">
                    <img src="/images/movie-icon.svg" alt=".." />
                    <Link to="/movies"><span>MOVIES</span></Link> 
                </div>
                <div className="diva">
                    <img src="/images/series-icon.svg" alt=".." />
                    <Link to="/series"><span>SERIES</span></Link> 
                 </div>
            </div>
            <div className="LoginSignup">

            {
         userDetail? (
            //    <a href="#"> <p>OPTIONS</p></a>
            //    <a href="#"> <p onClick={() => logout(props)}>OPTIONS</p></a>
            <div className="Bigmenu">
<div class="menu">
    <input type="checkbox" id="check"/>
    <label for="check" class="buttona">
        <span></span>
        <span></span>
        <span></span>
    </label>
    <div className="nava">
        {/* <a href="#">Profile</a> */}
        <Link to="/profile-update">Profile</Link>
        <Link to="/settings">Settings</Link>
        <a href="#" onClick={() => logout(props)}>Logout</a>
    </div>
</div>	



            </div>

          ) :(
        
        
                 <Link to="/login" ><p>LOGIN </p></Link>
          )}

               
         
            </div>
        </nav>
    )
}

export default Header;