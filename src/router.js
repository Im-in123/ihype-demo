import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login"
import Signup from "./components/Signup";
import Header from "./components/Header";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import SeriesDetail from "./components/SeriesDetail";
import Series from "./components/Series";
import Movies from "./components/Movies";
import Search from "./components/Search";
import Watchlist from "./components/Watchlist";
import Verify from "./components/Verify";
import UserProfileUpdate from "./components/UserprofileUpdate";
import Settings from "./components/Settings";
import AuthController from "./customs/authController";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";

const Router = (props) => {
  return (
    
    <BrowserRouter>
    <Header/>
      <Switch>
      
      <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/forgot-password" component={ForgotPassword} exact />


        <Route
          path="/"
          component={(props) => (
            <AuthController {...props}>
              <Route path="/" component={Home} exact />
              <Route path="/verify" component={Verify} exact />
              <Route path="/profile-update" component={UserProfileUpdate} exact />
              <Route path="/settings" component={Settings} exact />
              <Route path="/change-password" component={ChangePassword} exact />




              <Route path="/detail/Movie/:slug" component={MovieDetail} exact />
              <Route path="/detail/Series/:slug" component={SeriesDetail} exact />

              <Route path="/series" component={Series} exact />
              <Route path="/movies" component={Movies} exact />
              <Route path="/search" component={Search} exact />
              <Route path="/watchlist" component={Watchlist} exact />


          </AuthController>
          )}
        />


      </Switch>
    </BrowserRouter>
  );
};

export default Router;
