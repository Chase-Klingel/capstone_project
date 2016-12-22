import React from 'react';
import classnames from 'classnames';
import Styles from './css/signoutModal';
import ProfileImg from '../img/profile-pic.png';
import Modal from 'boron/FadeModal';
import { Link, Redirect } from 'react-router';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  height: '267px',
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

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
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
        console.log('here is the res ', res.data);
        this.props.authUser(false).bind(this);
      })
      .catch(err => {
        return err;
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.showModal} id={Styles.clickableName}>Chase<i className={classnames('material-icons', Styles.carrotIcon)}>arrow_drop_down</i></button>
        <Modal ref="modal" modalStyle={modalStyle} backdropStyle={backdropStyle} contentStyle={contentStyle}>
          <div id={Styles.profileImgContainer}>
            <img src={ProfileImg} />
          </div>
          <div id={Styles.infoContainer}>
            <p id={Styles.name}>Chase Klingel</p>
            <Link to="profile" id={Styles.viewProfile}>View Profile</Link>
          </div>
          <hr />
          <Link to="/" className={classnames(Styles.modalButton, Styles.homeButton)}>home</Link>
          <Link to="/notifications" className={classnames(Styles.modalButton, Styles.notificationsButton)}>notifications</Link>
          <Link onClick={this.signOut} to="/signin" className={classnames(Styles.modalButton, Styles.signoutButton)}>sign out</Link>
        </Modal>
      </div>
    );
  }
}
