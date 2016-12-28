import React from 'react';
import classnames from 'classnames';
import Styles from './css/profileBanner';

export default class ProfileBanner extends React.Component {

  // you'll need to create a function that checks if it is sign up or just coming back to profile
  // if coming back to profile, it should be this.props.userInfo

  constructor(props) {
    super(props);

    this.profileBanner = this.profileBanner.bind(this);
  }

  profileBanner() {
    if (this.props.vimeoUser && this.props.uploads) {
      return (
        <div className='row' id={Styles.profileImg} style={{backgroundImage: `linear-gradient(
      rgba(0, 0, 0, .3),
      rgba(0, 0, 0, .3)
    ),url(${this.props.signupInfo[0].photoUrl})`}}>
          <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
            <h5 id={Styles.username}>{this.props.signupInfo[0].vimeoUsername}</h5>
            <p id={Styles.bio}>{this.props.signupInfo[0].bio}</p>
          </div>
        </div>
      );
    } else if (this.props.scUser && this.props.uploads) {
      return (
        <div className="row" id={Styles.profileImg} style={{backgroundImage: `linear-gradient(
      rgba(0, 0, 0, .3),
      rgba(0, 0, 0, .3)
    ),url(${this.props.signupInfo[0].photoUrl})`} }>
          <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
            <h5 id={Styles.username}>{this.props.uploads[0].artistName}</h5>
            <p id={Styles.bio}>{this.props.signupInfo[0].bio}</p>
          </div>
        </div>
      );
    } else if (this.props.vimeoUser && this.props.profileContent) {
      return;
    } else {
      return;
    }
  }

  render() {
    return (
      <div>
        { this.profileBanner() }
      </div>
    );
  }
}
