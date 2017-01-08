import React from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';
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
          const userInfo = [res.data];
          this.props.getUserInfo(userInfo);
          const vimeoToken = userInfo[0].vimeoToken;
          const vimeoId = userInfo[0].vimeoId;
          const info = [vimeoId, vimeoToken];
          return info;
        })
        .then((info) => {
          axios.get(`https://api.vimeo.com/users/${info[0]}/videos`, {
            headers: { "Authorization": `Bearer ${info[1]}`}
          })
          .then((res) => {
            const videoData = res.data.data;
            for (let i = 0; i < videoData.length; i++) {
              let videoId = videoData[i].link.slice(18, 27);
              let videoName = videoData[i].name;
              let producerName = this.props.userInfo[0].vimeoUsername;
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
                user_id: id
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
      if (this.props.userInfo[0].photoUrl === '' || this.props.userInfo[0].bio === '') {
        return (
          <div>
            <ProfileBannerSetup
              scUser={this.props.scUser}
              vimeoUser={this.props.vimeoUser}
              getUserInfo={this.props.getUserInfo}
              getUploads={this.props.getUploads}
              uploads={this.props.uploads}
              userInfo={this.props.userInfo}
            />

            <div className="container" id={Styles.widgetContainer}>
              <div className="row">
                <WidgetList
                  vimeoUser={this.props.vimeoUser}
                  uploads={this.props.uploads}
                  getUploads={this.props.getUploads}
                  userInfo={this.props.userInfo}
                />
              </div>
              <div className="row">
                <StartExploringButton
                  vimeoUser={this.props.vimeoUser}
                  scUser={this.props.scUser}
                  uploads={this.props.uploads}
                  userInfo={this.props.userInfo}
                />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <ProfileBanner
              profileContent={this.props.profileContent}
              scUser={this.props.scUser}
              vimeoUser={this.props.vimeoUser}
              uploads={this.props.uploads}
              userInfo={this.props.userInfo}
            />

            <div className="container" id={Styles.widgetContainer}>
              <div className="row">
                <WidgetList
                  vimeoUser={this.props.vimeoUser}
                  uploads={this.props.uploads}
                  getUploads={this.props.getUploads}
                />
              </div>

              <div className="row">
                <StartExploringButton
                  vimeoUser={this.props.vimeoUser}
                  scUser={this.props.scUser}
                  uploads={this.props.uploads}
                  userInfo={this.props.userInfo}
                />
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (this.props.userInfo[0].photoUrl === '' || this.props.userInfo[0].bio === '') {
        return (
          <div>
            <ProfileBannerSetup
              scUser={this.props.scUser}
              vimeoUser={this.props.vimeoUser}
              getUserInfo={this.props.getUserInfo}
              getUploads={this.props.getUploads}
              uploads={this.props.uploads}
              userInfo={this.props.userInfo}
            />

            <div className="container" id={Styles.widgetContainer}>
              <div className="row">
                <WidgetList
                  scUser={this.props.scUser}
                  uploads={this.props.uploads}
                  getUploads={this.props.getUploads}
                />
              </div>
              <div className="row">
                <StartExploringButton
                  vimeoUser={this.props.vimeoUser}
                  scUser={this.props.scUser}
                  uploads={this.props.uploads}
                  userInfo={this.props.userInfo}
                />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <ProfileBanner
              profileContent={this.props.profileContent}
              scUser={this.props.scUser}
              vimeoUser={this.props.vimeoUser}
              uploads={this.props.uploads}
              userInfo={this.props.userInfo}
            />

            <div className="container" id={Styles.widgetContainer}>
              <div className="row">
                <WidgetList
                  vimeoUser={this.props.vimeoUser}
                  scUser={this.props.scUser}
                  uploads={this.props.uploads}
                  getUploads={this.props.getUploads}
                />
              </div>
              <div className="row">
                <StartExploringButton
                  vimeoUser={this.props.vimeoUser}
                  scUser={this.props.scUser}
                  uploads={this.props.uploads}
                  userInfo={this.props.userInfo}
                />
              </div>
            </div>
          </div>
        );
      }
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
