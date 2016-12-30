import React from 'react';
import Styles from './css/header';
import axios from 'axios';
import { Link } from 'react-router';
import SignOutModal from './SignOutModal';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.vimeoUser === true) {
      axios.get('/api/vimeo-user')
        .then((res) => {
          const userInfo = [res.data];
          this.props.getUserInfo(userInfo);
        })
        .catch((err) => {
          return err;
        })
    } else {
      axios.get('/api/sc-user')
        .then((res) => {
          const userInfo = [res.data];
          this.props.getUserInfo(userInfo);
        })
        .catch((err) => {
          return err;
        })
    }

    this.header = this.header.bind(this);
  }

  header() {
    if (this.props.vimeoUser) {
      return (
        <div>
          <div id={Styles.navbar}>
            <div className="row">
              <div className="col s1">
                <h1 id={Styles.logo}><Link to="/">AV</Link></h1>
              </div>
              <div className="col s8 offset-s3">
                <ul id={Styles.navList}>
                  <Link to="/music-feed">Home</Link>
                  <Link to="/">Notifications</Link>
                  <Link to="/music-feed">Browse Music</Link>
                  <Link to="/video-feed">Browse Videos</Link>
                  <Link to="/">Import Latest Videos</Link>
                </ul>
              </div>
            </div>
            <div id={Styles.modalContainer}>
              <SignOutModal
                vimeoUser={this.props.vimeoUser}
                userInfo={this.props.userInfo}
                authUser={this.props.authUser}
                signupInfo={this.props.signupInfo}
              />
            </div>
            <button id={Styles.queueButton}>Music Queue</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div id={Styles.navbar}>
            <div className="row">
              <div className="col s1">
                <h1 id={Styles.logo}><Link to="/">AV</Link></h1>
              </div>
              <div className="col s8 offset-s3">
                <ul id={Styles.navList}>
                  <Link to="/video-feed">Home</Link>
                  <Link to="/">Notifications</Link>
                  <Link to="/music-feed">Browse Music</Link>
                  <Link to="/video-feed">Browse Videos</Link>
                  <Link to="/" id={Styles.last}>Import Latest Music</Link>
                </ul>
              </div>
              <div id={Styles.modalContainer}>
                <SignOutModal
                  scUser={this.props.scUser}
                  userInfo={this.props.userInfo}
                  authUser={this.props.authUser}
                  signupInfo={this.props.signupInfo}
                />
              </div>
            </div>
            <button id={Styles.queueButton}>Video Queue</button>
          </div>
        </div>
      );
    }
  }
  render() {
    if (this.props.userInfo.length === 0) {
      return false;
    }

    return (
      <div>
        { this.header() }
      </div>
    );
  }
}
