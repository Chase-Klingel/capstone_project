// import React from 'react';
// import axios from 'axios';
// import SC from 'soundcloud';
//
// const corsURL = 'https://cors-anywhere.herokuapp.com/';
// const clientId = 'client_id=c6e1e2a98490d428460f8d36af919bb4&limit=100&offset=0';
// let songUploads = [];
//
// SC.initialize({
//   client_id: 'c6e1e2a98490d428460f8d36af919bb4'
// });
//
// export default class UploadsContainer extends React.Component {
//   constructor(props) {
//     super(props);
//
//     if (this.props.vimeoUser) {
//
//     } else {
//       axios.get('/api/sc-user')
//         .then((res) => {
//           this.props.getUserInfo(res.data);
//         })
//         .then(() => {
//           const name = this.props.userInfo[0].scUsername;
//           axios.get(`${corsURL}http://api.soundcloud.com/resolve?url=http://soundcloud.com/${name}&${clientId}`)
//             .then((res) => {
//               const id = res.data.id;
//
//               return id;
//             })
//             .then((id) => {
//               SC.get('/tracks', {
//                 user_id: id, limit: 100
//               })
//               .then((tracks) => {
//                 for (let i = 0; i < tracks.length; i++) {
//                   let src = tracks[i].permalink_url;
//                   let name = tracks[i].title;
//                   let song = { src: src, name: name };
//                   songUploads = songUploads.concat(song);
//                 }
//
//                 return songUploads;
//               })
//               .catch((err) => {
//                 return err;
//               })
//             })
//             .catch((err) => {
//               return err;
//             })
//         })
//         .catch((err) => {
//           return err;
//         });
//     }
//   }
//
//   render() {
//     if (this.props.userInfo.length === 0) {
//       return false;
//     }
//
//     return (
//       <div className="container">
//         <div className="row">
//           <WidgetList
//             uploads={this.props.uploads}
//           />
//         </div>
//       </div>
//     );
//   }
// }





// this is where you were trying to set uploads

//    .then((songUploads) => {
//      console.log(songUploads.length, ' length');
//      return songUploads;
//    })
//    .then((songUploads) => {
//      axios.post('/api/music/bulk', {
//        songList: songUploads
//      })
 //
//      return songUploads;
//    })
//    .then((songUploads) => {
//      console.log('here duddeeeee');
//      // this shit is fucking things up
//      this.props.getSongUploads(songUploads);
//    })
//    .catch((err) => {
//      return err;
//    })
//  })
