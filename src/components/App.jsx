import React from 'react';
import { BrowserRouter } from 'react-router';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
// import { Redirect, Match, Miss } from 'react-router';
// import { SoundPlayerContainer } from 'react-soundplayer/addons';
// const corsURL = 'https://cors-anywhere.herokuapp.com/';
// const chartsURL = 'https://api-v2.soundcloud.com/charts?';
// const clientId = 'client_id=c6e1e2a98490d428460f8d36af919bb4&limit=100&offset=0';
// const electronicURL = 'kind=top&genre=soundcloud%3Agenres%3Aelectronic&client';
// import SC from 'soundcloud';
//
//
//
// SC.initialize({
//   client_id: 'c6e1e2a98490d428460f8d36af919bb4'
// });
// vimeo key: 71d16d2ed90f43a8718996f8a33ead1f


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
      profileContent: []
    }

    this.authUser = this.authUser.bind(this);
    this.showHeader = this.showHeader.bind(this);
    this.getsignupInfo = this.getsignupInfo.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUploads = this.getUploads.bind(this);
    this.getProfileContent = this.getProfileContent.bind(this);
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
    } else if (uploads[0].mood && this.state.vimeoUser === true) {
      const mappedUploads = this.state.uploads.map((upload) => {
        if (uploads[0].videoId !== upload.videoId) {

          return upload;
        }

        return uploads[0];
      });

      this.setState({ uploads: mappedUploads });
    } else if (uploads[0].needsMusic === true || uploads[0].needsMusic === false) {
      console.log('inside of right path');
      const mappedUploads = this.state.uploads.map((upload) => {
        if (uploads[0].videoId !== upload.videoId) {

          return upload;
        }

        return uploads[0];
      });

      console.log(mappedUploads, ' mappedUploads');
      this.setState({ uploads: mappedUploads });
    } else {
      this.setState({ uploads: uploads });
    }
  }

  // get existing user media
  getProfileContent(content) {
    this.setState({ profileContent: content });
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
            />
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
