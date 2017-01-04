import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { Link } from 'react-router';
import Styles from './css/header';
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
    this.signupHeader = this.signupHeader.bind(this);
  }

  generateMoodSections() {
    const videoMoods = ['Beach Vibes', 'Passion', 'Carefree', 'Contemplative', 'Love', 'Sad'];
    const moodSections = [];
    for (let i = 0; i < videoMoods.length; i++) {
      moodSections.push(
        <VideoMoodSection
          key={i}
          allVideos={this.props.allVideos}
          videoMood={videoMoods[i]}
          videoComments={this.props.videoComments}
          userInfo={this.props.userInfo}
          updateVideoQueue={this.props.updateVideoQueue}
          videoQueue={this.props.videoQueue}
          scUser={this.props.scUser}
        />
      );
    }

    return moodSections
  }

  signupHeader() {
    if (this.props.loggedIn) {
      return;
    }

    return (
      <div id={Styles.navbar}>
        <div className="row">
          <div className="col s1">
            <h1 id={Styles.logo}><Link to="/music-feed">AV</Link></h1>
          </div>
          <div className={classnames(Styles.hideSmall, 'col', 'm8', 'offset-m3')}>
            <ul id={Styles.navList}>
              <Link to="/music-feed">Home</Link>
              <Link to="/music-feed">Browse Music</Link>
              <Link to="/video-feed">Browse Videos</Link>
            </ul>
          </div>
          <div id={Styles.signUpButtonContainer}>
            <Link to="/signup">sign up</Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.allVideos.length === 0 || this.props.videoComments.length === 0) {
      return false;
    }

    return (
      <div>
        { this.signupHeader() }
        <div style={{marginTop: '168px'}}>
          { this.generateMoodSections() }
        </div>
      </div>

    );
  }
}
