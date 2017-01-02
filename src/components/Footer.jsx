import React from 'react';
import Styles from './css/footer';

export default class Footer extends React.Component {
  render() {
    return (
      <footer style={{background: 'white'}}>
        <p className="center-align">© 2016 AudioVisual</p>
      </footer>
    );
  }
}
