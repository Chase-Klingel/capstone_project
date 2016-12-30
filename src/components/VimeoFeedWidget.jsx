import React from 'react';
import CommentModal from './CommentModal';

export default class VimeoFeedWidget extends React.Component {

  render() {
    const src = `https://player.vimeo.com/video/${this.props.videoId}?badge=0&autopause=0&player_id=0&amp;color=daa520&amp;background=000000`

    return (
      <div className='col s12 m4' style={{marginTop: '50px', marginBottom: '50px'}}>
        <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
        <div style={{display: 'inline'}}>
          <button>Add to Queue</button>
        </div>
        <CommentModal
          dbId={this.props.dbId}
          videoId={this.props.videoId}
          videoComments={this.props.videoComments}
          userInfo={this.props.userInfo}
        />
      </div>
    );
  }
}
