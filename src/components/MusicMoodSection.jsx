import React from 'react';
import axios from 'axios';
import SCFeedWidget from './SCFeedWidget';
import Styles from './css/moodSection';

export default class MoodSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      widgets: [],
      nextWidgets: true,
      previousWidgets: false,
      index: 0,
      max: false,
      min: true
    }

    this.displayWidgets = this.displayWidgets.bind(this);
    this.threeOrLessWidgets = this.threeOrLessWidgets.bind(this);
    this.forward= this.forward.bind(this);
    this.showNext = this.showNext.bind(this);

    this.previous = this.previous.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
  }

  componentDidMount() {
    const songs = this.props.allMusic;

    const widgets = songs.filter((song) => {
      return song.mood === this.props.musicMood;
    });

    this.setState({ widgets: widgets });
  }

  threeOrLessWidgets() {
    const widgets = this.state.widgets.map((widget, i) => {
      if (i <= 2) {
        if (widget.songName.length > 24) {
          widget.songName = widget.songName.substr(0, 24).trim() + '...';
        }

        return <SCFeedWidget
          key={i}
          backgroundPhoto={this.state.widgets[i].photoUrl}
          dbId={this.state.widgets[i].id}
          songId={widget.songId}
          songName={widget.songName}
          artistName={widget.artistName}
          widgets={this.state.widgets}
          musicComments={this.props.musicComments}
          userInfo={this.props.userInfo}
          updateMusicQueue={this.props.updateMusicQueue}
        />
      }
    });

    return widgets;
  }

  previous() {
    if ((this.state.index - 6) <= 0) {
      this.setState({ min: true });
    }

    this.setState({nextWidgets: false, previousWidgets: true, index: this.state.index - 3, max: false });
  }

  showPrevious() {
    const widgets = [];

    for (let i = this.state.index; i <= (this.state.index + 2); i++) {
      if (this.state.widgets[i] === undefined) {
        break;
      }

      widgets.push(
        <SCFeedWidget
          key={i}
          dbId={this.state.widgets[i].id}
          songId={this.state.widgets[i].songId}
          songName={this.state.widgets[i].songName}
          artistName={this.state.widgets[i].artistName}
          musicComments={this.props.musicComments}
          userInfo={this.props.userInfo}
          backgroundPhoto={this.state.widgets[i].photoUrl}
          updateMusicQueue={this.props.updateMusicQueue}
        />
      );
    }

    return widgets;
  }

  forward() {
    if ((this.state.index + 6) >= this.state.widgets.length) {
      this.setState({ max: true });
    }

    this.setState({ nextWidgets: true, previousWidgets: false, index: this.state.index + 3, min: false });
  }

  showNext() {
    const widgets = [];

    for (let i = this.state.index; i <= (this.state.index + 2); i++) {
      if (this.state.widgets[i] === undefined) {
        break;
      }

      widgets.push(
        <SCFeedWidget
          key={i}
          dbId={this.state.widgets[i].id}
          songId={this.state.widgets[i].songId}
          songName={this.state.widgets[i].songName}
          artistName={this.state.widgets[i].artistName}
          musicComments={this.props.musicComments}
          userInfo={this.props.userInfo}
          backgroundPhoto={this.state.widgets[i].photoUrl}
          updateMusicQueue={this.props.updateMusicQueue}
        />
      );
    }

    return widgets;
  }

  displayWidgets() {
    if (this.state.widgets.length > 3) {
      return (
        <div className="col s12">
          <h5 className="center-align" style={{borderBottom: '1px solid lightgrey', borderTop: '1px solid lightgrey', padding: '25px 0 25px 0', margin: '0', background: '#20daa5', color: 'white', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '42px', letterSpacing: '1.5px'}}>{this.props.musicMood}</h5>
          <div style={{margin: '0 35px 0 35px'}}>
            <div className="row" style={{marginTop: '50px', position: 'relative'}}>
              <div id={Styles.buttonsContainer}>
                <button onClick={this.previous} disabled={this.state.min}>Backward</button>
                <button onClick={this.forward} disabled={this.state.max}>forward</button>
              </div>
              {this.state.nextWidgets ? this.showNext() : this.showPrevious() }
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col s12">
          <h5 className="center-align" style={{borderBottom: '1px solid lightgrey', borderTop: '1px solid lightgrey', padding: '25px 0 25px 0', margin: '0', background: '#20daa5', color: 'white', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '42px', letterSpacing: '1.5px'}}>{this.props.musicMood}</h5>
          <div style={{margin: '0 35px 0 35px'}}>
            <div className="row">
              { this.threeOrLessWidgets() }
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.state.widgets.length === 0) {
      return false;
    }

    return (
      <div>
        { this.displayWidgets() }
      </div>
    )
  }
}
