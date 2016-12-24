import React from 'react';
import { Match, Miss, Link, Redirect } from 'react-router';
import axios from 'axios';

import SignUp from './SignUp';
import VimeoSignUp from './VimeoSignUp';
import VimeoSignIn from './VimeoSignIn';

import SignIn from './SignIn';
import SCSignUp from './SCSignUp';
import SCSignIn from './SCSignIn';

import PlayButton from './PlayButton';
import ProfileSetup from './ProfileSetup';
import MyProfile from './MyProfile';

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
            <Redirect to="/profile-setup" />
          ) : (
            <VimeoSignUp
              authUser={this.props.authUser}
            />
          )
        }/>

        <Match pattern="/signup/sc" exactly render={() =>
          this.props.loggedIn ? (
            <Redirect to="/profile-setup" />
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
            <Redirect to="/" />
          ) : (
            <SCSignIn
              authUser={this.props.authUser}
            />
          )
        }/>

        <Match pattern="/profile-setup" exactly render={() =>
          !this.props.loggedIn ? (
            <Redirect to="/signin" />
          ) : (
            <ProfileSetup
              vimeoUser={this.props.vimeoUser}
              scUser={this.props.scUser}
              userInfo={this.props.userInfo}
              getUserInfo={this.props.getUserInfo}
              uploads={this.props.uploads}
              getUploads={this.props.getUploads}
            />
          )
        }/>

        {/* test this after you are sure profile-setup is working properly */}
        {/* <Match pattern="/profile" exactly render={() =>
          !this.props.loggedIn ? (
            <Redirect to="/signin" />
          ) : (
            <MyProfile
              vimeoUser={this.props.vimeoUser}
              scUser={this.props.scUser}
              profileContent={this.props.profileContent}
              getProfileContent={this.props.getProfileContent}
            />
          )
        }/> */}

        {/* <Match pattern="/profile/:username?" exactly render={() =>
          !this.props.loggedIn ? (
            <Redirect to="/signin" />
          ) : (
            <Profile
              profileContent={this.props.profileContent}
              getProfileContent={this.props.getProfileContent}
            />
          )
        }/> */}
      </div>
    );
  }
}