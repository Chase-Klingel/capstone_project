import React from 'react';
import axios from 'axios';
const corsURL = 'https://cors-anywhere.herokuapp.com/';
const clientId = 'client_id=c6e1e2a98490d428460f8d36af919bb4&limit=100&offset=0';
import SC from 'soundcloud';

SC.initialize({
  client_id: 'c6e1e2a98490d428460f8d36af919bb4'
});

export default class UploadsContainer extends React.Component {
  constructor(props) {
    super(props);

    axios.get('/api/sc-user')
      .then((res) => {
        this.props.getUserInfo(res.data);
      })
      .catch((err) => {
        return err;
      })

    this.importContent = this.importContent.bind(this);
  }

  importContent() {
    if (this.props.vimeoUser) {
      // getting vimeo videos
      return <div>not right</div>
    } else {
      const name = this.props.userInfo[0].scUsername
      axios.get(`${corsURL}http://api.soundcloud.com/resolve?url=http://soundcloud.com/${name}&${clientId}`)
         .then((res) => {
           const id = res.data.id;
           return id;
         })
         .then((id) => {
           SC.get('/tracks', {
             user_id: id, limit: 100
           }).then((tracks) => {
             console.log(tracks, ' tracks');
            //  for (let i = 0; i < tracks.length; i++) {
            //    const nextSrc = `https://w.soundcloud.com/player/?visual=true&url=${tracks[i].permalink_url}`;
            //    const newSrcList = this.state.srcList.concat(nextSrc);
            //    this.setState({ srcList: newSrcList });
            //  }
           })
         })
         return <div>blah</div>
    }
  }

  render() {
    if (this.props.userInfo.length === 0) {
      return false;
    }

    return (
      <div>
        { this.importContent() }
      </div>
    );
  }
}
