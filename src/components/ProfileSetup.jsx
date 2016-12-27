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
let videoUploads = [];

SC.initialize({
  client_id: 'c6e1e2a98490d428460f8d36af919bb4'
});

export default class ProfileSetup extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.vimeoUser) {
      axios.get('/api/vimeo-user')
        .then((res) => {
          const signupInfo = [res.data];
          this.props.getsignupInfo(signupInfo);
          const vimeoToken = signupInfo[0].vimeoToken;
          const vimeoId = signupInfo[0].vimeoId;
          const info = [vimeoId, vimeoToken];
          return info;
        })
        .then((info) => {
          axios.get(`https://api.vimeo.com/users/${info[0]}/videos`, {
            headers: { "Authorization": `Bearer ${info[1]}`}
          })
          .then((res) => {
            console.log(res.data.data[0].name, ' video name first');
            const videoData = res.data.data;
            for (let i = 0; i < videoData.length; i++) {
              let videoId = videoData[i].link.slice(18, 27);
              let videoName = videoData[i].name;
              let producerName = this.props.signupInfo[0].vimeoUsername;
              let video = { videoId: videoId, videoName: videoName, producerName: producerName };
              videoUploads = videoUploads.concat(video);
            }

            return this.props.getUploads(videoUploads);
          })
          .catch((err) => {
            return err;
          })
        })
        .catch(err => {
          return err;
        });
    } else {
      axios.get('/api/sc-user')
        .then((res) => {
          const signupInfo = [res.data];
          this.props.getsignupInfo(signupInfo);
        })
        .then(() => {
          const name = this.props.signupInfo[0].scUsername;
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
                // you can probably just return line 85. Test later.
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

  profileSetup() {
    if (this.props.vimeoUser) {
      if (this.props.signupInfo[0].photoUrl === '' || this.props.signupInfo[0].bio === '') {
        return (
          <div>
            <ProfileBannerSetup
              scUser={this.props.scUser}
              vimeoUser={this.props.vimeoUser}
              getsignupInfo={this.props.getsignupInfo}
              getUploads={this.props.getUploads}
              uploads={this.props.uploads}
            />

            <div className="container">
              <div className="row">
                <WidgetList
                  vimeoUser={this.props.vimeoUser}
                  uploads={this.props.uploads}
                  getUploads={this.props.getUploads}
                  signupInfo={this.props.signupInfo}
                />
                <div className="col s6 offset-s3">
                  <StartExploringButton
                    vimeoUser={this.props.vimeoUser}
                    scUser={this.props.scUser}
                    uploads={this.props.uploads}
                    signupInfo={this.props.signupInfo}
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
              scUser={this.props.scUser}
              vimeoUser={this.props.vimeoUser}
              uploads={this.props.uploads}
              signupInfo={this.props.signupInfo}
            />

            <div className="container">
              <div className="row">
                <WidgetList
                  vimeoUser={this.props.vimeoUser}
                  uploads={this.props.uploads}
                  getUploads={this.props.getUploads}
                />
              </div>
              <div className="col s6 offset-s3">
                <StartExploringButton
                  vimeoUser={this.props.vimeoUser}
                  scUser={this.props.scUser}
                  uploads={this.props.uploads}
                  signupInfo={this.props.signupInfo}
                />
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (this.props.signupInfo[0].photoUrl === '' || this.props.signupInfo[0].bio === '') {
        return (
          <div>
            <ProfileBannerSetup
              scUser={this.props.scUser}
              vimeoUser={this.props.vimeoUser}
              getsignupInfo={this.props.getsignupInfo}
              getUploads={this.props.getUploads}
              uploads={this.props.uploads}
            />

            <div className="container">
              <div className="row">
                <WidgetList
                  scUser={this.props.scUser}
                  uploads={this.props.uploads}
                  getUploads={this.props.getUploads}
                />
                <div className="col s6 offset-s3">
                  <StartExploringButton
                    vimeoUser={this.props.vimeoUser}
                    scUser={this.props.scUser}
                    uploads={this.props.uploads}
                    signupInfo={this.props.signupInfo}
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
              scUser={this.props.scUser}
              vimeoUser={this.props.vimeoUser}
              uploads={this.props.uploads}
              signupInfo={this.props.signupInfo}
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
                  vimeoUser={this.props.vimeoUser}
                  scUser={this.props.scUser}
                  uploads={this.props.uploads}
                  signupInfo={this.props.signupInfo}
                />
              </div>
            </div>
          </div>
        );
      }
    }
  }

  render() {

    if (this.props.signupInfo.length === 0 || this.props.uploads.length === 0) {
      return false;
    }

    return <div>
      { this.profileSetup() }
    </div>
  }
}


























    // componentDidMount() {
    //   axios.get('/api/vimeo-user')
    //     .then(res => {
    //       this.props.getsignupInfo(res.data);
    //       const vimeoToken = res.data[0].vimeoToken;
    //       const vimeoId = res.data[0].vimeoId;
    //       const info = [vimeoId, vimeoToken];
    //       return info;
    //     })
    //     .then((info) => {
    //       axios.get(`https://api.vimeo.com/users/${info[0]}/videos`, {
    //         headers: { "Authorization": `Bearer ${info[1]}`}
    //       })
    //       .then((res) => {
    //         return res.data.metadata.connections.videos.uri;
    //       })
    //       .catch((err) => {
    //         return err;
    //       })
    //     })
    //     .catch(err => {
    //       return err;
    //     });
    // }


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










/*
        <iframe src="https://player.vimeo.com/video/195883596?badge=0&autopause=0&player_id=0&amp;color=daa520&amp;background=000000" width="100" height="100" frameBorder="0" title="test-2" allowFullScreen></iframe>

        <div style={{backgroundImage: 'url(' + imgUrl + ') noRepeat center center fixed', backgroundSize: styles.root.backgroundSize, height: '500px', width: '100vw'}}>

        </div>
         { this.video() }  */
