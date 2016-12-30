import React from 'react';
import Styles from './css/comment';

export default class Comment extends React.Component {
  render() {
    return (
      <div id={Styles.commentContainer} className="col s12">
        <div className="col s2">
          <img id={Styles.profileImg} src={this.props.comment.commenterPhotoUrl} />
        </div>
        <div className="col s10">
          <h6 id={Styles.commenter}>{this.props.comment.commenter}</h6>
          <p id={Styles.comment}>{this.props.comment.comment}</p>
        </div>
      </div>
    )
  }
}
