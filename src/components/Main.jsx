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

import MusicFeed from './MusicFeed';
import VideoFeed from './VideoFeed';

import VimeoEditRoom from './VimeoEditRoom';
import SCEditRoom from './SCEditRoom';

import UserProfile from './UserProfile';

// make '/user/:artistName?'

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Match pattern="/" exactly render={() =>
          <MusicFeed
            getUserId={this.props.getUserId}
            loggedIn={this.props.loggedIn}
            vimeoUser={this.props.vimeoUser}
            allMusic={this.props.allMusic}
            getAllMusic={this.props.getAllMusic}
            musicComments={this.props.musicComments}
            getMusicComments={this.props.getMusicComments}
            userInfo={this.props.userInfo}
            updateMusicQueue={this.props.updateMusicQueue}
            // emptyQueue={this.props.emptyQueue}
            musicQueue={this.props.musicQueue}
          />
        }/>

        <Match pattern="/video-feed" exactly render={() =>
          <VideoFeed
            getUserId={this.props.getUserId}
            loggedIn={this.props.loggedIn}
            scUser={this.props.scUser}
            allVideos={this.props.allVideos}
            getAllVideos={this.props.getAllVideos}
            videoComments={this.props.videoComments}
            getVideoComments={this.props.getVideoComments}
            userInfo={this.props.userInfo}
            updateVideoQueue={this.props.updateVideoQueue}
            // emptyQueue={this.props.emptyQueue}
            videoQueue={this.props.videoQueue}
          />
        }/>

        <Match pattern="/profile-setup" exactly render={() =>
          !this.props.loggedIn ? (
            <Redirect to="/signin" />
          ) : (
            <ProfileSetup
              profileContent={this.props.profileContent}
              vimeoUser={this.props.vimeoUser}
              scUser={this.props.scUser}
              userInfo={this.props.userInfo}
              getUserInfo={this.props.getUserInfo}
              // signupInfo={this.props.signupInfo}
              // getsignupInfo={this.props.getsignupInfo}
              uploads={this.props.uploads}
              getUploads={this.props.getUploads}
            />
          )
        }/>

        <Match pattern="/signup" exactly render={() =>
          this.props.loggedIn ? (
            <Redirect to="/profile-setup" />
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
            <Redirect to="/video-feed" />
          ) : (
            <SCSignIn
              authUser={this.props.authUser}
            />
          )
        }/>

        <Match pattern="/testing-music" exactly render={() =>
          !this.props.loggedIn ? (
            <Redirect to="/" />
          ) : (
            <VimeoEditRoom
              userInfo={this.props.userInfo}
              musicQueue={this.props.musicQueue}
            />
          )
        }/>

        <Match pattern="/testing-video" exactly render={() =>
          !this.props.loggedIn ? (
            <Redirect to="/video-feed" />
          ) : (
            <SCEditRoom
              userInfo={this.props.userInfo}
              videoQueue={this.props.videoQueue}
            />
          )
        }/>

        <Match pattern="/profile" exactly render={() =>
          !this.props.loggedIn ? (
            <Redirect to="/signin" />
          ) : (
            <MyProfile
              scUser={this.props.scUser}
              vimeoUser={this.props.vimeoUser}
              userInfo={this.props.userInfo}
              profileContent={this.props.profileContent}
              getProfileContent={this.props.getProfileContent}
            />
          )
        }/>

        <Match pattern="/user/:artistName?" exactly render={() =>
          <UserProfile
            scProfile={this.props.scProfile}
            vimeoProfile={this.props.vimeoProfile}
            userInfo={this.props.userInfo}
            profileContent={this.props.profileContent}
            getProfileContent={this.props.getProfileContent}
            userId={this.props.userId}
          />
        }/>

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
