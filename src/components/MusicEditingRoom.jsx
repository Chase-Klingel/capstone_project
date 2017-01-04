import React from 'react';
import Styles from './css/MusicEditingRoom';
import axios from 'axios';
import SCEditRoomWidget from './SCEditRoomWidget';
import VimeoEditRoomWidget from './VimeoEditRoomWidget';

export default class MusicEditingRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      videos: [],
      gettingVideos: false,
      videoId: null,
      playVideo: true
    }

    this.previousTrack = this.previousTrack.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.getVideos = this.getVideos.bind(this);
    this.selectedVideo = this.selectedVideo.bind(this);
    this.getVideoId = this.getVideoId.bind(this);
    this.display = this.display.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentDidMount() {
    axios.get('/api/videos/edit')
      .then((res) => {
        this.setState({ videos: res.data });
      })
      .catch((err) => {
        return err;
      });
  }

  previousTrack() {
    if (this.state.index === 0) {
      return;
    }
    this.setState({ index: this.state.index - 1});
  }

  nextTrack() {
    if (this.state.index === this.props.musicQueue.length - 1) {
      return;
    }

    this.setState({ index: this.state.index + 1})
  }

  getVideos() {
    this.setState({ gettingVideos: true });
  }

  getVideoId(videoId) {
    this.setState({ videoId: videoId });
  }

  videoList() {
    if (!this.state.gettingVideos || this.state.videoId !== null) {
      return;
    }

    const videoWidgets = [];
    for (let i = 0; i < this.state.videos.length; i++) {
      videoWidgets.push(
        <VimeoEditRoomWidget
          key={i}
          videoCount={this.state.videos.length}
          videoId={this.state.videos[i].videoId}
          videoName={this.state.videos[i].videoName}
          getVideoId={this.getVideoId}
        />
      );
    }

    return videoWidgets;
  }

  playVideo(operation) {
    if (operation === 'pause') {
      this.setState({ playVideo: false });
    }
  }

  pause() {
    if (this.state.playVideo === true) {
      return '0';
    } else {
      return '1';
    }
  }

  selectedVideo(operation) {
    if (this.state.videoId === null) {
      return;
    }

    const src = `https://player.vimeo.com/video/${this.state.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=${this.pause()}&player_id=0&amp;color=20daa5&amp;background=000000`;

    return (
      <div style={{marginTop: '-70px'}} id={Styles.fullScreen}>
        <iframe src={src} width="100%" height="500px" frameBorder="0" allowFullScreen></iframe>
      </div>
    );

  }

  display() {
    if (this.state.gettingVideos === true) {
      return 'none';
    } else {
      return 'block';
    }
  }

  filteredComments() {
    const comments = this.props.musicQueue[this.state.index].musicComments.filter((comment) => {
      return comment.songId === this.props.musicQueue[this.state.index].songId;
    });

    return comments;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12" style={{marginTop: '168px'}}>
            <SCEditRoomWidget
              dbId={this.props.musicQueue[this.state.index].dbId}
              songPosition={this.state.index + 1}
              songId={this.props.musicQueue[this.state.index].songId}
              artistName={this.props.musicQueue[this.state.index].artistName}
              songName={this.props.musicQueue[this.state.index].songName}
              backgroundPhoto={this.props.musicQueue[this.state.index].backgroundPhoto}
              previousTrack={this.previousTrack}
              nextTrack={this.nextTrack}
              musicQueue={this.props.musicQueue}
              musicComments={this.filteredComments()}
              userInfo={this.props.userInfo}
              playVideo={this.playVideo}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12 center-align" id={Styles.selectedVideoContainer}>
            <button onClick={this.getVideos} style={{display: this.display()}}>select a video</button>
            {this.selectedVideo()}
          </div>
        </div>
        <div className="row">
          { this.videoList() }
        </div>
      </div>
    );
  }
}
