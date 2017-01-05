import React from 'react';
import Styles from './css/vimeoEditRoomWidget';
import Forward from '../img/vimeo-forward.png';
import Back from '../img/vimeo-previous.png';

export default class VimeoEditRoomWidget extends React.Component {
  constructor(props) {
    super(props);

    this.selectVideo = this.selectVideo.bind(this);
    this.widget = this.widget.bind(this);
    this.nextVideo = this.nextVideo.bind(this);
    this.previousVideo = this.previousVideo.bind(this);
    this.exitTest = this.exitTest.bind(this);
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

  exitTest() {
    this.props.doneTesting();
  }

  widget() {
    if (!this.props.videoQueue) {
      const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`

      return (
        <div className="col s12 m6 offset-m3" style={{marginBottom: '30px'}}>
          <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
          <button type="button" onClick={this.selectVideo} className={Styles.selectButton}>Select Video</button>
        </div>
      );
    } else if (this.props.videoQueue && this.props.videoQueue.length > 1) {
      if (this.props.playingSong === true) {
        // autoplay video
        const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&autoplay=1&player_id=0&amp;color=20daa5&amp;background=000000`;

        return (
          <div style={{marginTop: '-70px'}}>
            <button style={{position: 'absolute', zIndex: '100000000', color: 'white', right: '0', top: '0', height: '50px'}} onClick={this.exitTest}>exit test</button>
            <iframe src={src} frameborder="0" style={{overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', height: '100%', width: '100%', position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px', zIndex: '999999', border: 'none'}} height="100%" width="100%"></iframe>
          </div>
        );
      } else  {
        // video but no autoplay
        const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`;

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
              <h5 id={Styles.videoName}>{this.props.videos[this.props.index].videoName}</h5>
              <h6>{this.props.videos[this.props.index].producerName}</h6>
            </div>
          </div>
        );
      }
    } else {
      if (this.props.playingSong === true) {
        const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&autoplay=1&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`;

        return (
          <div className="col s12 m6 offset-m3" style={{marginBottom: '100px', marginTop: '200px'}}>
            <button style={{position: 'absolute', zIndex: '100000000', color: 'grey', left: '0', top: '0', height: '50px', width: '120px', fontSize: '12px'}} onClick={this.exitTest}>Exit Testing Mode</button>
            <iframe src={src} frameborder="0" style={{overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', height: '100%', width: '100%', position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px', zIndex: '999999', border: 'none'}} height="100%" width="100%"></iframe>
            <div id={Styles.videoInfo}>
              <h5 id={Styles.videoName}>{this.props.videos[this.props.index].videoName}</h5>
              <h6>{this.props.videos[this.props.index].producerName}</h6>
            </div>
          </div>
        );
      } else {
        const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`;

        return (
          <div className="col s12 m6 offset-m3" style={{marginBottom: '100px', marginTop: '200px'}}>
            <iframe src={src} width="100%" height="500px" frameBorder="0" allowFullScreen></iframe>
            <div id={Styles.videoInfo}>
              <h5 id={Styles.videoName}>{this.props.videos[this.props.index].videoName}</h5>
              <h6 id={Styles.producerName}>Produced by {this.props.videos[this.props.index].producerName}</h6>
            </div>
          </div>
        );
      }
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
