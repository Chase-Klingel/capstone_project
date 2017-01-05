import React from 'react';
import Styles from './css/vimeoEditRoomWidget';
import MiniVimeoWidget from './MiniVimeoWidget';

export default class VimeoEditRoomWidget extends React.Component {
  constructor(props) {
    super(props);

    this.selectVideo = this.selectVideo.bind(this);
    this.widget = this.widget.bind(this);
    this.miniVimeoWidgets = this.miniVimeoWidgets.bind(this);
  }

  selectVideo() {
    this.props.getVideoId(this.props.videoId);
  }

  miniVimeoWidgets() {
    const miniWidgets = [];

    for (let i = 0; i < this.props.videos.length; i++) {
      miniWidgets.push(
        <MiniVimeoWidget
          videoId={this.props.videos[i].videoId}
        />
      )
    }

    return miniWidgets;
  }

  widget() {
    const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`

    if (this.props.videoQueue) {
      return (
        <div className="col s12 m6 offset-m3" style={{marginBottom: '100px', marginTop: '200px'}}>
          <iframe src={src} width="100%" height="500px" frameBorder="0" allowFullScreen></iframe>
          { this.miniVimeoWidgets() }
        </div>
      );
    } else {
      return (
        <div className="col s12 m6 offset-m3" style={{marginBottom: '30px'}}>
          <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
          <button type="button" onClick={this.selectVideo} className={Styles.selectButton}>Select Video</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        { this.widget() }
      </div>
    );
  }
}
