import React from 'react';
import Styles from './css/login';
import VimeoImg from '../img/vimeo.png';
import { Link, Match } from 'react-router';
import SideBanner from './SideBanner';


export default class VimeoSignUp extends React.Component {
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
  }

  signup() {
    window.location.href = '/auth/vimeo';
    this.props.authUser(true, 'vimeo-user');
  }

  render() {
    return (
      <div className="row">
        <SideBanner />
        <div id={Styles.authContainer}>
          <div id={Styles.haveAccount}>
            <p>Already have an account?</p>
            <Link id={Styles.signinButton} to="/signin">Sign In</Link>
          </div>


          <div className="row">
            <p id={Styles.authTitle} className="center-align">Create an account</p>
            <div className="col s12 center-align" id={Styles.vimeoButtonContainer}>
              <img src={VimeoImg} id={Styles.vimeoImg} />
              <a onClick={this.signup}>sign up with vimeo</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
