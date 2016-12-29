import React from 'react';
import axios from 'axios';
import SCFeedWidget from './SCFeedWidget';
import Styles from './css/moodSection';

export default class MoodSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      widgets: [],
      showingNext: true,
      showingPrevious: false,
      index: 0
    }

    this.test = this.test.bind(this);
    this.shownWidgets = this.shownWidgets.bind(this);
    // this.showPrevious = this.showPrevious.bind(this);
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

  shownWidgets() {
    const widgets = this.state.widgets.map((widget, i) => {
      if (i <= 2) {
        return <SCFeedWidget
          key={i}
          songId={widget.songId}
          songName={widget.songName}
          artistName={widget.artistName}
          widgets={this.state.widgets}
        />
      }
    });

    return widgets;
  }

  previous() {
    this.setState({showingNext: false, showingPrevious: true, index: this.state.index - 3 });
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
          songId={this.state.widgets[i].songId}
          songName={this.state.widgets[i].songName}
          artistName={this.state.widgets[i].artistName}
        />
      );
    }

    return widgets;
  }

  forward() {
    this.setState({ showingNext: true, showingPrevious: false, index: this.state.index + 3 });
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
          songId={this.state.widgets[i].songId}
          songName={this.state.widgets[i].songName}
          artistName={this.state.widgets[i].artistName}
        />
      );
    }

    return widgets;
  }

  test() {
    if (this.state.widgets.length > 3) {
      return (
        <div className="col s12">
          <h5 className="center-align" style={{borderBottom: '1px solid lightgrey', borderTop: '1px solid lightgrey', padding: '50px 0 50px 0', margin: '0', background: '#20daa5', color: 'white', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '42px', letterSpacing: '1.5px'}}>{this.props.musicMood}</h5>
          <div style={{margin: '0 35px 0 35px'}}>
            <div className="row" style={{marginTop: '50px', position: 'relative'}}>
              <div id={Styles.buttonsContainer}>
                <button onClick={this.previous}>Backward</button>
                <button onClick={this.forward}>forward</button>
              </div>
              {this.state.showingNext ? this.showNext() : this.showPrevious() }
              {/* {this.state.showingPrevious ?  this.showPrevious() : this.shownWidgets()} */}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col s12">
          <h5 className="center-align" style={{borderBottom: '1px solid lightgrey', borderTop: '1px solid lightgrey', padding: '50px 0 50px 0', margin: '0', background: '#20daa5', color: 'white', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '42px', letterSpacing: '1.5px'}}>{this.props.musicMood}</h5>
          <div style={{margin: '0 35px 0 35px'}}>
            <div className="row">
              { this.shownWidgets() }
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
        { this.test() }
      </div>
    )
  }
}
