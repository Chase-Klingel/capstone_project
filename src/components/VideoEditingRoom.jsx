import React from 'react';
// import Styles from './css/MusicEditingRoom';
import axios from 'axios';
import SCEditRoomUserWidget from './SCEditRoomUserWidget';
// import VimeoEditRoomWidget from './VimeoEditRoomWidget';

export default class VideoEditingRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      songs: [],
      gettingSongs: false,
      songId: null
    }

    this.selectSong = this.selectSong.bind(this);
    this.scWidget = this.scWidget.bind(this);
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

  selectSong() {
    this.setState({ gettingSongs: true });
  }

  scWidget() {
    if (!this.state.gettingSongs) {
      return;
    }

    const scWidgets = [];

    for (let i = 0; i < this.state.songs.length; i++) {
      scWidgets.push(
        <SCEditRoomUserWidget
          key={i}
          songPosition={this.state.index + 1}
          songId={this.state.songs[i].songId}
          artistName={this.state.songs[i].artistName}
          songName={this.state.songs[i].songName}
          backgroundPhoto={this.state.songs[i].photoUrl}
        />
      );
    }

    console.log(scWidgets, ' sc widgets');

    return scWidgets;
  }

  render() {
    if (this.state.songs.length === 0) {
      return false;
    }
    console.log(this.state.songs, ' songs');
    return (
      <div>
        <div className="row">
          <div className="col s12" style={{marginTop: '168px'}}>
            <div style={{textAlign: 'center', marginTop: '30px'}}>
              <button type="button" onClick={this.selectSong} style={{
              background:'#20daa5',
              padding: '15px 45px',
              color: 'white',
              border: 'none',
              boxShadow: '0 2px 5px rgba(0, 0, 0, .2)', marginBottom: '30px'}}>Select Song</button>
            </div>
            <div>
              { this.scWidget() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
