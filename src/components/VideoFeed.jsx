import React from 'react';
import axios from 'axios';
import VideoMoodSection from './VideoMoodSection';

export default class VideoFeed extends React.Component {
  constructor(props) {
    super(props);

    axios.get('/api/all-videos')
      .then((res) => {
        this.props.getAllVideos(res.data);
      })
      .then(() => {
        axios.get('/api/videos-comments')
          .then((res) => {
            this.props.getVideoComments(res.data);
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
    const videoMoods = ['Carefree', 'Contemplative', 'Eerie', 'Love', 'Sad', 'Serious', 'Tense'];
    const moodSections = [];
    for (let i = 0; i < videoMoods.length; i++) {
      moodSections.push(
        <VideoMoodSection
          key={i}
          allVideos={this.props.allVideos}
          videoMood={videoMoods[i]}
          videoComments={this.props.videoComments}
          userInfo={this.props.userInfo}
        />
      );
    }

    return moodSections
  }

  render() {
    if (this.props.allVideos.length === 0 || this.props.videoComments.length === 0) {
      return false;
    }

    return (
      <div style={{marginTop: '168px'}}>
        { this.generateMoodSections() }
      </div>
    );
  }
}
