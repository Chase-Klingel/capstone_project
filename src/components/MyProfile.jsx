// import React from 'react';
// import axios from 'axios';
// import WidgetList from './WidgetList';
//
// export default class MyProfile extends React.Component {
//   constructor(props) {
//     super(props);
//
//     if (/* vimeo user and looking for own profile  */) {
//       // axios.get('/api/videos')
//           // then some callback to set state for 'profileContent'
//     } else {
//       // axios.get('/api/music')
//         // then some callback to set state for 'profileContent'
//     }
//   }
//
//   render() {
//     if (this.props.profileContent.length === 0) {
//       return false;
//     }
//
//     return (
//       <div className="container">
//         <div className="row">
//           <WidgetList
//             vimeoUser={this.props.vimeoUser}
//             scUser={this.props.scUser}
//             profileContent={this.props.profileContent}
//           />
//         </div>
//       </div>
//     );
//   }
