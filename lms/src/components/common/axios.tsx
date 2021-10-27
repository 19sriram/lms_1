import axios from "axios";
// const BASE_URL = 'https://ec2-18-142-44-179.ap-southeast-1.compute.amazonaws.com:3000/api'
const BASE_URL = 'http://18.140.59.213:3000/api/';
let assignedRole= '';
let decodedToken = {};

/**
 * Base url for application
 */
export default axios.create({
  baseURL: BASE_URL
});

// Decodes jwt value
export const jwtDecoder = (token: any)=>{
    try {
      let decodedValue = JSON.parse(atob(token.split('.')[1]));
      sessionStorage.setItem('token',decodedValue); 
      assignedRole = decodedValue.role;
      decodedToken = decodedValue;
      return decodedValue;
    } catch (e) {
      return null;
    }
}

// gets assigned role from token 
export const getAssignedRole =()=> assignedRole;

// gets decoded value from token 
export const getDecodedToken =()=> decodedToken;
