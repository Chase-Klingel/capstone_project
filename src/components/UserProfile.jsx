import React from 'react';
import axios from 'axios';
import Styles from './css/header';
import { Link } from 'react-router';
import classnames from 'classnames';
import ProfileBanner from './ProfileBanner';
import ProfileWidgetList from './ProfileWidgetList';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.signupHeader = this.signupHeader.bind(this);
  }
  componentDidMount() {
    // need to have if clause to handle if it is a vimeo or sc profile
    if (this.props.scProfile === true) {
      console.log('getting sc content');
      axios.get(`/api/music/${this.props.userId}`)
        .then((res) => {
          this.props.getProfileContent(res.data);
        })
        .catch((err) => {
          return err;
        })
    } else {
      console.log('getting vimeo profile content');
      axios.get(`/api/videos/${this.props.userId}`)
        .then((res) => {
          this.props.getProfileContent(res.data);
        })
        .catch((err) => {
          return err;
        })
    }
  }

  signupHeader() {
    if (this.props.loggedIn) {
      return;
    }

    return (
      <div id={Styles.navbar}>
        <div className="row">
          <div className="col s1">
            <h1 id={Styles.logo}><Link to="/">AV</Link></h1>
          </div>
          <div className={classnames(Styles.hideSmall, 'col', 'm8', 'offset-m3')}>
            <ul id={Styles.navList}>
              <Link to="/">Home</Link>
              <Link to="/">Browse Music</Link>
              <Link to="/video-feed">Browse Videos</Link>
            </ul>
          </div>
          <div className="row">
            <div className={Styles.signInButtonContainer}>
              <Link to="/signup">sign in</Link>
            </div>
            <span id={Styles.slash}>/</span>
            <div className={Styles.signUpButtonContainer}>
              <Link to="/signup">sign up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.profileContent.length === 0) {
      return false;
    }

    return (
      <div>
        { this.signupHeader() }
        <ProfileBanner
          userInfo={this.props.userInfo}
          profileContent={this.props.profileContent}
        />
        <div className="row" style={{marginBottom: '200px'}}>
          <ProfileWidgetList
            userId={this.props.userId}
            scProfile={this.props.scProfile}
            vimeoProfile={this.props.vimeoProfile}
            vimeoUser={this.props.vimeoUser}
            scUser={this.props.scUser}
            profileContent={this.props.profileContent}
            userInfo={this.props.userInfo}
          />
        </div>
      </div>
    );
  }
}
