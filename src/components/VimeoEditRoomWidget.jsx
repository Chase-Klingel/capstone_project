import React from 'react';
import Styles from './css/vimeoEditRoomWidget';
export default class VimeoEditRoomWidget extends React.Component {
  constructor(props) {
    super(props);

    this.selectVideo = this.selectVideo.bind(this);
  }

  selectVideo() {
    this.props.getVideoId(this.props.videoId);
  }

  render() {
    const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`

    return (
      <div className="col s12 m6 offset-m3" style={{marginBottom: '30px'}}>
        <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
        <button type="button" onClick={this.selectVideo} className={Styles.selectButton}>Select Video</button>
      </div>
    );
  }
}
