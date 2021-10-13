import axios from "../common/axios";

const headers =  {
  'token':localStorage.getItem('accessToken')
}
const headerParams = {
  'token':localStorage.getItem('accessToken')
};
// get all users
export async function _getLeads() {
    try {
      const response = await axios.get("user/viewlead",{
          headers: {
            'token':localStorage.getItem('accessToken')
          }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // handle user activation / deactivation

  export async function _handleUseractivation(userEmail: string, isActive:boolean) {
    try {
      const response = await axios.post("user/updateactivestatus", {
        "email": userEmail,
        "isActive": Boolean(isActive)
    }, {
        
      headers: {
        token: localStorage.getItem('accessToken')
      }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }


  // gets all roles for add new users

  

  export async function _getRoles() {
    try {
      const response = await axios.get("user/viewrole",{
          headers: {
            'token':localStorage.getItem('accessToken')
          }
      });
      
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  
  // add new user
export async function _addLead(leadInfo:any) {
  try {
    const response = await axios.post("user/addlead",leadInfo,{
       
       headers: {
        'token':localStorage.getItem('accessToken')
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// delete user
export async function _deleteUser(userInfo:any) {
  try {
    const response = await axios.post("user/deleteuser",userInfo,{
       headers: {
        'token':localStorage.getItem('accessToken')
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
