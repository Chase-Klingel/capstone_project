import React from 'react';
import classnames from 'classnames';
import ProfileCommentModal from './ProfileCommentModal';
import QueueButton from './QueueButton';
import Styles from './css/vimeoFeedWidget';

export default class VimeoMyProfileWidget extends React.Component {
  render() {
    const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`

    return (
      <div className='col s12 m4' style={{marginTop: '70px', marginBottom: '50px'}}>
        <div className={Styles.videoWrapper}>
          <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
          <h5 className={Styles.videoName}>{this.props.videoName} | Produced by <span className={Styles.producerName}>{this.props.producerName}</span></h5>
        </div>
        <div style={{marginTop: '10px'}}>
          <ProfileCommentModal
            dbId={this.props.dbId}
            videoId={this.props.videoId}
            userInfo={this.props.userInfo}
            videoName={this.props.videoName}
            producerName={this.props.producerName}
          />
        </div>
      </div>
    );
  }
}
