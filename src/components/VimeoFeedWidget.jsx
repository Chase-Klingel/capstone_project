import React from 'react';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import CommentModal from './CommentModal';
import QueueButton from './QueueButton';
import Styles from './css/vimeoFeedWidget';
import PlayButton from './PlayButton';

export default class VimeoFeedWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: ''
    }

    this.queueButton = this.queueButton.bind(this);
    this.getProducerName = this.getProducerName.bind(this);
  }
  queueButton() {
    if (this.props.scUser === true || !this.props.loggedIn) {
      // do logic for seeing if videoID is in videoQueue
        // if it is, then set prop 'added' to true
      let videoAdded = false;

      const videoInQueue = this.props.videoQueue.filter((video) => {
        return this.props.videoId === video.videoId;
      });

      if (videoInQueue.length === 1) {
        videoAdded = true;
      }

      return (
        <div style={{display: 'inline'}}>
          <QueueButton
            loggedIn={this.props.loggedIn}
            dbId={this.props.dbId}
            profilePhoto={this.props.profilePhoto}
            videoId={this.props.videoId}
            videoName={this.props.videoName}
            producerName={this.props.producerName}
            videoComments={this.props.videoComments}
            updateVideoQueue={this.props.updateVideoQueue}
            videoQueue={this.props.videoQueue}
            scUser={this.props.scUser}
            videoAdded={videoAdded}
          />
        </div>
      )
    }
  }


  getProducerName(producerName) {
    this.props.getUserId(this.props.userId, 'vimeo user');
    this.setState({ redirect: `/user/${producerName.toLowerCase()}`});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
    }

    const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`

    return (
      <div className='col s12 m4' style={{marginTop: '70px', marginBottom: '50px'}}>
        <div className={Styles.videoWrapper}>
          <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
          <h5 className={Styles.videoName}>{this.props.videoName} | Produced by <span className={Styles.producerName}><button onClick={this.getProducerName.bind(this, this.props.producerName)}>{this.props.producerName}</button></span></h5>
          {/* <h6 className={Styles.producerName}>Posted by: </h6> */}
        </div>
        <div style={{marginTop: '10px'}}>
          { this.queueButton() }
          <CommentModal
            dbId={this.props.dbId}
            videoId={this.props.videoId}
            videoComments={this.props.videoComments}
            userInfo={this.props.userInfo}
            videoName={this.props.videoName}
            producerName={this.props.producerName}
          />
        </div>
      </div>
    );
  }
}
