import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";
import "./LoginComponent.css";
import CAR from "../../images/car.png";
import WHEEL from "../../images/wheel.png";

class LoginComponent extends Component {
  state = {
    username: "test",
    password: "test",
    hasLoginFailed: false,
    showSuccessMessage: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  loginClicked = () => {
    // if (this.state.username === "test" && this.state.password === "test") {
    //   AuthenticationService.registerSuccessfulLogin(
    //     this.state.username,
    //     this.state.password
    //   );
    //   this.props.history.push(`/welcome/${this.state.username}`);
    //   // this.setState({
    //   //     showSuccessMessage:true
    //   // })
    //   // this.setState({
    //   //     hasLoginFailed:false
    //   // })
    // } else {
    //   this.setState({
    //     showSuccessMessage: false
    //   });
    //   this.setState({
    //     hasLoginFailed: true
    //   });
    // }

    // AuthenticationService.executeBasicAuthenticationService(this.state.username,this.state.password)
    // .then(() => {
    //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
    //     this.props.history.push(`/welcome/${this.state.username}`);
    //     }).catch(() => {
    //         this.setState({showSuccessMessage: false});
    //         this.setState({hasLoginFailed: true});
    //     })

    AuthenticationService.executeBasicAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then(response => {
        AuthenticationService.registerSuccessfulLogin(
          this.state.username,
          this.state.password
        );
        this.props.history.push(`/welcome/${this.state.username}`);
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  };

  render() {
    return (
      <div className="login-background1">
        {/* <div className="login-highway"></div>
        <div className="login-city"></div>
        <div className="login-car"><img src={CAR}></img></div>
        <div className="login-wheel">
        <img src={WHEEL} className = "back-wheel"></img>
        <img src={WHEEL} className = "front-wheel"></img>
        </div> */}
          <div className="container">
          <h1>Login</h1>
            {this.state.hasLoginFailed && (
              <div className="alert alert-warning">Invalid Credentials</div>
            )}
            <div className="textbox">
            <i class="fas fa-user"></i>
            {/* User Name:{" "} */}
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            </div>
            <div className="textbox">
            <i class="fas fa-user"></i>
            {/* Password:{" "} */}
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            </div>
            <button className="btn btn-success" onClick={this.loginClicked}>
              Login
            </button>
          </div>
      </div>
    );
  }
}

export default LoginComponent;
