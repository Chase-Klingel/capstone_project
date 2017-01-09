import React from 'react';
import Styles from './css/MusicEditingRoom';
import axios from 'axios';
import SCEditRoomWidget from './SCEditRoomWidget';
import VimeoEditRoomWidget from './VimeoEditRoomWidget';

export default class VimeoEditRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      videos: [],
      gettingVideos: false,
      videoId: null,
      playingSong: false
    }

    this.previousTrack = this.previousTrack.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.getVideos = this.getVideos.bind(this);
    this.selectedVideo = this.selectedVideo.bind(this);
    this.getVideoId = this.getVideoId.bind(this);
    this.display = this.display.bind(this);
    this.setPlayingSong = this.setPlayingSong.bind(this);
    this.exitTest = this.exitTest.bind(this);
    this.filteredComments = this.filteredComments.bind(this);
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

  setPlayingSong(operation) {
    if (operation === 'play') {
      this.setState({ playingSong: true });
    } else {
      this.setState({ playingSong: false });
    }
  }

  exitTest() {
    this.setState({ playingSong: false });
  }

  selectedVideo() {
    if (this.state.videoId === null) {
      return;
    }

    if (this.state.playingSong) {
      const src = `https://player.vimeo.com/video/${this.state.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&autoplay=1&player_id=0&amp;color=20daa5&amp;background=000000`;

      return (
        <div style={{marginTop: '-70px'}}>
          <button style={{position: 'absolute', zIndex: '100000000', color: 'white', right: '35', top: '0', height: '50px', background: 'none', boxShadow: 'none'}} onClick={this.exitTest}>EXIT TEST</button>
          <iframe src={src} style={{overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', height: '100%', width: '100%', position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px', zIndex: '999999', border: 'none'}} height="100%" width="100%"></iframe>
        </div>
      );
    } else {
      const src = `https://player.vimeo.com/video/${this.state.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`;
      return (
        <div style={{marginTop: '-118px'}}>
          <iframe src={src} height="500px" width="100%" style={{border: 'none'}}></iframe>
        </div>
      );
    }


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
    const comments = this.filteredComments();

    return (
      <div>
        <div className="row">
          <div className="col s12" style={{marginTop: '168px'}}>
            <SCEditRoomWidget
              key={this.state.index}
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
              setPlayingSong={this.setPlayingSong}
              playingSong={this.state.playingSong}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12 center-align" id={Styles.selectedVideoContainer}>
            <p style={{color: 'white'}}>Once you select your video, click play on the current song and your video will auto play.</p>
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
