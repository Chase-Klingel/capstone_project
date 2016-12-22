import React from 'react';
import { Link, Match } from 'react-router';
import Styles from './css/login';
import SideBanner from './SideBanner';
import VimeoSignUp from './VimeoSignUp';
import classnames from 'classnames';

export default class SignUp extends React.Component {
  render() {
    return (
      <div className="row">
        <SideBanner />
        <div id={Styles.authContainer}>
          <div id={Styles.haveAccount}>
            <p>Already have an account?</p>
            <Link id={Styles.signinButton} to="/signin">Sign In</Link>
          </div>

          <p id={Styles.authTitle} className="center-align">Create an account</p>
          <div className={classnames('col', 's12', 'center-align', Styles.buttonContainer)}>
            <div className={Styles.button7}>
              <div className={Styles.eff7}></div>
                <Link to="/signup/vimeo">I make videos on vimeo</Link>
            </div>
          </div>
          <div className={classnames('col', 's12', 'center-align', Styles.buttonContainer)}>
            <div className={Styles.button7}>
              <div className={Styles.eff7}></div>
                <Link to="/signup/sc">I make music on soundcloud</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
