import React from 'react';
import QueueIcon from '../img/queue-button.png';

export default class QueueButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false
    }

    this.addToQueue = this.addToQueue.bind(this);
    this.grey = this.grey.bind(this);
    this.gold = this.gold.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
  }

  grey() {
    if (this.state.added === true) {
      return 'none'
    } else {
      return 'inline'
    }
  }

  gold() {
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

  render() {
    return (
      <div style={{display: 'inline'}}>
        <button onClick={this.addToQueue} style={{display: this.grey(), border: 'none', background: 'transparent', color: 'grey'}}>
          <img src={QueueIcon} height='30px' width='30px' style={{position: 'relative', top: '7px'}} />
          <span style={{marginLeft: '10px', fontWeight: '300'}}>Add to Queue</span>
        </button>
        <button onClick={this.removeFromQueue} style={{display: this.gold(), border: 'none', background: 'transparent', color: '#daa520'}}>
          <img src={QueueIcon} height='30px' width='30px' style={{position: 'relative', top: '7px'}} />
          <span style={{marginLeft: '10px', fontWeight: '300'}}>Add to Queue</span>
        </button>
      </div>
    );
  }
}
