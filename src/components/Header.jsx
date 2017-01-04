import React from 'react';
import Styles from './css/header';
import classnames from 'classnames';
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
    this.emptyQueue =this.emptyQueue.bind(this);
  }

  disabled() {
    if (this.props.musicQueue.length === 0) {
      return Styles.disabled;
    } else {
      return;
    }
  }

  emptyQueue() {
    console.log('here');
    this.props.emptyQueue();
  }

  header() {
    if (this.props.vimeoUser) {
      return (
        <div id={Styles.queueContainer}>
          <button id={Styles.deleteButton} onClick={this.emptyQueue}>Empty Queue</button>
          <Link to="/testing-music" className={this.disabled()} id={Styles.queueButton}>
             Music Queue
             <span style={{marginLeft: '20px', color: 'gold'}}>{this.props.musicQueue.length}</span>
           </Link>
        </div>
      );
    } else {
      return <button id={Styles.queueButton}>Video Queue</button>
    }
  }

  render() {
    if (this.props.userInfo.length === 0) {
      return false;
    }

    return (
      <div>
        <div id={Styles.navbar}>
          <div className="row">
            <div className="col s1">
              <h1 id={Styles.logo}><Link to="/music-feed">AV</Link></h1>
            </div>
            <div className={classnames(Styles.hideSmall, 'col', 'm8', 'offset-m3')}>
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
          { this.header() }
        </div>
      </div>
    );
  }
}
