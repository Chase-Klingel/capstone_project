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
    borderRadius: '5px'
};

const modalStyle = {
  maxHeight: '500px',
  overflowY: 'scroll'
};

export default class CommentModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }

    this.commentModal = this.commentModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  componentDidMount() {
    if (this.props.videoId) {
      const comments = this.props.videoComments.filter((comment) => {
        return comment.videoId === this.props.dbId;
      });

      this.setState({ comments: comments });
    } else {
      const comments = this.props.musicComments.filter((comment) => {
        return comment.songId === this.props.songId;
      });

      console.log(comments, ' comments');

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

  commentModal() {
    if (this.props.songId && this.props.musicQueue) {
      return (
        <div className={Styles.modalContainer}>
          <button onClick={this.showModal} style={{border: 'none', background: 'transparent', color: 'grey'}}>
            <img src={CommentIcon} height='30px' width='30px' style={{position: 'relative', top: '7px'}} />
            <span style={{marginLeft: '10px'}}>Comments</span>
          </button>
          <Modal ref="modal" contentStyle={contentStyle} modalStyle={modalStyle}>
            <div className={classnames('col', 's12', Styles.commentsContainer)}>
              <h4 className={classnames('center-align', Styles.commentHeader)}>comments</h4>
              <SCCommentWidget
                songId={this.props.songId}
                artistName={this.props.artistName}
                songName={this.props.songName}
                backgroundPhoto={this.props.backgroundPhoto}
              />
              <Comments
                comments={this.props.musicComments}
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
      );
    } else if (this.props.songId) {
      return (
        <div className={Styles.modalContainer}>
          <button onClick={this.showModal} style={{border: 'none', background: 'transparent', color: 'grey'}}>
            <img src={CommentIcon} height='30px' width='30px' style={{position: 'relative', top: '7px'}} />
            <span style={{marginLeft: '10px'}}>Comments</span>
          </button>
          <Modal ref="modal" contentStyle={contentStyle} modalStyle={modalStyle}>
            <div className={classnames('col', 's12', Styles.commentsContainer)}>
              <h4 className={classnames('center-align', Styles.commentHeader)}>comments</h4>
              <SCCommentWidget
                songId={this.props.songId}
                artistName={this.props.artistName}
                songName={this.props.songName}
                backgroundPhoto={this.props.backgroundPhoto}
              />
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
      );
    } else {
      return (
        <div className={Styles.modalContainer}>
          <button onClick={this.showModal}>comments</button>
          <Modal ref="modal" contentStyle={contentStyle} modalStyle={modalStyle}>
            <div className={classnames('col', 's12', Styles.commentsContainer)}>
              <h4 className={classnames('center-align', Styles.commentHeader)} style={{zIndex: '1'}}>comments</h4>
              <VimeoCommentWidget
                videoId={this.props.videoId}
                videoName={this.props.videoName}
                producerName={this.props.producerName}
              />
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
      );
    }
  }

  render() {
    return (
      <div style={{display: 'inline'}}>
        { this.commentModal() }
      </div>
    )
  }
}
