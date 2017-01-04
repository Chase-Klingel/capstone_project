import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
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
          musicQueue={this.props.musicQueue}
          vimeoUser={this.props.vimeoUser}
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
          musicQueue={this.props.musicQueue}
          vimeoUser={this.props.vimeoUser}
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
          musicQueue={this.props.musicQueue}
          vimeoUser={this.props.vimeoUser}
        />
      );
    }

    return widgets;
  }

  displayWidgets() {
    if (this.state.widgets.length > 3) {
      return (
        <div className="col s12">
          <h5 className="center-align" style={{padding: '25px 0 25px 0', margin: '0', background: 'rgb(17,123,189)', color: 'white', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '42px', letterSpacing: '1.5px'}}>{this.props.musicMood}</h5>
          <div style={{margin: '0 35px 0 35px'}}>
            <div className="row" style={{marginTop: '50px', position: 'relative'}}>
              <div className={Styles.arrowsContainer}>
                <button className={classnames(Styles.arrow, Styles.left)} onClick={this.previous} disabled={this.state.min}>
                  <svg width="80px" height="30px" viewBox="0 0 50 80">
                    <polyline fill="none" stroke="#9d9d9d"  points="
	                     45.63,75.8 0.375,38.087 45.63,0.375 "/>
                  </svg>
                </button>
                <button className={classnames(Styles.arrow, Styles.right)} onClick={this.forward} disabled={this.state.max}>
                  <svg  width="80px" height="30px" viewBox="0 0 50 80">
                  <polyline fill="none" stroke="#9d9d9d" points="
	                   0.375,0.375 45.63,38.087 0.375,75.8 "/>
                   </svg>
                 </button>
               </div>

              {this.state.nextWidgets ? this.showNext() : this.showPrevious() }
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col s12">
          <h5 className="center-align" style={{padding: '25px 0 25px 0', margin: '0', background: 'rgb(17,123,189)', color: 'white', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '42px', letterSpacing: '1.5px'}}>{this.props.musicMood}</h5>
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
