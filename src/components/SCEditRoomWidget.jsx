import React from 'react';
import ReactDOM from 'react-dom';
import FormatTime from './FormatTime';
import classnames from 'classnames';
import Play from './Play';
import Pause from './Pause';
import Replay from './Replay';
import Forward from './Forward';
import CommentModal from './CommentModal';
import SCeditForward from './SCEditForward';
import SCeditPrevious from './SCEditPrevious';
import Styles from './css/scEditRoomWidget';

export default class SCEditRoomWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      audioPlayer: null,
      percent_remains: 100,
      percent_progress_remains: 100,
      duration: '0:00',
      current_time: '0:00',
      client_id: 'c6e1e2a98490d428460f8d36af919bb4',
    }

    this.renderWidget = this.renderWidget.bind(this);
    this.previous = this.previous.bind(this)
    this.forward = this.forward.bind(this);
    this.playlistCount = this.playlistCount.bind(this);
    this.commentModal = this.commentModal.bind(this);
    this.paused = this.paused.bind(this);
  }

  componentDidMount() {
    this.setState({ audioPlayer: ReactDOM.findDOMNode(this.refs.audio) }, () => {
      this.state.audioPlayer.ontimeupdate = () => { this.timeUpdated() };
      this.state.audioPlayer.onprogress = () => { this.progressUpdated() };
    })
  }

  togglePlay (operation) {
    if (operation === 'play') {
      this.props.setPlayingSong('play');
    } else {
      this.props.setPlayingSong('pause')
    }

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

  // pauses video when you exit testing mode
  paused() {
    if (this.props.playingSong || this.state.audioPlayer === null) {
      return;
    }

    this.state.audioPlayer.pause();
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

  renderPlayerIcons() {
    const { playing } = this.state

    if (playing) {
      return (
        <div>
          <div className={Styles.player__control__iconsPause}>
            <div className={Styles.player__control__icon} onClick={this.togglePlay.bind(this, 'pause')}>
              <Pause />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={Styles.player__control__iconsPlay}>
          <div className={Styles.player__control__icon} onClick={this.togglePlay.bind(this, 'play')}>
            <Play />
          </div>
        </div>
      </div>
    )
  }

  previous() {
    if (this.props.videoQueue) {
      return;
    }

    return (
      <SCeditPrevious
        previousTrack={this.props.previousTrack}
      />
    );
  }

  forward() {
    if (this.props.videoQueue) {
      return;
    }

    return (
      <SCeditForward
        nextTrack={this.props.nextTrack}
      />
    );
  }

  playlistCount() {
    if (this.props.videoQueue) {
      return;
    }

    return (
      <h5 className={Styles.playlistCount}>{this.props.songPosition}/{this.props.musicQueue.length}</h5>
    );
  }

  commentModal() {
    if (this.props.videoQueue) {
      return;
    }

    return (
      <CommentModal
        key={this.props.index}
        dbId={this.props.dbId}
        songId={this.props.songId}
        musicComments={this.props.musicComments}
        backgroundPhoto={this.props.backgroundPhoto}
        userInfo={this.props.userInfo}
        artistName={this.props.artistName}
        songName={this.props.songName}
        musicQueue={this.props.musicQueue}
        userInfo={this.props.userInfo}
      />
    );
  }


  renderWidget() {
    const { playing, audioPlayer, percent_remains, percent_progress_remains, duration, current_time, client_id } = this.state
    let streamUrl = `https://api.soundcloud.com/tracks/${this.props.songId}/stream?client_id=c6e1e2a98490d428460f8d36af919bb4`
    let iconClass = playing ? 'player__control__icon--pause' : 'player__control__icon--play'
    iconClass += ' player__control__icon'
    let time_remains = { transform: `translateX(-${percent_remains.toString()}%)` }
    let progress_remains = { transform: `translateX(-${percent_progress_remains.toString()}%)` }

    return (
      <div className={classnames(Styles.player,  Styles.editWidget)} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${this.props.backgroundPhoto})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}>
        { this.forward() }

        { this.playlistCount() }

        <audio id='audio' preload='none' ref='audio' src={streamUrl}></audio>

        <div className="center-align" style={{marginBottom: '30px'}}>
          <h4 className={Styles.artistName}><span style={{fontSize: '12px', textTransform: 'none'}}>Posted by:</span> {this.props.artistName}</h4>
          <h4 className={Styles.songName}>{this.props.songName}</h4>
        </div>


        <div className={Styles.player__display} onClick={this.positionChange.bind(this)}>

          <div className={Styles.player__progress}>
            <span className={Styles.player__progress__bar}>
              <span ref='progress' className={Styles.player__progress__barContainer}>

                <span className={classnames(Styles.player__progress__barPercent, Styles.player__progress__barProgress)}
                      style={progress_remains}></span>
                <span className={Styles.player__progress__barPercent} style={time_remains}></span>
              </span>
            </span>
          </div>
        </div>

        <div className={Styles.player__control}>
          { this.renderPlayerIcons() }
        </div>

        { this.paused() }


        { this.previous() }
        <div style={{marginTop: '40px'}}>
          { this.commentModal() }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        { this.renderWidget() }
      </div>
    )
  }
}
