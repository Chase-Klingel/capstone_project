import React from 'react';
import axios from 'axios';
import MoodSection from './MoodSection';

export default class MusicFeed extends React.Component {
  constructor(props) {
    super(props);

    axios.get('/api/all-music')
      .then((res) => {
        this.props.getAllMusic(res.data);
      })
      .catch((err) => {
        return err;
      })

    this.generateMoodSections = this.generateMoodSections.bind(this);
  }

  generateMoodSections() {
    const musicMoods = ['Carefree', 'Contemplative', 'Eerie', 'Love', 'Sad', 'Serious', 'Tense'];
    const moodSections = [];
    for (let i = 0; i < musicMoods.length; i++) {
      moodSections.push(
        <MoodSection
          key={i}
          allMusic={this.props.allMusic}
          musicMood={musicMoods[i]}
        />
      );
    }

    return moodSections
  }

  render() {
    if (this.props.allMusic.length === 0) {
      return false;
    }

    return (
      <div style={{marginTop: '168px'}}>
        { this.generateMoodSections() }
      </div>
    );
  }
}
