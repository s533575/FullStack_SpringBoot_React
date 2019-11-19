import TodoService from '../../api/todo/TodoDataService';
import React, { Component } from 'react';
import AuthenticatioService from './AuthenticationService.js';
import moment from 'moment';

class ListTodosComponet extends Component{
    state = {
        todos:[],
        message: null
    }

    componentDidMount(){
    this.refreshTodos();
    }

    refreshTodos = () =>{
        let userName = AuthenticatioService.getLoggedInUserName()
        TodoService.retrieveAllodos(userName)
        .then(
            response => {
                this.setState({todos:response.data})
            }
        )
    }
    
    deleteTodoClicked = (id,description) =>{
        let userName = AuthenticatioService.getLoggedInUserName()
        TodoService.deleteTodo(userName,id)
        .then(
            response => {
                this.setState({message:`The ride with ${description} is successfully deleted`})
                this.refreshTodos();
            }
        )
    }

    addTodoClicked = () =>{
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked = (id) =>{
        this.props.history.push(`/todos/${id}`)
    }

    render(){
        return(
        // <div>Welcome {this.props.match.params.name}</div>
        <div>
            <h1>RIDES LIST</h1>
            {this.state.message && <div className = "alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>description</th>
                        <th>Target Date</th>
                        <th>is Completed?</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.state.todos.map(todo => 
                    <tr key={todo.id}>
                        <td>{todo.description}</td>
                        <td>{todo.done.toString()}</td>
                        <td>{moment(todo.targetDate.toString()).format('YYYY-MM-DD')}</td>
                        <td><button className = "btn btn-success" onClick = {() => this.updateTodoClicked(todo.id)}>Update</button></td>
                        <td><button className = "btn btn-warning" onClick = {() => this.deleteTodoClicked(todo.id,todo.description)}>Delete</button></td>
                    </tr>
                    )
                    }
                </tbody>
            </table>
            <div className = "row">
            <button className = "btn btn-success" onClick = {this.addTodoClicked}>Add</button>
            </div>
            </div>
        </div>
        )
    }
}

export default ListTodosComponet