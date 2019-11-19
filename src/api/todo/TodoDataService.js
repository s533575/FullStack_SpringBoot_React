import axios from "axios"

class TodoDataSerice{
    retrieveAllodos(name){
        //console.log("This is Hello World Service")
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }

    retrieveTodo(name,id){
        //console.log("This is Hello World Service")
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    deleteTodo(name,id){
        //console.log("This is Hello World Service")
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    updateTodo(name,id,todo){
        //console.log("This is Hello World Service")
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`,todo);
    }

    createTodo(name,todo){
        //console.log("This is Hello World Service")
        return axios.post(`http://localhost:8080/users/${name}/todos`,todo);
    }

}

export default new TodoDataSerice()