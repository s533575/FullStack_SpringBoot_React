import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import LoginComponent from './LoginComponent';
import ListTodosComponet from './ListTodosComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import LogOutComponent from './LogOutComponent';
import WelcomePage from './WelcomePage';
import ErrorComponent from './ErrorComponent';
import TodoComponent from './TodosComponent';

class TodoApp extends Component {
    state = {  }
    render() { 
        return (  
            <div className="TodoApp">
            <Router>
                <>
                <HeaderComponent/>
                <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/login" component={LoginComponent}/>
                <AuthenticatedRoute path="/welcome/:name" component={WelcomePage}/>
                <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                <AuthenticatedRoute path="/todos" component={ListTodosComponet}/>
                <AuthenticatedRoute path="/logout" component={LogOutComponent}/>
                <Route component={ErrorComponent}/>
                </Switch>
                <FooterComponent/>
                </>
            </Router>
            </div>
        );
    }
}


export default TodoApp;