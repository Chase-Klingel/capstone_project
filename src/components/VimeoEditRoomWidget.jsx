import React from 'react';
import Styles from './css/vimeoEditRoomWidget';
import Forward from '../img/forward.png';
import Back from '../img/back.png';

export default class VimeoEditRoomWidget extends React.Component {
  constructor(props) {
    super(props);

    this.selectVideo = this.selectVideo.bind(this);
    this.widget = this.widget.bind(this);
    this.nextVideo = this.nextVideo.bind(this);
    this.previousVideo = this.previousVideo.bind(this);
  }

  selectVideo() {
    this.props.getVideoId(this.props.videoId);
  }

  nextVideo() {
    this.props.nextVideo();
  }

  previousVideo() {
    this.props.previousVideo();
  }

  widget() {
    const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`
    if (!this.props.videoQueue) {
      return (
        <div className="col s12 m6 offset-m3" style={{marginBottom: '30px'}}>
          <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
          <button type="button" onClick={this.selectVideo} className={Styles.selectButton}>Select Video</button>
        </div>
      );
    } else if (this.props.videoQueue && this.props.videoQueue.length > 1) {
      return (
        <div className="col s12 m6 offset-m3" style={{marginBottom: '100px', marginTop: '200px'}}>
          <iframe src={src} width="100%" height="500px" frameBorder="0" allowFullScreen></iframe>
          <div id={Styles.videoInfo}>
            <div className={Styles.forwardButtonContainer}>
              <img onClick={this.nextVideo} className={Styles.forwardButton} src={Forward} />
            </div>
            <div className={Styles.previousButtonContainer}>
              <img onClick={this.previousVideo} className={Styles.previousButton} src={Back} />
            </div>
            <h5 id={Styles.videoName}>{this.props.videos[this.props.index].videoName} | Produced by {this.props.videos[this.props.index].producerName}</h5>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col s12 m6 offset-m3" style={{marginBottom: '100px', marginTop: '200px'}}>
          <iframe src={src} width="100%" height="500px" frameBorder="0" allowFullScreen></iframe>
          <div id={Styles.videoInfo}>
            <h5 id={Styles.videoName}>{this.props.videos[this.props.index].videoName} | Produced by {this.props.videos[this.props.index].producerName}</h5>
          </div>
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
