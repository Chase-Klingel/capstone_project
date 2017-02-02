import React from 'react';
import Styles from './css/scEditRoomWidget';
import Forward from '../img/forward.png';

export default class SCEditForward extends React.Component {
  constructor(props) {
    super(props);

    this.forward = this.forward.bind(this);
  }

  forward() {
    this.props.nextTrack();
  }

  render() {
    return (
      <div className={Styles.forwardButtonContainer}>
        <img className={Styles.forwardButton} onClick={this.forward} src={Forward} />
      </div>
    );
  }
}
