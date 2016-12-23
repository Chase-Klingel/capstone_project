import React from 'react';
import axios from 'axios';
import Styles from './css/login';
import { Link } from 'react-router';
import Notifications, {notify} from 'react-notify-toast';
import SideBanner from './SideBanner';

export default class SCSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  signIn(event) {
    event.preventDefault();

    axios.post('/api/token', {
      email: this.refs['email'].value,
      password: this.refs['password'].value
    })
    .then(res => {
      notify.show('Signed In!', 'success')
      this.props.authUser(true, 'sc-user').bind(this);
    })
    .catch(err => {
      notify.show('Incorrect username or password', 'error')
    });
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

            <div>
              <input type="text" ref="email" placeholder="email" autoFocus />
              <input type="password" ref="password" placeholder="password" />
            </div>
            <div className="center-align" id={Styles.authButtonContainer}>
              <button id={Styles.authButton} type="button" onClick={this.signIn}>sign in</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
