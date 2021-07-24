import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { PROFILE_URL } from '../urls';
import { store } from "../stateManagement/store";
import { axiosHandler, getToken } from "../helper";
import "./settings.css";
import {userDetailAction} from "../stateManagement/actions";

const Settings = (props) => {

    return(
        <div className="SettingsMain">




            <div class="holder">
			<table width="100%">
				<tr>
					<td>     
                               <Link to="/change-password">Change password</Link>
                    </td>
					
				</tr>
				<tr>
					<td>      
                              <Link to="/forgot-password">Forgot password</Link>
                    </td>
					
				</tr>
			
			</table>
		</div>

        
        </div>
    )

}
export default Settings;