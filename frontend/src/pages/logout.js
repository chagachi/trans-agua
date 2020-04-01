import React, { Component } from 'react'

export default class Logout extends Component {

  componentWillMount() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('adm')
    this.props.history.push('/')
  }

  render() {
    return null
  }
}