import React from 'react';
import { Match, Miss, Link, Redirect} from 'react-router';
import SignUp from './SignUp';
import VimeoSignUp from './VimeoSignUp';
import VimeoSignIn from './VimeoSignIn';
import SCSignUp from './SCSignUp';
import SCSignIn from './SCSignIn';
import SignIn from './SignIn';
import PlayButton from './PlayButton';
import axios from 'axios';
import Profile from './Profile';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Match pattern="/signup" exactly render={() =>
          this.props.loggedIn ? (
            <Redirect to="/profile" />
          ) : (
            <SignUp />
          )
        }/>

        <Match pattern="/signup/vimeo" exactly render={() =>
          this.props.loggedIn ? (
            <Redirect to="/profile" />
          ) : (
            <VimeoSignUp
              authUser={this.props.authUser}
            />
          )
        }/>

        <Match pattern="/signup/sc" exactly render={() =>
          this.props.loggedIn ? (
            <Redirect to="/profile" />
          ) : (
            <SCSignUp
              authUser={this.props.authUser}
            />
          )
        }/>

        <Match pattern="/signin" exactly render={() =>
          this.props.loggedIn ? (
            <Redirect to="/profile" />
          ) : (
            <SignIn
              authUser={this.props.authUser}
            />
          )
        }/>

        <Match pattern="/signin/vimeo" exactly render={() =>
          this.props.loggedIn ? (
            <Redirect to="/" />
          ) : (
            <VimeoSignIn
              authUser={this.props.authUser}
            />
          )
        }/>

        <Match pattern="/signin/sc" exactly render={() =>
          this.props.loggedIn ? (
            <Redirect to="/profile" />
          ) : (
            <SCSignIn
              authUser={this.props.authUser}
            />
          )
        }/>

        <Match pattern="/profile" exactly render={() =>
          !this.props.loggedIn ? (
            <Redirect to="/signin" />
          ) : (
            <Profile
              authUser={this.props.authUser}
            />
          )
        }/>
      </div>
    );
  }
}
