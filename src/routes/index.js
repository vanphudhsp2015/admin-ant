import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {
  UserPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  PostPage
} from '../pages'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      cookies.get('token') !== undefined ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
)
const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path='/users' exact component={UserPage} />
      <PrivateRoute path='/posts' exact component={PostPage} />
      <Route path='/login' exact component={LoginPage} />
      <Route path='/register' exact component={RegisterPage} />
      <Route path='/reset' exact component={ResetPasswordPage} />
      <Redirect from='*' to='/users' />
    </Switch>
  )
}
export default Routes
