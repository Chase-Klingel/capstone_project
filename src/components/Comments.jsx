import React from 'react';
import Comment from './Comment';


export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.renderComments = this.renderComments.bind(this);
  }

  renderComments() {
    const comments = [];
    for (let i = 0; i < this.props.comments.length; i++) {
      comments.push(
        <Comment
          key={i}
          comment={this.props.comments[i]}
        />
      );
    }

    return comments;
  }

  render() {
    return (
      <div>
        { this.renderComments() }
      </div>
    )
  }
}
