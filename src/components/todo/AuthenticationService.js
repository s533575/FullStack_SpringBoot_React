import axios from "axios"

class AuthenticationService{

executeBasicAuthenticationService(username,password){
return axios.get('http://localhost:8080/basicauth',
{
    headers:{authorization:this.createBasicAuthToken(username,password)}
})
}

executeJwtAuthenticationService(username,password){
    return axios.post('http://localhost:8080/authenticate',{
        username,
        password
    })
}

createBasicAuthToken(username,password){
    return 'Basic ' + window.btoa(username + ":" + password)
}

createJwtToken(token){
    return 'Bearer ' + token
}

registerSuccessfulLogin(username,password){
    sessionStorage.setItem('authenticatedUser',username)
    this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
}

registerSuccessfulLoginForJwt(username,token){
    console.log(token);
    sessionStorage.setItem('authenticatedUser',username)
    this.setupAxiosInterceptors(this.createJwtToken(token))
}



logout(){
    sessionStorage.removeItem('authenticatedUser')
}

getLoggedInUserName(){
    let user = sessionStorage.getItem('authenticatedUser')
    if(user === null)
    {
        return ''
    }
    else{
        return user
    }
}

isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser')
    if(user === null)
    {
        return false
    }
    else{
        return true
    }
}

setupAxiosInterceptors(basicAuthHeader){
    axios.interceptors.request.use(
        (config) => {
            if(this.isUserLoggedIn()){
            config.headers.authorization = basicAuthHeader
            }
            return config
        }
    )
}
}

export default new AuthenticationService()