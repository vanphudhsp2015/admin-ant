import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
class MasterLoginLayout extends Component {
  render () {
    const childrenWidthProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {})
    )
    return (
      <div className='wrapper'>
        <div className='login'>
          <div className='overlay' />
          <div className='login__content'>
            <div className='login__header'>
              <div className='content text-center'>
                <h2 className='content__title'>Login to Continue</h2>
                <p className='content__norm'>
                  Welcome back, sign in with your Ant account
                </p>
                <div className='content__divider'>
                  <span className='divider'>OR</span>
                </div>
              </div>
            </div>
            {childrenWidthProps}
            <div className='login__footer'>
              <div className='content text-center'>
                <p className='content__norm'>
                  Don't have an account yet?{' '}
                  <Link
                    to={this.props.views === 'LOGIN' ? '/register' : '/login'}
                    className='link'
                  >
                    {this.props.views === 'LOGIN' ? 'Sign up' : 'Sign in'}
                  </Link>
                </p>
                <p className='content__norm'>
                  Forgot your username or password?{' '}
                  <Link to='/reset' className='link'>
                    Reset password
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MasterLoginLayout.propTypes = {
  views: PropTypes.string
}

export default MasterLoginLayout
