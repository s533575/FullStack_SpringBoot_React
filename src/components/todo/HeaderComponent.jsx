import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';
import {withRouter} from 'react-router';
import "./HeaderComponent.css";

class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn)
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a className="navbar-brand">myApplication</a></div>
                    {/* <div className ="app-name">ONLINE CAR POOLING SYSTEM</div> */}
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li ><Link  className="nav-link" to="/welcome/test">Home</Link></li>}
                        {isUserLoggedIn && <li ><Link  className="nav-link" to="/todos">Ride List</Link></li>}
                        {isUserLoggedIn && <li ><Link  className="nav-link" to="/todos/-1">Add New Ride</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link  className="nav-link" to="/login">Login</Link></li>}
                       {isUserLoggedIn && <li><Link  className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
    }

    export default withRouter(HeaderComponent);