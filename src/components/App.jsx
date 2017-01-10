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

    this.state = {
      loggedIn: false,
      vimeoUser: true,
      scUser: JSON.parse(localStorage.getItem('scUser')) || false,
      userInfo: [],
      uploads: [],
      profileContent: [],

      allMusic: [],
      musicComments: [],
      musicQueue: [],

      allVideos: [],
      videoComments: [],
      videoQueue: [],
      userId: '',
      vimeoProfile: false,
      scProfile: false
    }

    this.authUser = this.authUser.bind(this);
    this.showHeader = this.showHeader.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUploads = this.getUploads.bind(this);
    this.getProfileContent = this.getProfileContent.bind(this);
    this.getAllMusic = this.getAllMusic.bind(this);
    this.getMusicComments = this.getMusicComments.bind(this);
    this.updateMusicQueue = this.updateMusicQueue.bind(this);
    this.getAllVideos = this.getAllVideos.bind(this);
    this.getVideoComments = this.getVideoComments.bind(this);
    this.updateVideoQueue = this.updateVideoQueue.bind(this);
    this.emptyQueue = this.emptyQueue.bind(this);
    this.getUserId = this.getUserId.bind(this);
  }

  componentDidMount() {
    if (this.state.scUser) {
      this.setState({ vimeoUser: false });
    }

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
        getUserId={this.getUserId}
        loggedIn={this.state.loggedIn}
        vimeoUser={this.state.vimeoUser}
        scUser={this.state.scUser}
        authUser={this.authUser.bind(this)}
        userInfo={this.state.userInfo}
        getUserInfo={this.getUserInfo}
        signupInfo={this.state.signupInfo}
        musicQueue={this.state.musicQueue}
        videoQueue={this.state.videoQueue}
        emptyQueue={this.emptyQueue}
      />
    }
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

  getUserId(userId, profileType) {
    if (profileType === 'vimeo user') {
      this.setState({ userId: userId, scProfile: false, vimeoProfile: true });
    } else {
      this.setState({ userId: userId, scProfile: true, vimeoProfile: false });
    }
  }

  emptyQueue(queueType) {
    if (queueType === 'musicQueue') {
      this.setState({ musicQueue: [] });
    } else {
      this.setState({ videoQueue: [] });
    }
  }

  getAllVideos(allVideos) {
    this.setState({ allVideos: allVideos });
  }

  getVideoComments(videoComments) {
    this.setState({ videoComments: videoComments });
  }

  updateVideoQueue(video, operation) {
    if (operation === 'adding') {
      const nextQueue = this.state.videoQueue.concat(video);
      this.setState({ videoQueue: nextQueue });
    } else {
      const nextQueue = this.state.videoQueue.filter((queueVideo) => {
        return queueVideo.videoId !== video.videoId;
      });

      this.setState({ videoQueue: nextQueue });
    }
  }

  render() {
    localStorage.setItem('scUser', JSON.stringify(this.state.scUser));

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
              scProfile={this.state.scProfile}
              vimeoProfile={this.state.vimeoProfile}
              getUserInfo={this.getUserInfo}
              getUserId={this.getUserId}
              userId={this.state.userId}
              uploads={this.state.uploads}
              getUploads={this.getUploads}
              profileContent={this.state.profileContent}
              getProfileContent={this.getProfileContent}
              allMusic={this.state.allMusic}
              getAllMusic={this.getAllMusic}
              musicComments={this.state.musicComments}
              getMusicComments={this.getMusicComments}
              updateMusicQueue={this.updateMusicQueue}
              emptyQueue={this.emptyQueue}
              musicQueue={this.state.musicQueue}
              allVideos={this.state.allVideos}
              getAllVideos={this.getAllVideos}
              videoComments={this.state.videoComments}
              getVideoComments={this.getVideoComments}
              updateVideoQueue={this.updateVideoQueue}
              videoQueue={this.state.videoQueue}
              userInfo={this.state.userInfo}
            />
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
