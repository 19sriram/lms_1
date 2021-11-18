
/**
 * Authentication component
 * Login
 * Logout
 */
 import { jwtDecoder } from "../common/axios";

class Auth  {
    constructor() {
        this.authenticated = false;
    }
    login(cb) {
        this.authenticated = true;
        jwtDecoder(localStorage.getItem('accessToken'));
      sessionStorage.setItem('token', JSON.stringify({...jwtDecoder(localStorage.getItem('accessToken'))}));
      sessionStorage.setItem('email',JSON.parse(sessionStorage.token).email);
      sessionStorage.setItem('username',JSON.parse(sessionStorage.token).firstname);
        cb()
    }
    logout(cb) {
        
        this.authenticated = false;
        sessionStorage.clear();
        localStorage.clear();
        cb()
    }
    isAuthenticated () {
            console.log(this.authenticated)
        return this.authenticated
    }
}
export default new Auth();