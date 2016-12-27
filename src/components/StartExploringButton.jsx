import React from 'react';
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

    axios.post('/api/videos/bulk', {
      videoList: videosNeedingMusic
    })
    .then(() => {
      window.location.href = '/profile';
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

    axios.post('/api/music/bulk', {
      songList: songsWithMoods
    })
    .then(() => {
      window.location.href = '/profile';
    })
  }

  startExploring() {
    if (this.props.vimeoUser) {
      return (
        <div>
          <button onClick={this.postVideos}>Start Exploring</button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={this.postSongs}>Start Exploring</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        { this.startExploring() }
      </div>
    )
  }
}
