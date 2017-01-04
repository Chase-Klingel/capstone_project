import React from 'react';
import axios from 'axios';
import MusicMoodSection from './MusicMoodSection';

export default class MusicFeed extends React.Component {
  constructor(props) {
    super(props);

    axios.get('/api/all-music')
      .then((res) => {
        this.props.getAllMusic(res.data);
      })
      .then(() => {
        axios.get('/api/music-comments')
          .then((res) => {
            this.props.getMusicComments(res.data);
          })
          .catch((err) => {
            return err;
          })
      })
      .catch((err) => {
        return err;
      })


    this.generateMoodSections = this.generateMoodSections.bind(this);
  }

  generateMoodSections() {
    const musicMoods = ['Beach Vibes', 'Passion', 'Carefree', 'Contemplative', 'Instrumental', 'Love', 'Sad', 'Serious', 'Tense'];
    const moodSections = [];
    for (let i = 0; i < musicMoods.length; i++) {
      moodSections.push(
        <MusicMoodSection
          key={i}
          allMusic={this.props.allMusic}
          musicMood={musicMoods[i]}
          musicComments={this.props.musicComments}
          userInfo={this.props.userInfo}
          updateMusicQueue={this.props.updateMusicQueue}
          musicQueue={this.props.musicQueue}
          vimeoUser={this.props.vimeoUser}
        />
      );
    }

    return moodSections
  }

  render() {
    if (this.props.allMusic.length === 0 || this.props.musicComments.length === 0) {
      return false;
    }

    return (
      <div style={{marginTop: '168px'}}>
        { this.generateMoodSections() }
      </div>
    );
  }
}
