import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Styles from './css/startExploringButton';

export default class StartExploringButton extends React.Component {
  constructor(props) {
    super(props);
    this.postVideos = this.postVideos.bind(this)
    this.postSongs = this.postSongs.bind(this);
    this.startExploring = this.startExploring.bind(this);
  }

  postVideos() {
    const videosNeedingMusic = this.props.uploads.filter((video) => {
      console.log(video.mood, ' video mood and ', video.needsMusic, ' needs music');
      // return (video.mood && video.needsMusic === true);
    });

    console.log(videosNeedingMusic);

    axios.post('/api/videos/bulk', {
      videoList: videosNeedingMusic
    })
    .then(() => {
      window.location.href = '/profile';
    })
  }

  postSongs() {
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
