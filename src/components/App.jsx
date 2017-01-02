import React from 'react';
import { BrowserRouter } from 'react-router';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // NEED TO FIGURE OUT HOW TO SET VIMEO USER OR SC USER TO TRUE THROUGHOUT USER SESSION
    this.state = {
      loggedIn: false,
      vimeoUser: true,
      scUser: false,
      signupInfo: [],
      userInfo: [],
      uploads: [],
      profileContent: [],

      allMusic: [],
      musicComments: [],
      musicQueue: [],
      allVideos: [],
      videoComments: [],

    }

    this.authUser = this.authUser.bind(this);
    this.showHeader = this.showHeader.bind(this);
    this.getsignupInfo = this.getsignupInfo.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUploads = this.getUploads.bind(this);
    this.getProfileContent = this.getProfileContent.bind(this);
    this.getAllMusic = this.getAllMusic.bind(this);
    this.getMusicComments = this.getMusicComments.bind(this);
    this.updateMusicQueue = this.updateMusicQueue.bind(this);
    this.getAllVideos = this.getAllVideos.bind(this);
    this.getVideoComments = this.getVideoComments.bind(this);
  }

  componentDidMount() {
    axios.get('/api/token')
      .then(res => {
        this.setState({ loggedIn: res.data});
      })
      .catch(err => {
        return err;
      });
  }

  authUser(bool, userType) {
    if (bool === true && userType === 'vimeo-user') {
      this.setState({ loggedIn: bool });
    } else if (bool === true && userType === 'sc-user') {
      this.setState({ loggedIn: bool, scUser: true, vimeoUser: false });
    } else {
      this.setState({loggedIn: bool, scUser: false, vimeoUser: false });
    }
  }

  showHeader() {
    if (this.state.loggedIn) {
      return <Header
        loggedIn={this.state.loggedIn}
        vimeoUser={this.state.vimeoUser}
        scUser={this.state.scUser}
        authUser={this.authUser.bind(this)}
        userInfo={this.state.userInfo}
        getUserInfo={this.getUserInfo}
        signupInfo={this.state.signupInfo}
        musicQueue={this.state.musicQueue}
      />
    }
  }

  getsignupInfo(signupInfo) {
    this.setState({ signupInfo: signupInfo });
  }

  getUserInfo(userInfo) {
    this.setState({ userInfo: userInfo });
  }

  getUploads(uploads) {
    if (uploads[0].mood && this.state.scUser === true) {
      const mappedUploads = this.state.uploads.map((upload) => {
        if (uploads[0].songId !== upload.songId) {
          return upload;
        }

        return uploads[0];
      });

      this.setState({ uploads: mappedUploads });
    } else if (uploads[0].mood && this.state.vimeoUser === true || uploads[0].needsMusic !== undefined) {
      const mappedUploads = this.state.uploads.map((upload) => {
        if (uploads[0].videoId !== upload.videoId) {

          return upload;
        }

        return uploads[0];
      });

      this.setState({ uploads: mappedUploads });
    } else {
      this.setState({ uploads: uploads });
    }
  }

  // get existing user media
  getProfileContent(content) {
    this.setState({ profileContent: content });
  }

  getAllMusic(allMusic) {
    this.setState({ allMusic: allMusic });
  }

  getMusicComments(musicComments) {
    this.setState({ musicComments: musicComments });
  }

  updateMusicQueue(song, operation) {
    if (operation === 'adding') {
      const nextQueue = this.state.musicQueue.concat(song);
      this.setState({ musicQueue: nextQueue });
    } else {
      const nextQueue = this.state.musicQueue.filter((queueSong) => {
        return queueSong.songId !== song.songId;
      });
      this.setState({ musicQueue: nextQueue });
    }

  }

  getAllVideos(allVideos) {
    this.setState({ allVideos: allVideos });
  }

  getVideoComments(videoComments) {
    this.setState({ videoComments: videoComments });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Notifications />
          { this.showHeader() }

          <main>
            <Main
              loggedIn={this.state.loggedIn}
              vimeoUser={this.state.vimeoUser}
              scUser={this.state.scUser}
              authUser={this.authUser}
              signupInfo={this.state.signupInfo}
              getsignupInfo={this.getsignupInfo}
              uploads={this.state.uploads}
              getUploads={this.getUploads}
              profileContent={this.state.profileContent}
              getProfileContent={this.getProfileContent}
              allMusic={this.state.allMusic}
              getAllMusic={this.getAllMusic}
              musicComments={this.state.musicComments}
              getMusicComments={this.getMusicComments}
              updateMusicQueue={this.updateMusicQueue}
              musicQueue={this.state.musicQueue}
              allVideos={this.state.allVideos}
              getAllVideos={this.getAllVideos}
              videoComments={this.state.videoComments}
              getVideoComments={this.getVideoComments}
              userInfo={this.state.userInfo}
            />
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
