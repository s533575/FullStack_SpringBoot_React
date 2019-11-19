import React, { Component } from 'react';
import './Counter.css'

class CounterButton extends Component {
  
    render() { 
        return (
            <div className = "counter">
                <button onClick = {() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick = {() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            </div>
          );
    }
    
}


class Counter extends Component{
    state = {
        counter:0
    }

    increment = (by) =>{
        this.setState({
            counter:this.state.counter + by
        });
    }

    decrement = (by) =>{
        this.setState({
            counter:this.state.counter - by
        });
    }

    reset = () =>{
        this.setState({
            counter:0
        });
    }
    render(){
        return (
            <div className = "App">
    Counter Application Demo
    <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
    <CounterButton by={5}  incrementMethod={this.increment} decrementMethod={this.decrement}/>
    <CounterButton by={10}  incrementMethod={this.increment} decrementMethod={this.decrement}/>
    <span className = "count">{this.state.counter}</span>
    <div><button className = "reset" onClick={this.reset}>Reset</button></div>
  </div> 
        );
    }
}
 
export default Counter;
