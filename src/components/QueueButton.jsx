import React from 'react';
import QueueIcon from '../img/queue-button.png';

export default class QueueButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false
    }

    this.addToQueue = this.addToQueue.bind(this);
    this.addDisplay = this.addDisplay.bind(this);
    this.removeDisplay = this.removeDisplay.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
  }

  addDisplay() {
    if (this.state.added === true) {
      return 'none'
    } else {
      return 'inline'
    }
  }

  removeDisplay() {
    if (this.state.added === true) {
      return 'inline';
    } else {
      return 'none';
    }
  }

  addToQueue() {
    this.setState({ added: true });
    const song = { songId: this.props.songId, artistName: this.props.artistName, songName: this.props.songName, backgroundPhoto: this.props.backgroundPhoto };
    this.props.updateMusicQueue(song, 'adding');
  }

  removeFromQueue() {
    this.setState({ added: false });
    const song = { songId: this.props.songId, artistName: this.props.artistName, songName: this.props.songName,  backgroundPhoto: this.props.backgroundPhoto };
    this.props.updateMusicQueue(song, 'removing');
  }

  render() {
    return (
      <div style={{display: 'inline'}}>
        <button onClick={this.addToQueue} style={{display: this.addDisplay(), border: 'none', background: 'transparent', color: 'grey'}}>
          <img src={QueueIcon} height='30px' width='30px' style={{position: 'relative', top: '7px'}} />
          <span style={{marginLeft: '10px'}}>Add to Queue</span>
        </button>
        <button onClick={this.removeFromQueue} style={{display: this.removeDisplay(), border: 'none', background: 'transparent', color: 'grey'}}>
          <img src={QueueIcon} height='30px' width='30px' style={{position: 'relative', top: '7px'}} />
          <span style={{marginLeft: '10px'}}>Remove from Queue</span>
        </button>
      </div>
    );
  }
}
