import React from 'react';
import Styles from './css/header';
import { Link } from 'react-router';
import SignOutModal from './SignOutModal';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.header = this.header.bind(this);
  }

  header() {
    if (this.props.vimeoUser) {
      return (
        <div>
          <div id={Styles.navbar}>
            <div className="row">
              <div className="col s1">
                <h1 id={Styles.logo}><Link to="/">AV</Link></h1>
              </div>
              <div>
                <ul id={Styles.navList}>
                  <Link to="/">Home</Link>
                  <Link to="/">Notifications</Link>
                  <Link to="/">Browse Music</Link>
                  <Link to="/">Browse Videos</Link>
                  <Link to="/">Import Latest Videos</Link>
                </ul>
              </div>
            </div>
            <div id={Styles.modalContainer}>
              <SignOutModal
                authUser={this.props.authUser}
              />
            </div>
            <button id={Styles.queueButton}>Music Queue</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div id={Styles.navbar}>
            <div className="row">
              <div className="col s1">
                <h1 id={Styles.logo}><Link to="/">AV</Link></h1>
              </div>
              <div>
                <ul id={Styles.navList}>
                  <Link to="/">Home</Link>
                  <Link to="/">Notifications</Link>
                  <Link to="/">Browse Music</Link>
                  <Link to="/">Browse Videos</Link>
                  <Link to="/">Import Latest Music</Link>
                </ul>
              </div>
            </div>
            <div id={Styles.modalContainer}>
              <SignOutModal
                authUser={this.props.authUser}
              />
            </div>
            <button id={Styles.queueButton}>Video Queue</button>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        { this.header() }
      </div>
    );
  }
}
