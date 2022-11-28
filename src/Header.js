import React from 'react';
import './Header.css';

export default class Header extends React.Component {

    render() {

        return (
            <div className="outer_main">
                
                    <div className="row">
                        <div className="col-sm-3">
                        <img alt="logo" className="img-fluid tlogo" src={require('./pictures/annalect_logo.webp')}/>
                           
                        </div>

                        <div className="col-sm-6">
                      <h3 className="header-name"><b>Annalect India Asset Management</b></h3>
                        </div>

                        <div className="col-sm-3">
                      
                        <img alt="logo" className="img-fluid clogo" src={require('./pictures/Omnicom_Group_Logo.webp')}/>
                        </div>
    
                        
                    </div>
            
            </div>
        )
    }
}