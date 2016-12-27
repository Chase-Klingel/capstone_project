import React from 'react';
import SCProfileWidget from './SCProfileWidget';
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
          />
        );
      });

      return widgetList;
    // case where someone is returning to their own profile or to some other user's existing profile where their info is already stored in the db
    } else {
      const widgetList = this.props.profileContent.map((media, i) => {
        return (
          <Widget
            key={i}
            src={media.src}
            title={media.name} // this is assuming both vimeo and sc objects property for 'the name of the song' or 'the name of the video' is 'title'. If it isn't you will have to create another case to seperate the two concerns.
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
