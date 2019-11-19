import React, { Component } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TodoDataService from "../../api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";

class TodoComponent extends Component {
  state = {
    id: this.props.match.params.id,
    description: "",
    targetDate: moment(new Date()).format("YYYY-MM-DD")
  };

  onSubmit = values => {
    let todo =  {
        id: this.state.id,
        description: values.description,
        targetDate: values.targetDate
      }
    if (this.state.id === -1) {
        let userName = AuthenticationService.getLoggedInUserName();
        TodoDataService.createTodo(userName,todo).then(() => this.props.history.push("/todos"));
    } else {
      let userName = AuthenticationService.getLoggedInUserName();
      TodoDataService.updateTodo(userName, this.state.id,todo).then(() => this.props.history.push("/todos"))
    }
  };

  refreshData(){
    this.setState({
      description: "",
      targetDate: moment(new Date()).format("YYYY-MM-DD")
    })
  }


  componentWillMount(){
    this.refreshData()
    this.componentDidMount()
  }

  componentDidMount() {
    this.refreshData()
    if (this.state.id === -1) {
      return;
    }

    let userName = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveTodo(userName, this.state.id).then(response =>
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD")
      })
    );
  }

  validate = values => {
    let error = {};
    if (!values.description) {
      error.description = "Enter a description";
    } else if (values.description.length < 5) {
      error.description = "Enter atleast 5 characters in the description";
    }
    if (!moment(values.targetDate).isValid()) {
      error.targetDate = "Enter a Valid Date";
    }
    return error;
  };

  render() {
    //let {description,targetDate} = this.state
    let description = this.state.description;
    let targetDate = this.state.targetDate;

    return (
      <div>
        <h1>RIDE DETAILS</h1>
        <div className="container">
          <Formik
            initialValues={{ description: description, targetDate: targetDate }}
            onSubmit={this.onSubmit}
            validateOnBlur={false}
            validateOnChange={true}
            validate={this.validate}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default TodoComponent;
