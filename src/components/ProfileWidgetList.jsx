import React from 'react';
import SCMyProfileWidget from './SCMyProfileWidget';

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
              dbId={song.musicId}
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
