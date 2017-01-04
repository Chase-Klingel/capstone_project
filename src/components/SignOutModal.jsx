import React from 'react';
import classnames from 'classnames';
import Styles from './css/signoutModal';
import Modal from 'boron/FadeModal';
import { Link, Redirect } from 'react-router';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  height: '295px',
  width: '340px',
  top: '180px',
  right: '20px'
};

const backdropStyle = {
  background: 'none'
}

const contentStyle = {
    height: '100%'
};

export default class SignOutModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: ''
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signOutModal = this.signOutModal.bind(this);
  }

  showModal() {
    this.refs['modal'].show();
  }

  hideModal() {
    this.refs['modal'].hide();
  }

  signOut(event) {
    event.preventDefault();

    axios.delete('/token')
      .then(res => {
        this.setState({ redirect: '/signin' });
        this.props.authUser(false, null).bind(this);
      })
      .catch(err => {
        return err;
      });
  }

  signOutModal() {
    if (this.props.vimeoUser && this.props.signupInfo.length !== 0) {
      return (
        <div id={Styles.desktopMenu}>
          <button onClick={this.showModal} id={Styles.clickableName}>{this.props.userInfo[0].vimeoUsername}<i className={classnames('material-icons', Styles.carrotIcon)}>arrow_drop_down</i></button>
          <Modal ref="modal" modalStyle={modalStyle} backdropStyle={backdropStyle} contentStyle={contentStyle}>
            <div id={Styles.profileImgContainer}>
              <img src={this.props.userInfo[0].photoUrl} />
            </div>
            <div id={Styles.infoContainer}>
              <p id={Styles.name}>{this.props.signupInfo[0].vimeoUsername}</p>
              <Link to="/profile" id={Styles.viewProfile}>View Profile</Link>
            </div>
            <hr />
            <Link to="/music-feed" className={classnames(Styles.modalButton, Styles.homeButton)}>home</Link>
            <Link to="/music-feed" className={classnames(Styles.modalButton, Styles.browseMusicButton)}>Browse Music</Link>
            <Link to="/video-feed" className={classnames(Styles.modalButton, Styles.browseVideosButton)}>Browse Videos</Link>
            <Link to="/notifications" className={classnames(Styles.modalButton, Styles.notificationsButton)}>notifications</Link>
            <Link onClick={this.signOut} to="/signin" className={classnames(Styles.modalButton, Styles.signoutButton)}>sign out</Link>
          </Modal>
        </div>
      );
    } else if (this.props.scUser && this.props.signupInfo.length !== 0) {
      return (
        <div>
          <button onClick={this.showModal} id={Styles.clickableName}>{this.props.userInfo[0].scUsername}<i className={classnames('material-icons', Styles.carrotIcon)}>arrow_drop_down</i></button>
          <Modal ref="modal" modalStyle={modalStyle} backdropStyle={backdropStyle} contentStyle={contentStyle}>
            <div id={Styles.profileImgContainer}>
              <img src={this.props.signupInfo[0].photoUrl} />
            </div>
            <div id={Styles.infoContainer}>
              <p id={Styles.name}>{this.props.userInfo[0].scUsername}</p>
              <Link to="/profile" id={Styles.viewProfile}>View Profile</Link>
            </div>
            <hr />
            <Link to="/video-feed" className={classnames(Styles.modalButton, Styles.homeButton)}>home</Link>
            <Link to="/music-feed" className={classnames(Styles.modalButton, Styles.browseMusicButton)}>Browse Music</Link>
            <Link to="/video-feed" className={classnames(Styles.modalButton, Styles.browseVideosButton)}>Browse Videos</Link>
            <Link to="/notifications" className={classnames(Styles.modalButton, Styles.notificationsButton)}>notifications</Link>
            <Link onClick={this.signOut} to="/signin" className={classnames(Styles.modalButton, Styles.signoutButton)}>sign out</Link>
          </Modal>
        </div>
      );
    } else if (this.props.vimeoUser && this.props.userInfo.length !== 0) {
      return (
        <div>
          <button onClick={this.showModal} id={Styles.clickableName}>{this.props.userInfo[0].vimeoUsername}<i className={classnames('material-icons', Styles.carrotIcon)}>arrow_drop_down</i></button>
          <Modal ref="modal" modalStyle={modalStyle} backdropStyle={backdropStyle} contentStyle={contentStyle}>
            <div id={Styles.profileImgContainer}>
              <img src={this.props.userInfo[0].photoUrl} />
            </div>
            <div id={Styles.infoContainer}>
              <p id={Styles.name}>{this.props.userInfo[0].vimeoUsername}</p>
              <Link to="/profile" id={Styles.viewProfile}>View Profile</Link>
            </div>
            <hr />
            <Link to="/music-feed" className={classnames(Styles.modalButton, Styles.homeButton)}>home</Link>
            <Link to="/music-feed" className={classnames(Styles.modalButton, Styles.browseMusicButton)}>Browse Music</Link>
            <Link to="/video-feed" className={classnames(Styles.modalButton, Styles.browseVideosButton)}>Browse Videos</Link>
            <Link to="/notifications" className={classnames(Styles.modalButton, Styles.notificationsButton)}>notifications</Link>
            <Link onClick={this.signOut} to="/signin" className={classnames(Styles.modalButton, Styles.signoutButton)}>sign out</Link>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.showModal} id={Styles.clickableName}>{this.props.userInfo[0].scUsername}<i className={classnames('material-icons', Styles.carrotIcon)}>arrow_drop_down</i></button>
          <Modal ref="modal" modalStyle={modalStyle} backdropStyle={backdropStyle} contentStyle={contentStyle}>
            <div id={Styles.profileImgContainer}>
              <img src={this.props.userInfo[0].photoUrl} />
            </div>
            <div id={Styles.infoContainer}>
              <p id={Styles.name}>{this.props.userInfo[0].scUsername}</p>
              <Link to="/profile" id={Styles.viewProfile}>View Profile</Link>
            </div>
            <hr />
            <Link to="/video-feed" className={classnames(Styles.modalButton, Styles.homeButton)}>home</Link>
            <Link to="/music-feed" className={classnames(Styles.modalButton, Styles.browseMusicButton)}>Browse Music</Link>
            <Link to="/video-feed" className={classnames(Styles.modalButton, Styles.browseVideosButton)}>Browse Videos</Link>
            <Link to="/notifications" className={classnames(Styles.modalButton, Styles.notificationsButton)}>notifications</Link>
            <Link onClick={this.signOut} to="/signin" className={classnames(Styles.modalButton, Styles.signoutButton)}>sign out</Link>
          </Modal>
        </div>
      );
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
    }

    return (
      <div>
        { this.signOutModal() }
      </div>
    )
  }
}
