import React from 'react';
import Styles from './css/sideBanner';
import classnames from 'classnames';
// import VideoImg from '../img/video.png';


export default class SideBanner extends React.Component {
  render() {
    return (
      <div className={classnames('hide-on-small-only', 'col', 'm4')} id={Styles.noPadding}>
        <div className={classnames('hide-on-small-only', Styles.bannerContainer)}>
          <div id={Styles.banner}>
            <h1 id={Styles.logo}><a id={Styles.av} href="/signup">AV</a></h1>
            <div id={Styles.descriptionContainer}>
              <h2 id={Styles.title}>AudioVisual</h2>
              <h5 id={Styles.description}>Where SoundCloud Producers and Vimeo Producers come to collaborate
                and share their work to create amazing experiences.</h5>
              <p id={Styles.slogan}><i>Collaborate. Share. Create.</i></p>
            </div>
            {/* <div id={Styles.videoImg} style={{backgroundImage: `url(${VideoImg})`}}></div> */}
            {/* <div id={Styles.musicImg}></div> */}
          </div>
        </div>
      </div>
    );
  }
}
