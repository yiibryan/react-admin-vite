import React from 'react';
import {Route, Navigate} from 'react-router-dom';

//使用时: <AuthRoute path="" component={...} />
const AuthRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => {
      let isLoggedIn = localStorage.getItem('token');
      // let isLoggedIn = useSelector((state) => !!state.auth.token)
      if (isLoggedIn) {
        return <Component  {...props}/>
      } else {
        //  {{pathname: '/login', state: {from: props.location}}}
        return <Navigate to={'/login'} replace={true}/>
      }
    }}>
    </Route>
  )
}

export default AuthRoute;
