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

    this.queueButton = this.queueButton.bind(this);
    this.importOption = this.importOption.bind(this);
    this.emptyQueue = this.emptyQueue.bind(this);
    this.emptyMusicQueueButton = this.emptyMusicQueueButton.bind(this);
    this.homeLink = this.homeLink.bind(this);
    this.logoLink = this.logoLink.bind(this);
    this.musicQueueDisabled = this.musicQueueDisabled.bind(this);
    this.videoQueueDisabled = this.videoQueueDisabled.bind(this);
  }

  musicQueueDisabled() {
    if (this.props.musicQueue.length === 0) {
      return Styles.disabled;
    } else {
      return;
    }
  }

  videoQueueDisabled() {
    if (this.props.videoQueue.length === 0) {
      return Styles.disabled;
    } else {
      return;
    }
  }

  emptyQueue(queueType) {
    this.props.emptyQueue(queueType);
  }

  emptyMusicQueueButton() {
    if (this.props.musicQueue.length === 0 || location.pathname === '/testing-music') {
      return;
    }

    return <button id={Styles.deleteButton} onClick={() => this.emptyQueue('musicQueue')}>Empty Queue</button>;
  }

  emptyVideoQueueButton() {
    if (this.props.videoQueue.length === 0 || location.pathname === '/testing-video') {
      return;
    }

    return <button id={Styles.deleteButton} onClick={() => this.emptyQueue('videoQueue')}>Empty Queue</button>;
  }

  queueButton() {
    if (this.props.vimeoUser === true) {
      return (
        <div id={Styles.queueContainer}>
          { this.emptyMusicQueueButton() }
          <Link to="/testing-music" className={this.musicQueueDisabled()} id={Styles.queueButton}>
             Music Queue
             <span style={{marginLeft: '20px', color: 'gold'}}>{this.props.musicQueue.length}</span>
           </Link>
        </div>
      );
    } else {
      return (
        <div id={Styles.queueContainer}>
          { this.emptyVideoQueueButton() }
          <Link to="/testing-video" className={this.videoQueueDisabled()} id={Styles.queueButton}>
             Video Queue
             <span style={{marginLeft: '20px', color: 'gold'}}>{this.props.videoQueue.length}</span>
           </Link>
        </div>
      )
    }
  }

  importOption() {
    if (this.props.vimeoUser === true) {
      return <Link to="/">Import Latest Videos</Link>
    } else {
      return <Link to="/">Import Latest Music</Link>
    }
  }

  homeLink() {
    if (this.props.vimeoUser) {
      return <Link to="/">Home</Link>;
    } else {
      return <Link to="/video-feed">Home</Link>;
    }
  }

  logoLink() {
    if (this.props.vimeoUser) {
      return <h1 id={Styles.logo}><Link to="/">AV</Link></h1>
    } else {
      return  <h1 id={Styles.logo}><Link to="/video-feed">AV</Link></h1>;
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
              { this.logoLink() }
            </div>
            <div className={classnames(Styles.hideSmall, 'col', 'm8', 'offset-m3')}>
              <ul id={Styles.navList}>
                { this.homeLink() }
                <Link to="/">Notifications</Link>
                <Link to="/">Browse Music</Link>
                <Link to="/video-feed">Browse Videos</Link>
                { this.importOption() }
              </ul>
            </div>
          </div>
          <div id={Styles.modalContainer}>
            <SignOutModal
              vimeoUser={this.props.vimeoUser}
              userInfo={this.props.userInfo}
              authUser={this.props.authUser}
              userInfo={this.props.userInfo}
            />
          </div>
          <div id={Styles.queueContainer}>
            { this.emptyMusicQueueButton() }
            { this.queueButton() }
          </div>
        </div>
      </div>
    );
  }
}
