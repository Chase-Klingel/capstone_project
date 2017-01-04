import React from 'react';
import SCProfileWidget from './SCProfileWidget';
import SCMyProfileWidget from './SCMyProfileWidget';
import VimeoProfileWidget from './VimeoProfileWidget';

export default class WidgetList extends React.Component {
  constructor(props) {
    super(props);

    this.widgetList = this.widgetList.bind(this);
  }

  widgetList() {
    if (this.props.vimeoUser && this.props.uploads) {
      const widgetList = this.props.uploads.map((video, i) => {
        return (
          <VimeoProfileWidget
            key={i}
            index={i}
            videoId={video.videoId}
            videoName={video.videoName}
            uploads={this.props.uploads}
            getUploads={this.props.getUploads}
            vimeoUser={this.props.vimeoUser}
          />
        );
      });

      return widgetList;
    } else if (this.props.scUser && this.props.uploads) {
      const widgetList = this.props.uploads.map((song, i) => {
        return (
          <SCProfileWidget
            key={i}
            songId={song.songId}
            songName={song.songName}
            artistName={song.artistName}
            getUploads={this.props.getUploads}
            uploads={this.props.uploads}
          />
        );
      });

      return widgetList;
    }
  }

  render() {
    return (
      <div>
        { this.widgetList() }
      </div>
    )
  }
}
