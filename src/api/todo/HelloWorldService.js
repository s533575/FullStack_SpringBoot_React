import axios from "axios"

class HelloWorldService{
executeHelloWorldService(){
    //console.log("This is Hello World Service")
    return axios.get('http://localhost:8080/hello-world')
}

executeHelloWorldBeanService(){
    //console.log("This is Hello World Service")
    return axios.get('http://localhost:8080/hello-world-bean')
    
}

executeHelloWorldPathVariableService(name){
    return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`
    )
    
}
}

export default new HelloWorldService()