import React from 'react';
import axios from 'axios';
import ProfileBanner from './ProfileBanner';
import ProfileWidgetList from './ProfileWidgetList';

export default class UserProfile extends React.Component {
  componentDidMount() {
    // need to have if clause to handle if it is a vimeo or sc profile
    if (this.props.scProfile === true) {
      console.log('in sc profile get');
      axios.get(`/api/music/${this.props.userId}`)
        .then((res) => {
          this.props.getProfileContent(res.data);
        })
        .catch((err) => {
          return err;
        })
    } else {
      axios.get(`/api/videos/${this.props.userId}`)
        .then((res) => {
          this.props.getProfileContent(res.data);
        })
        .catch((err) => {
          return err;
        })
    }
  }
  render() {
    console.log(this.props.userId, ' USER ID IN USER PROFILE');
    if (this.props.profileContent.length === 0) {
      return false;
    }

    return (
      <div>
        <ProfileBanner
          userInfo={this.props.userInfo}
          profileContent={this.props.profileContent}
        />
        <div className="row" style={{marginBottom: '200px'}}>
          <ProfileWidgetList
            userId={this.props.userId}
            scProfile={this.props.scProfile}
            vimeoProfile={this.props.vimeoProfile}
            vimeoUser={this.props.vimeoUser}
            scUser={this.props.scUser}
            profileContent={this.props.profileContent}
            userInfo={this.props.userInfo}
          />
        </div>
      </div>
    );
  }
}
