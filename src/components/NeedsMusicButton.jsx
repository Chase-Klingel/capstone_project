import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Styles from './css/moodButton';
import Dropdown from 'react-dropdown';

const options = ['yes', 'no'];

export default class NeedsMusicButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: ''
    }

    this.onSelect = this.onSelect.bind(this)
  }

  onSelect(option) {
    console.log(this.props.uploads[this.props.index]);
    this.setState({selected: option});

    if (option.value === 'yes' && !this.props.uploads[this.props.index].mood) {
      const needsMusic = [{ videoId: this.props.videoId, videoName: this.props.videoName, mood: this.props.uploads[this.props.index].mood, needsMusic: true }];
      this.props.getUploads(needsMusic);
    } else if (option.value === 'yes') {
      const needsMusic = [{ videoId: this.props.videoId, videoName: this.props.videoName, needsMusic: true }];
      this.props.getUploads(needsMusic);
    } else if (option.value === 'no' && !this.props.uploads[this.props.index].mood) {
      const noMusic = [{ videoId: this.props.videoId, videoName: this.props.videoName, mood: this.props.uploads[this.props.index].mood, needsMusic: false }];
      this.props.getUploads(noMusic);
    } else {
      const noMusic = [{ videoId: this.props.videoId, videoName: this.props.videoName, needsMusic: false }];
      this.props.getUploads(noMusic);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const defaultOption = this.state.selected;

    return (
      <div>
        <Dropdown options={options} onChange={this.onSelect} value={defaultOption} placeholder="Needs Music" />
      </div>
    );
  }
}
