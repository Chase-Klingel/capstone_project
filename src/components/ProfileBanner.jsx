import React from 'react';
import classnames from 'classnames';
import Styles from './css/profileBanner';

export default class ProfileBanner extends React.Component {
  constructor(props) {
    super(props);

    this.profileBanner = this.profileBanner.bind(this);
    this.userInfo= this.userInfo.bind(this);
    this.bannerPhoto = this.bannerPhoto.bind(this);
  }

  userInfo() {
      if (this.props.userInfo.length === 0 && this.props.profileContent[0].hasOwnProperty('scUsername')) {
        return (
          <div>
            <h5 id={Styles.username}>{this.props.profileContent[0].scUsername}</h5>
            <p id={Styles.bio}>{this.props.profileContent[0].bio}</p>
          </div>
        );
      } else if (this.props.userInfo.length === 0 &&  this.props.profileContent[0].hasOwnProperty('vimeoUsername'))  {
        return (
          <div>
            <h5 id={Styles.username}>{this.props.profileContent[0].vimeoUsername}</h5>
            <p id={Styles.bio}>{this.props.profileContent[0].bio}</p>
          </div>
        );
        // sc user going to their own profile
      } else if (this.props.userInfo[0].vimeoUsername === undefined && this.props.profileContent.length === 0) {
      return (
        <div>
          <h5 id={Styles.username}>{this.props.userInfo[0].scUsername}</h5>
          <p id={Styles.bio}>{this.props.userInfo[0].bio}</p>
        </div>
      );
    // vimeo user going to their own profile
    } else if (this.props.userInfo[0].scUsername === undefined && this.props.profileContent.length === 0) {
      return (
        <div>
          <h5 id={Styles.username}>{this.props.userInfo[0].vimeoUsername}</h5>
          <p id={Styles.bio}>{this.props.userInfo[0].bio}</p>
        </div>
      );
    // going to an sc user profile
    } else if (this.props.profileContent[0].vimeoUsername === undefined) {
      return (
        <div>
          <h5 id={Styles.username}>{this.props.profileContent[0].scUsername}</h5>
          <p id={Styles.bio}>{this.props.profileContent[0].bio}</p>
        </div>
      );
    // going to a vimeo user profile
    } else {
      return (
        <div>
          <h5 id={Styles.username}>{this.props.profileContent[0].vimeoUsername}</h5>
          <p id={Styles.bio}>{this.props.profileContent[0].bio}</p>
        </div>
      );
    }
  }

  bannerPhoto() {
    if (this.props.profileContent.length > 0) {
      return (
        <div className='row' id={Styles.profileImg} style={{backgroundImage:
          `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)),
          url(${this.props.profileContent[0].photoUrl})`}}>
        </div>
      );
    } else {
      return (
        <div className='row' id={Styles.profileImg} style={{backgroundImage:
          `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)),
          url(${this.props.userInfo[0].photoUrl})`}}>
        </div>
      );
    }
  }

  profileBanner() {
    return (
      <div id={Styles.vimeoBannerContainer}>
        { this.bannerPhoto() }

        <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
          { this.userInfo() }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.profileBanner() }
      </div>
    );
  }
}
