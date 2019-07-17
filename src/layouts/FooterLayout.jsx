import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FooterLayout extends Component {
  render () {
    return (
      <footer className='footer'>
        <div className='content'>
          <p className='content__norm'>Ant Design Admin ©2019 zuiidea</p>
        </div>
      </footer>
    )
  }
}

FooterLayout.propTypes = {
  title: PropTypes.string
}

export default FooterLayout
