import React from 'react';
import axios from 'axios';
import Styles from './css/profileSetup';
import ProfileBannerSetup from './ProfileBannerSetup';
import ProfileBanner from './ProfileBanner';
import WidgetList from './WidgetList';
import StartExploringButton from './StartExploringButton';
import SC from 'soundcloud';

const corsURL = 'https://cors-anywhere.herokuapp.com/';
const clientId = 'client_id=c6e1e2a98490d428460f8d36af919bb4&limit=100&offset=0';
let songUploads = [];

SC.initialize({
  client_id: 'c6e1e2a98490d428460f8d36af919bb4'
});

export default class ProfileSetup extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.vimeoUser) {
      return (
        <div>no</div>
      );
    } else {
      axios.get('/api/sc-user')
        .then((res) => {
          const userInfo = [res.data];
          this.props.getUserInfo(userInfo);
        })
        .then(() => {
          const name = this.props.userInfo[0].scUsername;
          axios.get(`${corsURL}http://api.soundcloud.com/resolve?url=http://soundcloud.com/${name}&${clientId}`)
            .then((res) => {
              const id = res.data.id;

              return id;
            })
            .then((id) => {
              SC.get('/tracks', {
                user_id: id, limit: 100
              })
              .then((tracks) => {
                for (let i = 0; i < tracks.length; i++) {
                  let songId = (tracks[i].id).toString();
                  let songName = tracks[i].title;
                  let artistName = tracks[i].user.username;
                  let song = { songId: songId, songName: songName, artistName: artistName };
                  songUploads = songUploads.concat(song);
                }

                this.props.getUploads(songUploads);

                return songUploads;
              })
              .catch((err) => {
                return err;
              })
            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        });
    }

    this.profileSetup = this.profileSetup.bind(this);
  }

  componentDidMount() {
    var element = ReactDOM.findDOMNode(this.refs.mood)

    $(element).ready(function() {
      $('select').material_select();
    })
  }

  profileSetup() {
    if (this.props.vimeoUser) {
      return false;
    } else if (this.props.userInfo[0].photoUrl === '' || this.props.userInfo[0].bio === '') {
      return (
        <div>
          <ProfileBannerSetup
            getUserInfo={this.props.getUserInfo}
            getUploads={this.props.getUploads}
            uploads={this.props.uploads}
          />

          <div className="container">
            <div className="row">
              <WidgetList
                vimeoUser={this.props.vimeoUser}
                scUser={this.props.scUser}
                uploads={this.props.uploads}
                getUploads={this.props.getUploads}
              />
              <div className="col s6 offset-s3">
                <StartExploringButton
                  uploads={this.props.uploads}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <ProfileBanner
            userInfo={this.props.userInfo}
          />

          <div className="container">
            <div className="row">
              <WidgetList
                vimeoUser={this.props.vimeoUser}
                scUser={this.props.scUser}
                uploads={this.props.uploads}
                getUploads={this.props.getUploads}
              />
            </div>
            <div className="col s6 offset-s3">
              <StartExploringButton
                uploads={this.props.uploads}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.props.userInfo.length === 0 || this.props.uploads.length === 0) {
      return false;
    }

    return <div>
      { this.profileSetup() }
    </div>
  }
}

























// import React from 'react';
// import axios from 'axios';
// import Styles from './css/profile';
// import ProfileBanner from '../img/profile-pic.png';
// import PlayButton from './PlayButton';
// import Header from './Header';
// import UploadsContainer from './UploadsContainer';
//
// const imgUrl = '../assets/img/video.jpg';
// const styles = {
//   root: {
//     background: 'url(' + imgUrl + ') noRepeat center center fixed',
//     backgroundSize: 'cover'
//   }
// }
//
// export default class ProfileSetup extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       playingVideo: false
//     }
//
//     // this.video = this.video.bind(this);
//     // this.playVideo = this.playVideo.bind(this);
//   }
//   // componentDidMount() {
//   //   axios.get('/api/userData')
//   //     .then(res => {
//   //       this.props.getUserData(res.data).bind(this);
//   //       const vimeoToken = res.data[0].vimeoToken;
//   //       const vimeoId = res.data[0].vimeoId;
//   //       const info = [vimeoId, vimeoToken];
//   //       return info;
//   //     })
//   //     .then((info) => {
//   //       axios.get(`https://api.vimeo.com/users/${info[0]}/videos`, {
//   //         headers: { "Authorization": `Bearer ${info[1]}`}
//   //       })
//   //       .then((res) => {
//   //         console.log(res.data);
//   //         // console.log(res.data.metadata.connections.videos.uri, 'here it is');
//   //         // return res.data.metadata.connections.videos.uri;
//   //       })
//   //       .catch((err) => {
//   //         return err;
//   //       })
//   //     })
//   //     .catch(err => {
//   //       return err;
//   //   });
//   // }
//
//   // playVideo() {
//   //   this.setState({playingVideo: true});
//   // }
//
//   // video() {
//   //   console.log('here');
//   //   if (this.state.playingVideo === true) {
//   //     // playing
//   //     return (
//   //       <div className="row">
//   //         <div className='vimeo-embed'>
//   //           <iframe src="https://player.vimeo.com/video/195883596?badge=0&autopause=0&player_id=0&amp;color=daa520&amp;background=000000&autoplay=true" width="100" height="100" frameBorder="0" title="test-2" allowFullScreen></iframe>
//   //         </div>
//   //       </div>
//   //     );
//   //   } else {
//   //     return (
//   //       <div className="row">
//   //         <div className='vimeo'>
//   //           <div className='vimeo-image' style={{'backgroundImage' : 'url(https://i.vimeocdn.com/video/523350661_640.jpg)', 'display' : 'block'}}>
//   //             <PlayButton onClick={this.playVideo.bind(this)} />
//   //           </div>
//   //           <div className='vimeo-embed'>
//   //             <iframe src="https://player.vimeo.com/video/195883596?badge=0&autopause=0&player_id=0&amp;color=daa520&amp;background=000000" width="100" height="100" frameBorder="0" title="test-2" allowFullScreen></iframe>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     );
//   //   }
//   // }
//
//   render() {
//     return (
//       <div>
//         <div className="row">
//           <div style={{backgroundImage: `url(${ProfileBanner})`, backgroundPosition: 'no-repeat center center', height: '500px', width: '100vw', backgroundSize: 'cover'} }>
//             <h5 id={Styles.profileImgUsername}>Chase Klingel</h5>
//           </div>
//           <UploadsContainer
//             userInfo={this.props.userInfo}
//             getUserInfo={this.props.getUserInfo}
//             uploads={this.props.uploads}
//             getUploads={this.props.getUploads}
//           />
//     </div>
//     );
//   }
// }
//
//
//
//
//
//
//
//











{/*
        <iframe src="https://player.vimeo.com/video/195883596?badge=0&autopause=0&player_id=0&amp;color=daa520&amp;background=000000" width="100" height="100" frameBorder="0" title="test-2" allowFullScreen></iframe>

        <div style={{backgroundImage: 'url(' + imgUrl + ') noRepeat center center fixed', backgroundSize: styles.root.backgroundSize, height: '500px', width: '100vw'}}>

        </div>
         { this.video() }  */}
