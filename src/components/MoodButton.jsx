import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dropdown from 'react-dropdown';

const options = ['Carefree', 'Contemplative', 'Eerie', 'Love', 'Sad', 'Serious', 'Tense'];

export default class MoodButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: ''
    }

    this.onSelect = this.onSelect.bind(this)
  }

  onSelect(option) {
    this.setState({selected: option});

    if (this.props.vimeoUser && this.props.uploads[this.props.index].needsMusic !== undefined) {
      const videoWithMood = [{ videoId: this.props.videoId, videoName: this.props.videoName, producerName: this.props.uploads[0].producerName, mood: option.value, needsMusic: this.props.uploads[this.props.index].needsMusic }];
      this.props.getUploads(videoWithMood);
    } else if (this.props.vimeoUser && this.props.uploads[this.props.index].needsMusic === undefined) {
      const videoWithMood = [{ videoId: this.props.videoId, videoName: this.props.videoName, producerName: this.props.uploads[0].producerName, mood: option.value }];
      this.props.getUploads(videoWithMood);
    } else {
      const songWithMood = [{ songId: this.props.songId, songName: this.props.songName, artistName: this.props.artistName, mood: option.value}];
      this.props.getUploads(songWithMood);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const defaultOption = this.state.selected;

    return (
      <div style={{background: 'white', color: 'grey', textAlign: 'center', padding: '10px'}}>
        <Dropdown options={options} onChange={this.onSelect} value={defaultOption} placeholder="Select a mood" />
      </div>
    );
  }
}
