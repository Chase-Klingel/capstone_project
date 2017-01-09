import React from 'react';
import Styles from './css/login';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios';
import { Link } from 'react-router';
import SideBanner from './SideBanner';

export default class SCSignUp extends React.Component {
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
  }

  signup(event) {
    event.preventDefault();

    if (!this.refs['scUsername'].value) {
      notify.show('Username must not be blank.', 'error', 2000);
    }

    if (!this.refs['email'].value) {
      notify.show('Email must not be blank.', 'error', 2000);
    }

    if (this.refs['email'].value.indexOf('@') < 0) {
      notify.show('Invalid email.', 'error', 2000);
    }

    if (!this.refs['password'].value) {
      notify.show('Password must not be blank.', 'error', 2000);
    }

    if (this.refs['password'].value.length < 8) {
      notify.show('Password must be at least 8 characters long.', 'error', 2000);
    }

    axios.post('/api/user', {
      scUsername: this.refs['scUsername'].value,
      email: this.refs['email'].value,
      password: this.refs['password'].value
    })
    .then(res => {
      axios.post('/api/token', {
        email: this.refs['email'].value,
        password: this.refs['password'].value
      })
      .then(res => {
        notify.show('You are now signed up!', 'success');
        this.props.authUser(true, 'sc-user').bind(this);
      })
      .catch(err => {
        notify.show('something went wrong', 'error');
      });
    })
    .catch((err) => {
      notify.show('An error occurred while processing your info. Please try again.', 'error');
    });
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

          <p id={Styles.authTitle} className="center-align">Create an account</p>
          <p style={{color: 'lightgrey'}}>When you create an account with AudioVisual, all of your songs from SoundCloud will be imported. However, only the songs you specifically select will show up on our app. We want this to be a community that shares, but at the same time we want to protect your work.</p>
          <div>
            <input type="text" ref="scUsername" placeholder="soundcloud username" autoFocus/>
            <input type="email" ref="email" placeholder="email" />
            <input type="password" ref="password" placeholder="password" />
          </div>
          <div className="center-align" id={Styles.authButtonContainer}>
            <button id={Styles.authButton} type="button" onClick={this.signup}>sign up</button>
          </div>
        </div>
      </div>
    );
  }
}
