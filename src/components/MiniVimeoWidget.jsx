import React from 'react';

export default class MiniVimeoWidget extends React.Component {
  render() {
    const src = `https://player.vimeo.com/video/${this.props.videoId}?portrait=0&title=0&byline=0&badge=0&autopause=0&player_id=0&amp;color=20daa5&amp;background=000000`

    return (
      <div className="col s4" style={{padding: '0'}}>
        <iframe src={src} width="100%" height="100px" frameBorder="0" allowFullScreen></iframe>
      </div>
    );
  }
}
