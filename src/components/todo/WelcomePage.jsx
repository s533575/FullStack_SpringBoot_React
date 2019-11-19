import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js';

class WelcomePage extends Component{
    state={
    welcomeMessage : ''
    }
    render(){
        return(
            <>
            <h1>Welcome!</h1>
        <div className="container">
            welcome {this.props.match.params.name}.
            You can manage your Rides <Link to="/todos">here</Link>
        </div>

        <div className="container">
            Click Here to get customized text
            <button onClick={this.retrieveWelcomeMessage} className = "btn btn-success">Get Welcome</button>
        </div>
        
        <div className="container">
        {this.state.welcomeMessage}
        </div>

        </>
        )
    }   
    
    retrieveWelcomeMessage = () => {
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleErrorResponse(error))
    }

    handleSuccessfulResponse = (response) => {
        this.setState({
            welcomeMessage:response.data.message
        })
    }

    handleErrorResponse = (error) => {
        let errorMessage = '';
        if(error.message){
        errorMessage += error.message
        }
        if(error.response && error.response.data){
        errorMessage += error.response.data.message
        }
        this.setState({welcomeMessage:errorMessage})
    }
}

export default WelcomePage