import React from 'react';
import Styles from './css/profileBanner';

export default class ProfileBanner extends React.Component {
  render() {
    return (
      <div className="row" style={{backgroundImage: `url(${this.props.userInfo[0].photoUrl})`, backgroundPosition: 'no-repeat center center', height: '500px', width: '100vw', backgroundSize: 'cover'} }>
        <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
          <h5 id={Styles.username}>{this.props.userInfo[0].scUsername}</h5>
          <p id={Styles.bio}>{this.props.userInfo[0].bio}</p>
        </div>
      </div>
    );
  }
}
