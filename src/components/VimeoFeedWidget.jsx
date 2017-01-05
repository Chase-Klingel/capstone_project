import React from 'react';
import classnames from 'classnames';
import CommentModal from './CommentModal';
import QueueButton from './QueueButton';
import Styles from './css/VimeoFeedWidget';
import PlayButton from './PlayButton';

export default class VimeoFeedWidget extends React.Component {
  constructor(props) {
    super(props);

    this.queueButton = this.queueButton.bind(this);
  }
  queueButton() {
    if (this.props.scUser === true) {
      return (
        <div style={{display: 'inline'}}>
          <QueueButton
            dbId={this.props.dbId}
            profilePhoto={this.props.profilePhoto}
            videoId={this.props.videoId}
            videoName={this.props.videoName}
            producerName={this.props.producerName}
            videoComments={this.props.videoComments}
            updateVideoQueue={this.props.updateVideoQueue}
            videoQueue={this.props.videoQueue}
            scUser={this.props.scUser}
          />
        </div>
      )
    }
  }
  render() {
    const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`

    return (
      <div className='col s12 m4' style={{marginTop: '50px', marginBottom: '50px'}}>
        <div className={Styles.videoWrapper}>
          <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
        </div>
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
    );
  }
}
