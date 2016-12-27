import React from 'react';
import Styles from './css/login';
import VimeoImg from '../img/vimeo.png';
import axios from 'axios';
import { Link } from 'react-router'
import SideBanner from './SideBanner';
export default class VimeoSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    window.location.href = '/auth/vimeo';
    this.props.authUser(true, 'vimeo-user');
  }

  render() {
    return (
      <div className="row">
        <SideBanner />

        <div id={Styles.authContainer}>
          <div id={Styles.haveAccount}>
            <p>Don't have an account?</p>
            <Link id={Styles.signinButton} to="/signup">Sign Up</Link>
          </div>

          <div className="row">
            <p id={Styles.authTitle} className="center-align">Sign In</p>

            <div className="col s12 center-align" id={Styles.vimeoButtonContainer}>
              <img src={VimeoImg} id={Styles.vimeoImg} />
              <a onClick={this.signIn}>sign in with vimeo</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
