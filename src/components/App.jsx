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
      userInfo: [],
      uploads: [],
      profileContent: []
    }

    this.authUser = this.authUser.bind(this);
    this.showHeader = this.showHeader.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUploads = this.getUploads.bind(this);
    this.getProfileContent = this.getProfileContent.bind(this);
  }

  componentDidMount() {
    axios.get('/api/token')
      .then(res => {
        console.log(res.data, 'res in did mount');
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
      console.log('in this section');
      this.setState({loggedIn: bool, scUser: false, vimeoUser: false });
    }
  }

  showHeader() {
    if (this.state.loggedIn) {
      return <Header
        loggedIn={this.state.loggedIn}
        authUser={this.authUser.bind(this)}
      />
    }
  }

  getUserInfo(userInfo) {
    const nextUserInfo = this.state.userInfo.concat(userInfo);
    this.setState({ userInfo: nextUserInfo });
  }

  getUploads(uploads) {
    this.setState({ uploads: uploads });
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
              userInfo={this.state.userInfo}
              getUserInfo={this.getUserInfo}
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

//   constructor(props) {
//     super(props);
//
//     this.state = {
//       loggedIn: false,
//       srcList: []
//     }
//   }
//
//   componentDidMount() {
//
//     // axios.get(`${corsURL}http://api.soundcloud.com/resolve?url=http://soundcloud.com/dayejack&${clientId}`)
//     // .then((res) => {
//     //   return res.data.id;
//     // })
//     // .then((id) => {
//     //   SC.get('/tracks', {
//     //     user_id: id, limit: 100
//     //   }).then((tracks) => {
//     //     for (let i = 0; i < tracks.length; i++) {
//     //       const nextSrc = `https://w.soundcloud.com/player/?visual=true&url=${tracks[i].permalink_url}`;
//     //       const newSrcList = this.state.srcList.concat(nextSrc);
//     //       this.setState({ srcList: newSrcList });
//     //     }
//     //   });
//     // })
//   }
//
//   render() {
//     return (
//       <div>
//         {/* <iframe src={this.state.srcList[0]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[1]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[2]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[3]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[4]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[5]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[6]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[7]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[8]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[9]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[10]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[11]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[12]} width="100%" height="400" scrolling="no"></iframe>
//         <iframe src={this.state.srcList[13]} width="100%" height="400" scrolling="no"></iframe> */}
//
//       </div>
//
//       // <BrowserRouter>
//       //   <div>
//       //     <Header
//       //       loggedIn={this.state.loggedIn}
//       //     />
//       //
//       //     <main>
//       //       <Main />
//       //     </main>
//       //
//       //     <Footer />
//       //   </div>
//       // </BrowserRouter>
//     );
//   }
// }















// youtube process

/*import React from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';


// youtube key: AIzaSyDZA3Dssn6o37i4X4oSk0gr1bkMTOesIKo

// sc key: c6e1e2a98490d428460f8d36af919bb4 --> this is from music-circle. You submitted application for api key.

// we will need the users channel id for youtube --> oatuh required I believe.

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoIds: [],
    }
  }
  componentDidMount() {
    // first step: query for channel ID
    axios.get('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UCEi0EgWJ5m7gVBQ68a1L0TA&key=AIzaSyDZA3Dssn6o37i4X4oSk0gr1bkMTOesIKo')
      .then(res => {
        const id = res.data.items[0].contentDetails.relatedPlaylists.uploads;
        return id;
      })
      // const id = id associated with all user uploads
      // step 2: query whree playlistId = 'const id'
      .then(res => {
        console.log(res);
        axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${res}&key=AIzaSyDZA3Dssn6o37i4X4oSk0gr1bkMTOesIKo`)
          .then((res) => {
            for (let i = 0; i < res.data.items.length; i++) {
              const nextVideoId = this.state.videoIds.concat(res.data.items[i].snippet.resourceId.videoId);
              this.setState({ videoIds: nextVideoId });
            }
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
    })
  }



  render() {
    console.log(this.state.videoIds);
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return (
      <div>
        test
        <YouTube
          videoId={this.state.videoIds[0]}
          opts={opts}
        />
        <YouTube
          videoId={this.state.videoIds[1]}
          opts={opts}
        />
        <YouTube
          videoId={this.state.videoIds[2]}
          opts={opts}
        />
        <YouTube
          videoId={this.state.videoIds[3]}
          opts={opts}
        />
        <YouTube
          videoId={this.state.videoIds[4]}
          opts={opts}
        />
    </div>
    )
  }
};
*/
