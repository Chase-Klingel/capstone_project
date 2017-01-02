import React from 'react';
import classnames from 'classnames';
import Styles from './css/vimeoProfileWidget.css';
import MoodButton from './MoodButton';
import NeedsMusicButton from './NeedsMusicButton';

export default class VimeoProfileWidget extends React.Component {
  constructor(props) {
    super(props);

    this.renderWidget = this.renderWidget.bind(this);
  }
  renderWidget() {
    const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`

    if (this.props.uploads.length === 1) {
      return (
        <div className={classnames('col', 's12', 'm6', 'offset-m3', 'widgetContainer')}>
          <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
          <div className="row">
            <div className={classnames('col', 's6', Styles.button)} id={Styles.moodButton}>
              <MoodButton
                index={this.props.index}
                vimeoUser={this.props.vimeoUser}
                videoId={this.props.videoId}
                videoName={this.props.videoName}
                getUploads={this.props.getUploads}
                uploads={this.props.uploads}
              />
            </div>
            <div className={classnames('col', 's6', Styles.button)} id={Styles.needsMusicButton}>
              <NeedsMusicButton
                index={this.props.index}
                videoId={this.props.videoId}
                videoName={this.props.videoName}
                getUploads={this.props.getUploads}
                uploads={this.props.uploads}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classnames('col', 's12', 'm6', 'widgetContainer')}>
          <iframe src={src} width="100%" height="250px" frameBorder="0" allowFullScreen></iframe>
          <div className="row">
            <div className={classnames('col', 's6', Styles.button)} id={Styles.moodButton}>
              <MoodButton
                index={this.props.index}
                vimeoUser={this.props.vimeoUser}
                videoId={this.props.videoId}
                videoName={this.props.videoName}
                getUploads={this.props.getUploads}
                uploads={this.props.uploads}
              />
            </div>
            <div className={classnames('col', 's6', Styles.button)} id={Styles.needsMusicButton}>
              <NeedsMusicButton
                index={this.props.index}
                videoId={this.props.videoId}
                videoName={this.props.videoName}
                getUploads={this.props.getUploads}
                uploads={this.props.uploads}
              />
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        { this.renderWidget() }
      </div>
    )
  }
}
