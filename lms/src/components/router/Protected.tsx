import {Redirect, Route} from 'react-router-dom'
import auth from '../common/auth'

export const Protected =({component: Component, ...rest})=>{
    return (
        <Route {...rest}
        render={
            (props)=> {
                if(auth.isAuthenticated()) {
                    let propss = {...props,role:JSON.parse(sessionStorage.getItem('token')||'').role}
                    
                    return <Component {...propss}/>
                } else {
                   return <Redirect to={{pathname: '/'}}/>
                }
                
            }
        }/>
    )
}

export default Protected;