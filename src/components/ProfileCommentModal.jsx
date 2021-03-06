import React from 'react';
import Modal from 'boron/FadeModal';
import axios from 'axios';
import classnames from 'classnames';
import Comments from './Comments';
import SCCommentWidget from './SCCommentWidget';
import VimeoCommentWidget from './VimeoCommentWidget';
import Styles from './css/commentModal';
import CommentIcon from '../img/comment-button.png';


const contentStyle = {
    borderRadius: '5px',
};

const modalStyle = {
  maxHeight: '500px'
};

const editModalStyle = {
  maxHeight: '450px',
  zIndex: '10000',
  marginTop: '50px'
};

export default class ProfileCommentModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }

    this.commentModal = this.commentModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.postComment = this.postComment.bind(this);
    this.commentButton = this.commentButton.bind(this);
    this.widget = this.widget.bind(this);
  }

  componentDidMount() {
    console.log('mounting');
    if (this.props.producerName) {
      console.log(this.props.userId, ' producer user id');
      axios.get(`/api/user/videos/comments/${this.props.userId}`)
        .then((res) => {
          let comments = res.data;

          console.log(comments, ' video comments');

          comments = comments.filter((comment) => {
            return comment.videoId === this.props.dbId;
          });

          console.log(comments, ' video comments after filter');

          this.setState({ comments: comments });
        })
        .catch((err) => {
          return err;
        })
    } else {
      console.log('artist name');
      axios.get(`/api/user/music/comments/${this.props.userId}`)
        .then((res) => {
          let comments = res.data;

          console.log(comments, ' music comments');

          comments = comments.filter((comment) => {
            return comment.songId === this.props.songId;
          });

          console.log(comments, ' music comments after filter');

          this.setState({ comments: comments });
        })
        .catch((err) => {
          return err;
        })
    }
  }

  showModal() {
    console.log(this.state.comments);
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
    } else if (this.props.userInfo[0].vimeoUsername && this.props.videoId) {
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

  commentButton() {
    return (
      <div style={{display: 'inline'}}>
        <button onClick={this.showModal} id={Styles.feedCommentButton}>
          Comments
        </button>
      </div>
    );
  }


  widget() {
    if (this.props.songId) {
      return (
        <SCCommentWidget
          songId={this.props.songId}
          artistName={this.props.artistName}
          songName={this.props.songName}
          backgroundPhoto={this.props.backgroundPhoto}
        />
      );
    } else {
      return (
        <VimeoCommentWidget
          videoId={this.props.videoId}
          videoName={this.props.videoName}
          producerName={this.props.producerName}
        />
      );
    }
  }

  commentModal() {
    return (
      <div className={Styles.modalContainer}>
        { this.commentButton() }
        <Modal ref="modal" contentStyle={contentStyle} modalStyle={editModalStyle}>
          <div className={classnames('col', 's12', Styles.commentsContainer)}>
            <div className={Styles.header}>
              <h4 className={classnames('center-align', Styles.commentHeader)}>comments</h4>
              { this.widget() }
            </div>
            <Comments
              comments={this.state.comments}
            />
            <form onSubmit={this.postComment}>
              <div className="col s12">
                <textarea className={Styles.commentBox} ref="comment" placeholder='Write a comment...'></textarea>
              </div>
              <div className={Styles.buttonContainer}>
                <button type="submit" className={Styles.commentButton}>post comment</button>
              </div>
            </form>
            </div>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div style={{display: 'inline'}}>
        { this.commentModal() }
      </div>
    )
  }
}
