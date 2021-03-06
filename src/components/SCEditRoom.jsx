import React from 'react';
// import Styles from './css/MusicEditingRoom';
import axios from 'axios';
import SCEditRoomWidget from './SCEditRoomWidget';
import SCEditRoomUserWidget from './SCEditRoomUserWidget';
import VimeoEditRoomWidget from './VimeoEditRoomWidget';

export default class SCEditRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      songs: [],
      videos: this.props.videoQueue,
      gettingSongs: false,
      selectedSong: null,
      playingSong: false
    }

    this.selectSong = this.selectSong.bind(this);
    this.selectedSong = this.selectedSong.bind(this);
    this.scWidget = this.scWidget.bind(this);
    this.getSelectedSong = this.getSelectedSong.bind(this);
    this.previousVideo = this.previousVideo.bind(this);
    this.nextVideo = this.nextVideo.bind(this);
    this.setPlayingSong = this.setPlayingSong.bind(this);
    this.doneTesting = this.doneTesting.bind(this);
  }

  componentDidMount() {
    axios.get('/api/music/edit')
      .then((res) => {
        this.setState({ songs: res.data });
      })
      .catch((err) => {
        return err;
      });
  }

  previousVideo() {
    if (this.state.index === 0) {
      return;
    }
    this.setState({ index: this.state.index - 1});
  }

  nextVideo() {
    if (this.state.index === this.state.videos.length - 1) {
      return;
    }

    this.setState({ index: this.state.index + 1})
  }

  selectSong() {
    this.setState({ gettingSongs: true });
  }

  selectedSong() {
    if (this.state.selectedSong === null) {
      return;
    }

    return (
      <SCEditRoomWidget
        playingSong={this.state.playingSong}
        setPlayingSong={this.setPlayingSong}
        songId={this.state.selectedSong.songId}
        artistName={this.state.selectedSong.artistName}
        songName={this.state.selectedSong.songName}
        backgroundPhoto={this.state.selectedSong.backgroundPhoto}
        videoQueue={this.props.videoQueue}
      />
    );
  }

  scWidget() {
    if (!this.state.gettingSongs || this.state.selectedSong !== null) {
      return;
    }

    const scWidgets = [];

    for (let i = 0; i < this.state.songs.length; i++) {
      scWidgets.push(
        <SCEditRoomUserWidget
          key={i}
          playingSong={this.state.playingSong}
          songPosition={this.state.index + 1}
          songId={this.state.songs[i].songId}
          artistName={this.state.songs[i].artistName}
          songName={this.state.songs[i].songName}
          backgroundPhoto={this.state.songs[i].photoUrl}
          getSelectedSong={this.getSelectedSong}
        />
      );
    }

    return scWidgets;
  }

  getSelectedSong(selectedSong) {
    this.setState({ selectedSong: selectedSong });
  }

  setPlayingSong() {
    this.setState({ playingSong: true });
  }

  doneTesting() {
    this.setState({ playingSong: false });
  }

  render() {
    if (this.state.songs.length === 0) {
      return false;
    }

    return (
      <div>
        <div className="row">
          <div className="col s12" style={{marginTop: '168px'}}>
            <div style={{textAlign: 'center', marginTop: '30px'}}>
              <p style={{color: 'white'}}>Once you select a song, click the play button on the song and the video your testing will auto play.</p>
              <button type="button" onClick={this.selectSong} style={{background:'#20daa5', padding: '15px 45px', color: 'white', border: 'none', boxShadow: '0 2px 5px rgba(0, 0, 0, .2)', marginBottom: '30px'}}>Select Song</button>
              {this.selectedSong()}
            </div>
            <div>
              { this.scWidget() }
            </div>
            <div className="row">
              <VimeoEditRoomWidget
                doneTesting={this.doneTesting}
                playingSong={this.state.playingSong}
                index={this.state.index}
                nextVideo={this.nextVideo}
                previousVideo={this.previousVideo}
                videoQueue={this.props.videoQueue}
                videoId={this.state.videos[this.state.index].videoId}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
