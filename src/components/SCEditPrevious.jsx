import React from 'react';
import Styles from './css/scEditRoomWidget';
import Back from '../img/back.png';

export default class SCEditForward extends React.Component {
  constructor(props) {
    super(props);

    this.previous = this.previous.bind(this);
  }

  previous() {
    this.props.previousTrack();
  }

  render() {
    return (
      <div className={Styles.previousButtonContainer}>
        <img className={Styles.previousButton} onClick={this.previous} src={Back} />
      </div>
    );
  }
}
