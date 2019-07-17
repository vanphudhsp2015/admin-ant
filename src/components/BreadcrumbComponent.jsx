import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
class BreadcrumbComponent extends Component {
  render () {
    const { title, icon } = this.props
    return (
      <div className='bread'>
        <div className='block'>
          <div className='content'>
            <p className='content__norm'>
              <Icon type='dashboard' className='content__icon' />{' '}
              Dashboard&nbsp;/&nbsp; <Icon type={icon} /> {title}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

BreadcrumbComponent.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string
}

export default BreadcrumbComponent
