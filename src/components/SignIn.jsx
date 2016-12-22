import React from 'react';
import Notifications, {notify} from 'react-notify-toast';
import classnames from 'classnames';
import Styles from './css/login';
import axios from 'axios';
import { Link, Match } from 'react-router';
import SideBanner from './SideBanner';
import VimeoSignIn from './VimeoSignIn';
import SCSignIn from './SCSignIn';


export default class SignIn extends React.Component {
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

            <div className={classnames('col', 's12', 'center-align', Styles.buttonContainer)}>
              <div className={Styles.button7}>
                <div className={Styles.eff7}></div>
                  <Link to="/signin/vimeo">Vimeo Producers</Link>
              </div>
            </div>
            <div className={classnames('col', 's12', 'center-align', Styles.buttonContainer)}>
              <div className={Styles.button7}>
                <div className={Styles.eff7}></div>
                  <Link to="/signin/sc">SoundCloud Producers</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
