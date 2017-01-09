import React from 'react';
import Styles from './css/login';
import VimeoImg from '../img/vimeo.png';
import { Link, Match } from 'react-router';
import SideBanner from './SideBanner';

export default class VimeoSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepTwo: false
    }

    this.signup = this.signup.bind(this);
    this.stepTwo = this.stepTwo.bind(this);
    this.signupSection = this.signupSection.bind(this);
  }

  signup() {
    window.location.href = '/auth/vimeo';
    this.props.authUser(true, 'vimeo-user');
  }

  stepTwo() {
    this.setState({ stepTwo: true });
  }

  signupSection() {
    if (!this.state.stepTwo) {
      return (
        <div className="row">
          <p id={Styles.authTitle} className="center-align">Create an account</p>
          <p style={{color: 'lightgrey'}}>The idea behind AudioVisual is to make finding free music for your next video incredibly easy. SoundCloud users voluntarily put their music up for free. You are then able to search through their music, add the one's you like to your music queue, and finally test out each song while your video plays in order to see if the mood feels right.</p>
          <p style={{color: 'lightgrey'}}>Once signed up, AudioVisual imports all of your private videos and you can choose a mood that fits the video best and whether or not that video needs music. Only the videos needing music will show up on AudioVisual. It is important that you watch the video below and follow the instructions to set up your account properly.</p>
          <iframe src="https://player.vimeo.com/video/198598717?portrait=0&byline=0" width="100%" height="300"></iframe>
          <div className="center-align">
            <button className={Styles.step2} onClick={this.stepTwo}>Step 2</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <p id={Styles.authTitle} className="center-align">Create an account</p>
          <div className="col s12 center-align" id={Styles.vimeoButtonContainer}>
            <img src={VimeoImg} id={Styles.vimeoImg} />
            <a id={Styles.vimeoButton} onClick={this.signup}>sign up with vimeo</a>
          </div>
        </div>
      );
    }
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
          { this.signupSection() }
        </div>
      </div>
    );
  }
}
