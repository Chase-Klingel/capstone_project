import React from 'react';

export default class PlayButton extends React.Component {
  render() {
    return (
      <button
        className='vimeo-play-button'
        onClick={ this.props.onClick }
        type='button'>
        <svg viewBox="298 388 16 16">
          <path d="M298 404v-16l16 8"></path>
        </svg>
        {/* <span className="play-word-vimeo">play</span> */}
      </button>
    );
  }
}
