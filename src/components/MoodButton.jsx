import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Styles from './css/moodButton';
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

  onSelect (option) {
    this.setState({selected: option});
    let songWithMood = [{ songId: this.props.songId, songName: this.props.songName, artistName: this.props.artistName, mood: option.value }];
    this.props.getUploads(songWithMood);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const defaultOption = this.state.selected;

    return (
      <div>
        <Dropdown options={options} onChange={this.onSelect} value={defaultOption} placeholder="Select a mood" />
      </div>
    );
  }
}
