import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { Link } from 'react-router';
import Styles from './css/header';
import MusicMoodSection from './MusicMoodSection';

export default class MusicFeed extends React.Component {
  constructor(props) {
    super(props);

    axios.get('/api/all-music')
      .then((res) => {
        console.log(res.data, ' data');
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
    this.signupHeader = this.signupHeader.bind(this);
  }

  generateMoodSections() {
    const musicMoods = ['Beach Vibes', 'Passion', 'Carefree', 'Contemplative', 'Instrumental', 'Love', 'Sad', 'Serious', 'Tense'];
    const moodSections = [];
    for (let i = 0; i < musicMoods.length; i++) {
      moodSections.push(
        <MusicMoodSection
          key={i}
          getUserId={this.props.getUserId}
          loggedIn={this.props.loggedIn}
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

  signupHeader() {
    if (this.props.loggedIn) {
      return;
    }

    return (
      <div id={Styles.navbar}>
        <div className="row">
          <div className="col s1">
            <h1 id={Styles.logo}><Link to="/">AV</Link></h1>
          </div>
          <div className={classnames(Styles.hideSmall, 'col', 'm8', 'offset-m3')}>
            <ul id={Styles.navList}>
              <Link to="/">Home</Link>
              <Link to="/">Browse Music</Link>
              <Link to="/video-feed">Browse Videos</Link>
            </ul>
          </div>
          <div className="row">
            <div className={Styles.signInButtonContainer}>
              <Link to="/signup">sign in</Link>
            </div>
            <span id={Styles.slash}>/</span>
            <div className={Styles.signUpButtonContainer}>
              <Link to="/signup">sign up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.allMusic.length === 0) {
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
