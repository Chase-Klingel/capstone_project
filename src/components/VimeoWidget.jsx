import React from 'react';
import classnames from 'classnames';
import MoodButton from './MoodButton';
import NeedsMusicButton from './NeedsMusicButton';

export default class VimeoWidget extends React.Component {
  render() {
    const src = `https://player.vimeo.com/video/${this.props.videoId}?badge=0&autopause=0&player_id=0&amp;color=daa520&amp;background=000000`

    return (
      <div className={classnames('col', 's12', 'm6', 'widgetContainer')}>
        <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
        <h5>{this.props.videoName}</h5>
        <MoodButton
          index={this.props.index}
          vimeoUser={this.props.vimeoUser}
          videoId={this.props.videoId}
          videoName={this.props.videoName}
          getUploads={this.props.getUploads}
          uploads={this.props.uploads}
        />
        <NeedsMusicButton
          index={this.props.index}
          videoId={this.props.videoId}
          videoName={this.props.videoName}
          getUploads={this.props.getUploads}
          uploads={this.props.uploads}
        />
      </div>
    );
  }
}
