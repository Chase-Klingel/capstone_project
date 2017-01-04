import React from 'react';
import axios from 'axios';
import ProfileBanner from './ProfileBanner';
import ProfileWidgetList from './ProfileWidgetList';

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.userInfo[0].vimeoUsername) {
      axios.get('/api/videos')
        .then((res) => {
          console.log(res.data, ' DATA');
        })
          // then some callback to set state for 'profileContent'
    } else {
      axios.get('/api/music')
        .then((res) => {
          this.props.getProfileContent(res.data);
        })
        // then some callback to set state for 'profileContent'
    }
  }

  render() {
    if (this.props.profileContent.length === 0) {
      return false;
    }

    return (
      <div className="container">
        <ProfileBanner
          scUser={this.props.scUser}
          vimeoUser={this.props.vimeoUser}
          userInfo={this.props.userInfo}
          profileContent={this.props.profileContent}
        />
        <div className="row" style={{marginBottom: '200px'}}>
          <ProfileWidgetList
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
