import React from 'react';
import Styles from './css/profileBanner';

export default class ProfileBanner extends React.Component {
  // you'll need to create a function that checks if it is sign up or just coming back to profile
  // if coming back to profile, it should be this.props.userInfo
  render() {
    return (
      <div className="row" style={{backgroundImage: `url(${this.props.signupInfo[0].photoUrl})`, backgroundPosition: 'no-repeat center center', height: '500px', width: '100vw', backgroundSize: 'cover'} }>
        <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
          <h5 id={Styles.username}>{this.props.signupInfo[0].scUsername}</h5>
          <p id={Styles.bio}>{this.props.signupInfo[0].bio}</p>
        </div>
      </div>
    );
  }
}
