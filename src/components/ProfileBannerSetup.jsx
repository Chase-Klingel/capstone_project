import React from 'react';
import Styles from './css/profileBannerSetup';
import axios from 'axios';

export default class ProfileBannerSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updatingImg: false,
      updatingBio: false
    }

    this.profileBannerSetup = this.profileBannerSetup.bind(this);
    this.displayUpdateOptions = this.displayUpdateOptions.bind(this);
    this.showPhotoInput = this.showPhotoInput.bind(this);
    this.showBioInput = this.showBioInput.bind(this);
    this.updateImg = this.updateImg.bind(this);
    this.updateBio = this.updateBio.bind(this);
  }

  showPhotoInput() {
    this.setState({ updatingImg: true });
  }

  showBioInput() {
    this.setState({ updatingBio: true });
  }

  updateImg(e) {
    e.preventDefault();
    if (this.props.vimeoUser) {
      axios.patch('/api/vimeo-user', {
        photoUrl: this.refs['photo'].value
      })
      .then((res) => {
        const signupInfo = [res.data];
        this.props.getsignupInfo(signupInfo);
        this.setState({ updatingImg: false });
      })
      .catch((err) => {
        return err;
      })
    } else {
      axios.patch('/api/sc-user', {
        photoUrl: this.refs['photo'].value
      })
      .then((res) => {
        const signupInfo = [res.data];
        this.props.getsignupInfo(signupInfo);
        this.setState({ updatingImg: false });
      })
      .catch((err) => {
        return err;
      })
    }

  }

  updateBio(e) {
    e.preventDefault();

    if (this.props.vimeoUser) {
      axios.patch('/api/vimeo-user', {
        bio: this.refs['bio'].value
      })
      .then((res) => {
        const signupInfo = [res.data];
        this.props.getsignupInfo(signupInfo);
        this.setState({ updatingBio: false })
      })
      .catch((err) => {
        return err;
      })
    } else {
      axios.patch('/api/sc-user', {
        bio: this.refs['bio'].value
      })
      .then((res) => {
        const signupInfo = [res.data];
        this.props.getsignupInfo(signupInfo);
        this.setState({ updatingBio: false })
      })
      .catch((err) => {
        return err;
      })
    }

  }

  displayUpdateOptions() {
    if (this.props.vimeoUser) {
      if (this.state.updatingImg) {
        return (
          <div className="row">
            <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
              <h5 id={Styles.username}>{this.props.uploads[0].producerName}</h5>
              <div id={Styles.uploadInputContainer} className="col s12 m6 offset-m3">
                <input type="text" placeholder="paste a url link to upload a profile photo..." ref="photo"/>
                <button type="submit" onClick={this.updateImg}>update</button>
              </div>
            </div>
          </div>
        )
      } else if (this.state.updatingBio) {
        return (
          <div className="row">
            <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
              <h5 id={Styles.username}>{this.props.uploads[0].producerName}</h5>
              <div id={Styles.uploadInputContainer} className="col s12 m6 offset-m3">
                <textarea type="text" placeholder="What should we know about you..." ref="bio"></textarea>
                <button type="submit" onClick={this.updateBio}>update</button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="row">
            <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
              <h5 id={Styles.username}>{this.props.uploads[0].producerName}</h5>
              <div id={Styles.uploadButtonsContainer}>
                <button onClick={this.showPhotoInput}>upload profile image</button>
                <button onClick={this.showBioInput}>Add a bio</button>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (this.state.updatingImg) {
        return (
          <div className="row">
            <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
              <h5 id={Styles.username}>{this.props.uploads[0].artistName}</h5>
              <div id={Styles.uploadInputContainer} className="col s12 m6 offset-m3">
                <input type="text" placeholder="paste a url link to upload a profile photo..." ref="photo"/>
                <button type="submit" onClick={this.updateImg}>update</button>
              </div>
            </div>
          </div>
        )
      } else if (this.state.updatingBio) {
        return (
          <div className="row">
            <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
              <h5 id={Styles.username}>{this.props.uploads[0].artistName}</h5>
              <div id={Styles.uploadInputContainer} className="col s12 m6 offset-m3">
                <textarea type="text" placeholder="What should we know about you..." ref="bio"></textarea>
                <button type="submit" onClick={this.updateBio}>update</button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="row">
            <div style={{ height: '500px', borderBottom: '1px solid lightgrey'}}>
              <h5 id={Styles.username}>{this.props.uploads[0].artistName}</h5>
              <div id={Styles.uploadButtonsContainer}>
                <button onClick={this.showPhotoInput}>upload profile image</button>
                <button onClick={this.showBioInput}>Add a bio</button>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  profileBannerSetup() {
    if (this.props.uploads) {
      return (
        <div id={Styles.bannerContainer}>
          { this.displayUpdateOptions() }
        </div>
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        { this.profileBannerSetup() }
      </div>
    );
  }
}
