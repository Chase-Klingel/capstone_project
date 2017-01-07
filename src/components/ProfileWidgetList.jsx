import React from 'react';
import SCMyProfileWidget from './SCMyProfileWidget';
import VimeoMyProfileWidget from './VimeoMyProfileWidget';

export default class ProfileWidgetList extends React.Component {
  constructor(props) {
    super(props);

    this.widgetList.bind(this);
  }

  widgetList() {
    if (this.props.scUser && this.props.profileContent) {
      const widgetList = this.props.profileContent.map((song, i) => {
        return (
          <SCMyProfileWidget
            key={i}
            dbId={song.id}
            songId={song.songId}
            songName={song.songName}
            artistName={song.artistName}
            userInfo={this.props.userInfo}
            backgroundPhoto={song.photoUrl}
          />
        );
      });

      const songIdSet = new Set();

      for (let i = widgetList.length - 1; i >= 0; i--) {
        console.log(widgetList[i]);
        if (songIdSet.has(widgetList[i].props.songId)) {
          widgetList.splice(i,1);
        } else {
          songIdSet.add(widgetList[i].props.songId);
        }
      }

      return widgetList;
    } else {
      const widgetList = this.props.profileContent.map((video, i) => {
        console.log(video.id);
        return (
          <VimeoMyProfileWidget
            key={i}
            dbId={video.id}
            videoId={video.videoId}
            videoName={video.videoName}
            producerName={video.producerName}
            userInfo={this.props.userInfo}
            vimeoUser={this.props.vimeoUser}
          />
        );
      });

      const videoIdSet = new Set();

      for (let i = widgetList.length - 1; i >= 0; i--) {
        if (videoIdSet.has(widgetList[i].props.videoId)) {
          widgetList.splice(i,1);
        } else {
          videoIdSet.add(widgetList[i].props.videoId);
        }
      }

      return widgetList;
    }
  }

  render() {
    return (
      <div className="container">
        { this.widgetList() }
      </div>
    )
  }
}
