import React from 'react';
import { Link, Redirect } from 'react-router';
import Notifications, { notify } from 'react-notify-toast';
import axios from 'axios';
import Styles from './css/startExploringButton';

export default class StartExploringButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: ''
    }

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

    this.setState({ redirect: '/' });

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

    this.setState({ redirect: '/video-feed' });

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
          Start Exploring
        </a>
      );
    } else {
      return (
        <a className={Styles.btn} onClick={this.postSongs}>
          Start Exploring
        </a>
      );
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
    }
    return (
      <div className="center-align" id="button-container">
        { this.startExploring() }
      </div>
    )
  }
}
