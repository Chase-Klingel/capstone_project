import React from 'react';
import { Link } from 'react-router';
import Notifications, { notify } from 'react-notify-toast';
import axios from 'axios';
import Styles from './css/startExploringButton';

export default class StartExploringButton extends React.Component {
  constructor(props) {
    super(props);
    this.postVideos = this.postVideos.bind(this)
    this.postSongs = this.postSongs.bind(this);
    this.startExploring = this.startExploring.bind(this);
  }

  postVideos(e) {
    e.preventDefault();

    if (this.props.signupInfo[0].photoUrl === '') {
      return notify.show('Please add a profile photo', 'error');
      return;
    } else if (this.props.signupInfo[0].bio === '') {
      return notify.show('Please add a bio', 'error');
    }

    const videosNeedingMusic = this.props.uploads.filter((video) => {
      return (video.mood && video.needsMusic === true);
    });

    window.location.href = '/music-feed';

    axios.post('/api/videos/bulk', {
      videoList: videosNeedingMusic
    })
  }

  postSongs(e) {
    e.preventDefault();

    if (this.props.signupInfo[0].photoUrl === '') {
      return notify.show('Please add a profile photo', 'error');
    } else if (this.props.signupInfo[0].bio === '') {
      return notify.show('Please add a bio', 'error');
    }

    const songsWithMoods = this.props.uploads.filter((song) => {
      return song.mood;
    });

    window.location.href = '/video-feed';

    axios.post('/api/music/bulk', {
      songList: songsWithMoods
    })
    .catch((err) => {
      return err;
    })
  }

  startExploring() {
    if (this.props.vimeoUser) {
      return (
        <a className={Styles.btn} onClick={this.postVideos}>
          <span className={Styles.btnInr}>
            <span className={Styles.txtA}>Start Exploring</span>
            <span className={Styles.txtB}>Start Exploring</span>
          </span>
        </a>
      );
    } else {
      return (
        <a className={Styles.btn} onClick={this.postSongs}>
          <span className={Styles.btnInr}>
            <span className={Styles.txtA}>Start Exploring</span>
            <span className={Styles.txtB}>Start Exploring</span>
          </span>
        </a>
      );
    }
  }

  render() {
    return (
      <div className="center-align" id="button-container">
        { this.startExploring() }
      </div>
    )
  }
}
