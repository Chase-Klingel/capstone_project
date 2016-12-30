import React from 'react';
import Modal from 'boron/FadeModal';
import axios from 'axios';
import classnames from 'classnames';
import Comments from './Comments';
import Styles from './css/commentModal';

const contentStyle = {
    borderRadius: '5px'
};

const modalStyle = {
  height: '500px',
  overflowY: 'scroll'
};

export default class CommentModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  componentDidMount() {
    if (this.props.videoId) {
      const comments = this.props.videoComments.filter((comment) => {
        return comment.videoId === this.props.dbId;
      });

      console.log(comments, ' comments');

      this.setState({ comments: comments });
    } else {
      const comments = this.props.musicComments.filter((comment) => {
        return comment.songId === this.props.songId;
      });

      this.setState({ comments: comments });
    }
  }

  showModal() {
    this.refs['modal'].show();
  }

  hideModal() {
    this.refs['modal'].hide();
  }

  postComment(e) {
    e.preventDefault();

    if (this.props.userInfo[0].vimeoUsername && this.props.songId) {
      const newComment = { commenterPhotoUrl: this.props.userInfo[0].photoUrl, commenter: this.props.userInfo[0].vimeoUsername, comment: this.refs['comment'].value, songId: this.props.songId }
      const nextComments = this.state.comments.concat(newComment);
      this.setState({ comments: nextComments });

      axios.post('/api/music-comments', {
        musicId: this.props.dbId,
        commenter: this.props.userInfo[0].vimeoUsername,
        commenterPhotoUrl: this.props.userInfo[0].photoUrl,
        comment:  this.refs['comment'].value,
        viewed: false
      })
      .catch((err) => {
        return err;
      })
    } else if (this.props.userInfo[0].vimeoUsername && this.props.videoId) {
      console.log('this one');
      const newComment = { commenterPhotoUrl: this.props.userInfo[0].photoUrl, commenter: this.props.userInfo[0].vimeoUsername, comment: this.refs['comment'].value, videoId: this.props.videoId }
      const nextComments = this.state.comments.concat(newComment);
      this.setState({ comments: nextComments });

      axios.post('/api/videos-comments', {
        videoId: this.props.dbId,
        commenter: this.props.userInfo[0].vimeoUsername,
        commenterPhotoUrl: this.props.userInfo[0].photoUrl,
        comment:  this.refs['comment'].value,
        viewed: false
      })
      .then((res) => {
        console.log(res.data, ' here is your data');
      })
      .catch((err) => {
        return err;
      })
    } else if (this.props.userInfo[0].scUsername && this.props.songId) {
      const newComment = { commenterPhotoUrl: this.props.userInfo[0].photoUrl, commenter: this.props.userInfo[0].scUsername, comment: this.refs['comment'].value, songId: this.props.songId }
      const nextComments = this.state.comments.concat(newComment);
      this.setState({ comments: nextComments });

      axios.post('/api/music-comments', {
        musicId: this.props.dbId,
        commenter: this.props.userInfo[0].scUsername,
        commenterPhotoUrl: this.props.userInfo[0].photoUrl,
        comment:  this.refs['comment'].value,
        viewed: false
      })
      .catch((err) => {
        return err;
      })
    } else {
      const newComment = { commenterPhotoUrl: this.props.userInfo[0].photoUrl, commenter: this.props.userInfo[0].scUsername, comment: this.refs['comment'].value, dbId: this.props.dbId }
      const nextComments = this.state.comments.concat(newComment);
      this.setState({ comments: nextComments });

      axios.post('/api/videos-comments', {
        videoId: this.props.dbId,
        commenter: this.props.userInfo[0].scUsername,
        commenterPhotoUrl: this.props.userInfo[0].photoUrl,
        comment:  this.refs['comment'].value,
        viewed: false
      })
      .catch((err) => {
        return err;
      })
    }


    this.refs['comment'].value = '';
    return false;
  }

  render() {
    return (
      <div className={Styles.modalContainer}>
        <button onClick={this.showModal}>comments</button>
        <Modal ref="modal" contentStyle={contentStyle} modalStyle={modalStyle}>
          <div className={classnames('col', 's12', Styles.commentsContainer)}>
            <Comments
              comments={this.state.comments}
            />
            <div className="col s12">
              <textarea className={Styles.commentBox} ref="comment" placeholder='Write a comment...'></textarea>
            </div>
            <div className={Styles.buttonContainer}>
              <button type="submit" className={Styles.commentButton} onClick={this.postComment}>post comment</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
