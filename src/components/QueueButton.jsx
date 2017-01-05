import React from 'react';
import Styles from './css/queueButton';
import QueueIcon from '../img/queue-button.png';

export default class QueueButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false
    }

    this.queueButton = this.queueButton.bind(this);
    this.addToQueue = this.addToQueue.bind(this);
    this.addToVideoQueue = this.addToVideoQueue.bind(this);
    this.add = this.add.bind(this);
    this.added = this.added.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.removeFromVideoQueue = this.removeFromVideoQueue.bind(this);
  }

  add() {
    if (this.state.added === true) {
      return 'none'
    } else {
      return 'inline'
    }
  }

  added() {
    if (this.state.added === true) {
      return 'inline';
    } else {
      return 'none';
    }
  }

  addToQueue() {
    this.setState({ added: true });
    const song = { songId: this.props.songId, artistName: this.props.artistName, songName: this.props.songName, backgroundPhoto: this.props.backgroundPhoto, dbId: this.props.dbId, musicComments: this.props.musicComments };
    this.props.updateMusicQueue(song, 'adding');
  }

  removeFromQueue() {
    this.setState({ added: false });
    const song = { songId: this.props.songId, artistName: this.props.artistName, songName: this.props.songName,  backgroundPhoto: this.props.backgroundPhoto, dbId: this.props.dbId, musicComments: this.props.musicComments };
    this.props.updateMusicQueue(song, 'removing');
  }

  addToVideoQueue() {
    this.setState({ added: true });
    const video = { videoId: this.props.videoId, producerName: this.props.producerName, videoName: this.props.videoName, profilePhoto: this.props.profilePhoto, dbId: this.props.dbId, videoComments: this.props.videoComments };
    this.props.updateVideoQueue(video, 'adding');
  }

  removeFromVideoQueue() {
    this.setState({ added: false });
    const video = { videoId: this.props.videoId, producerName: this.props.producerName, videoName: this.props.videoName, profilePhoto: this.props.profilePhoto, dbId: this.props.dbId, videoComments: this.props.videoComments };
    this.props.updateVideoQueue(video, 'removing');
  }

  test() {
    if (this.musicQueue.length === 0 || !this.state.added) {
      return  (
        <button className={Styles.addBtn} onClick={this.addToQueue} style={{display: this.add()}}>
          Add to Queue
        </button>
      );
    }
  }

  queueButton() {
    if (this.props.vimeoUser) {
      return (
        <div className={Styles.queueBtnContainer}>
          <button className={Styles.addBtn} onClick={this.addToQueue} style={{display: this.add()}}>
            Add to Queue
          </button>
          <button onClick={this.removeFromQueue} className={Styles.addedBtn} style={{display: this.added()}}>
            Added
          </button>
        </div>
      );
    } else {
      return (
        <div className={Styles.queueBtnContainer}>
          <button className={Styles.addBtn} onClick={this.addToVideoQueue} style={{display: this.add()}}>
            Add to Queue
          </button>
          <button onClick={this.removeFromVideoQueue} className={Styles.addedBtn} style={{display: this.added()}}>
            Added
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{display: 'inline'}}>
        { this.queueButton() }
      </div>
    )
  }
}
