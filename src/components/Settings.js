import { Link } from "react-router-dom";
import React from "react";
import "./settings.css";

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