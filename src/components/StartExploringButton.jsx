import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Styles from './css/startExploringButton';

export default class StartExploringButton extends React.Component {
  constructor(props) {
    super(props);

    this.postUserInfo = this.postUserInfo.bind(this);
  }

  postUserInfo() {
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

  render() {
    return (
      <div>
        <button onClick={this.postUserInfo}>Start Exploring</button>
      </div>
    )
  }
}
