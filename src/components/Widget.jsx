import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import FormatTime from './FormatTime'
import classnames from 'classnames';
import Play from './Play'
import Pause from './Pause'
import Replay from './Replay'
import Forward from './Forward'
import Styles from './css/widget'


/**
 * SoundCloud Player
 * A simple SoundCloud player.
**/
export default class Widget extends Component {

  static get propTypes () {
    return {
      audio_id: PropTypes.string.isRequired,
      title: PropTypes.string,
      link: PropTypes.string
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      audioPlayer: null,
      percent_remains: 100,
      percent_progress_remains: 100,
      duration: '0:00',
      current_time: '0:00',
      client_id: 'c6e1e2a98490d428460f8d36af919bb4'
    }
  }

  componentDidMount() {
    this.setState({ audioPlayer: ReactDOM.findDOMNode(this.refs.audio) }, () => {
      this.state.audioPlayer.ontimeupdate = () => { this.timeUpdated() };
      this.state.audioPlayer.onprogress = () => { this.progressUpdated() };
    })
  }

  togglePlay () {
    const { playing, audioPlayer } = this.state;
    this.setState({ playing: !playing, showAudioPlayer: true }, () => {
      if (audioPlayer.paused) {
        audioPlayer.play()
      }
      if (!this.state.playing) {
        if (!audioPlayer.buffered.length) return;
        audioPlayer.pause()
      }
    })
  }

  timeUpdated() {
    const { playing, audioPlayer } = this.state;
    if(audioPlayer == undefined){ return }
    let percent = (audioPlayer.currentTime / audioPlayer.duration) * 100
    this.setState({ current_time: FormatTime(audioPlayer.currentTime) })
    this.setState({ duration: FormatTime(audioPlayer.duration) })
    this.setState({ percent_remains: 100 - percent})
  }

  progressUpdated() {
    const { playing, audioPlayer } = this.state;
    if (audioPlayer == undefined) return;
    if (!audioPlayer.buffered.length) return;
    var bufferedEnd = audioPlayer.buffered.end(audioPlayer.buffered.length - 1);
    if (audioPlayer.duration > 0) {
      let percent_remains = (bufferedEnd / audioPlayer.duration) * 100
      this.setState({ percent_progress_remains: 100 - percent_remains})
    }
  }

  positionChange (e) {
    const { audioPlayer } = this.state
    let elem = ReactDOM.findDOMNode(this.refs.progress)
    let elemRect = elem.getClientRects()
    let elemLeft = elemRect[0].left
    let elemWidth = elemRect[0].width
    let clickPositionLeft = e.pageX
    let percent_remains =  100 - ( (clickPositionLeft - elemLeft) / elemWidth * 100 )
    let newTime = audioPlayer.duration - ( audioPlayer.duration * (percent_remains / 100) )
    audioPlayer.currentTime = Math.floor(newTime)
    setTimeout( () => {
      if(audioPlayer.paused) { this.togglePlay() }
    }, 1000)
  }

  forward() {
    const { audioPlayer } = this.state
    let newTime = audioPlayer.currentTime + 30
    if(newTime < audioPlayer.duration) {
      audioPlayer.currentTime = Math.floor(newTime)
    }
  }

  replay() {
    const { audioPlayer } = this.state
    let newTime = audioPlayer.currentTime - 30
    if(newTime > 0) {
      audioPlayer.currentTime = Math.floor(newTime)
    }
  }

  renderPlayerIcons() {
    const { playing } = this.state

    let skipButtons = (
      <span className={Styles.player__control__iconsSkip}>
        <div className={Styles.player__control__icon} onClick={this.forward.bind(this)}>
          <Forward  />
        </div>
        <div className={Styles.player__control__icon} onClick={this.replay.bind(this)}>
          <Replay onClick={this.replay.bind(this)} />
        </div>
      </span>
    )

    if (playing) {
      return (
        <div className={Styles.player__control__iconsPause}>
          <div className={Styles.player__control__icon} onClick={this.togglePlay.bind(this)}>
            <Pause  />
          </div>
          {skipButtons}
        </div>
      );
    }

    return (
      <div className={Styles.player__control__iconsPlay}>
        <div className={Styles.player__control__icon} onClick={this.togglePlay.bind(this)}>
          <Play />
        </div>
        {skipButtons}
      </div>
    )
  }

  render () {
    const { audio_id, title, link } = this.props
    const { playing, audioPlayer, percent_remains, percent_progress_remains, duration, current_time, client_id } = this.state
    let streamUrl = `https://api.soundcloud.com/tracks/${this.props.src}/stream?client_id=c6e1e2a98490d428460f8d36af919bb4`
    let iconClass = playing ? 'player__control__icon--pause' : 'player__control__icon--play'
    iconClass += ' player__control__icon'
    let time_remains = { transform: `translateX(-${percent_remains.toString()}%)` }
    let progress_remains = { transform: `translateX(-${percent_progress_remains.toString()}%)` }

    return (
      <div className={classnames('col', 's12', 'm6', 'widgetContainer')}>
      	<div className={classnames(Styles.player,  Styles.player__trackActive)}>

          <audio id='audio' preload='none' ref='audio' src={streamUrl}></audio>

          <div className={Styles.player__control}>
            { this.renderPlayerIcons() }
          </div>

          <div className={Styles.player__display} onClick={this.positionChange.bind(this)}>
            <div>
              <h4 style={{fontSize: '14px'}}>{this.props.name}</h4>
            </div>
            <div className={Styles.player__progress}>
              <span className={Styles.player__progress__time}>{current_time}</span>
              <span className={Styles.player__progress__bar}>
                <span ref='progress' className={Styles.player__progress__barContainer}>

                  <span className={classnames(Styles.player__progress__barPercent, Styles.player__progress__barProgress)}
                        style={progress_remains}></span>
                  <span className={Styles.player__progress__barPercent} style={time_remains}></span>
                </span>
              </span>
              <span className={Styles.player__progress__time}>{duration}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}















// import React from 'react';
// import Player from 'react-soundcloud-player';
// // import classnames from 'classnames';
// import Styles from './css/widget';
//
// // className={classnames('player', 'player__control', 'player__control__icon', 'player__control__icon--play', 'player__control__icon--pause', 'player__track--active', 'player__display', 'player__progress', 'player__progress__position', 'player__progress__time', 'player__progress__bar', 'player__progress__bar--container', 'player__progress__bar--percent', 'player__progress__bar--progress' )}
//
// export default class Widget extends React.Component {
//   render() {
//     return (
//       <div className="col s12 m6">
//         <Player audio_id={this.props.src} title={this.props.name} />
//       </div>
//     )
//   }
// }

// export default class Widget extends React.Component {
//   render() {
//     return (
//       <div className="col s12 m6">
//         <iframe src={`https://w.soundcloud.com/player?url=${this.props.src}`} width="100%" height="267" scrolling="no"></iframe>
//         <h5>title goes here</h5>
//       </div>
//     )
//
//   }
// }
