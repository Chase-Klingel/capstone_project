import React from 'react';
import Styles from './css/VimeoFeedWidget';
import Play from '../img/play.png';
export default class PlayButton extends React.Component {
  render() {
    return (
      <button
        className={Styles.vimeoPlayButton}
        // onClick={ this.props.onClick }
        type='button'>
        play
      </button>
    );
  }
}
