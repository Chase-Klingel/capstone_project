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
      scUser: false,
      signupInfo: [],
      userInfo: [],
      uploads: [],
      profileContent: [],

      allMusic: [],
      allVideos: []
    }

    this.authUser = this.authUser.bind(this);
    this.showHeader = this.showHeader.bind(this);
    this.getsignupInfo = this.getsignupInfo.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUploads = this.getUploads.bind(this);
    this.getProfileContent = this.getProfileContent.bind(this);
    this.getAllMusic = this.getAllMusic.bind(this);
  }

  componentDidMount() {
    axios.get('/api/token')
      .then(res => {
        this.setState({ loggedIn: res.data });
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
            />
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
