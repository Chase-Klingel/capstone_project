import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Play extends Component {

  render() {
    return (
      <svg style={{border: '1px solid gold', borderRadius: '50%', marginTop: '15px'}} fill="white" height="56" viewBox="0 0 24 24" width="56" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5v14l11-7z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    );
  }
}
