import React from 'react';
import Styles from './css/queueButton';
import Notifications, {notify} from 'react-notify-toast';
// import QueueIcon from '../img/queue-button.png';

export default class QueueButton extends React.Component {
  constructor(props) {
    super(props);

    this.queueButton = this.queueButton.bind(this);
    this.addToQueue = this.addToQueue.bind(this);
    this.addToVideoQueue = this.addToVideoQueue.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.removeFromVideoQueue = this.removeFromVideoQueue.bind(this);
  }

  addToQueue() {
    if (!this.props.loggedIn) {
      return notify.show('Sign up or log in to use this feature!', 'error');
    }

    const song = { songId: this.props.songId, artistName: this.props.artistName, songName: this.props.songName, backgroundPhoto: this.props.backgroundPhoto, dbId: this.props.dbId, musicComments: this.props.musicComments };
    this.props.updateMusicQueue(song, 'adding');
  }

  removeFromQueue() {
    const song = { songId: this.props.songId, artistName: this.props.artistName, songName: this.props.songName,  backgroundPhoto: this.props.backgroundPhoto, dbId: this.props.dbId, musicComments: this.props.musicComments };
    this.props.updateMusicQueue(song, 'removing');
  }

  addToVideoQueue() {
    if (!this.props.loggedIn) {
      return notify.show('Sign up or log in to use this feature!', 'error');
    }

    this.setState({ added: true });
    const video = { videoId: this.props.videoId, producerName: this.props.producerName, videoName: this.props.videoName, profilePhoto: this.props.profilePhoto, dbId: this.props.dbId, videoComments: this.props.videoComments };
    this.props.updateVideoQueue(video, 'adding');
  }

  removeFromVideoQueue() {
    const video = { videoId: this.props.videoId, producerName: this.props.producerName, videoName: this.props.videoName, profilePhoto: this.props.profilePhoto, dbId: this.props.dbId, videoComments: this.props.videoComments };
    this.props.updateVideoQueue(video, 'removing');
  }

  queueButton() {
    if (this.props.vimeoUser) {
      if (this.props.songAdded) {
        return (
          <div className={Styles.queueBtnContainer}>
            <button onClick={this.removeFromQueue} className={Styles.addedBtn}>
              Added
            </button>
          </div>
        );
      } else {
        return (
          <div className={Styles.queueBtnContainer}>
            <button className={Styles.addBtn} onClick={this.addToQueue}>
              Add to Queue
            </button>
          </div>
        )
      }
    } else {
      if (this.props.videoAdded) {
        return (
          <div className={Styles.queueBtnContainer}>
            <button onClick={this.removeFromVideoQueue} className={Styles.addedBtn}>
              Added
            </button>
          </div>
        );
      } else {
        return (
          <div className={Styles.queueBtnContainer}>
            <button className={Styles.addBtn} onClick={this.addToVideoQueue}>
              Add to Queue
            </button>
          </div>
        );
      }
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
