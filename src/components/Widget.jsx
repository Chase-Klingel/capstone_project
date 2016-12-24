import React from 'react';
import Player from 'react-soundcloud-player';
const clientId = 'c6e1e2a98490d428460f8d36af919bb4';

export default class Widget extends React.Component {
  render() {
    return (
      <div className="col s12 m6">
        <Player audio_id='193179003' title='Easyfun - Fanta' />
        <h5>title goes here</h5>
      </div>
    )
  }
}

// export default class Widget extends React.Component {
//   render() {
//     return (
//       <div className="col s12 m6">
//         <iframe src={`https://w.soundcloud.com/player?url=${this.props.src}`} width="100%" height="267" scrolling="no"></iframe>
//         <h5>title goes here</h5>
//       </div>
//     )
//
//   }
// }
