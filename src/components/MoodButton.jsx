import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Styles from './css/moodButton';

export default class MoodButton extends React.Component {
  constructor(props) {
    super(props);

    const element = ReactDOM.findDOMNode(this.refs.mood)

    $(element).ready(function() {
      $('select').material_select();
    });
  }

  render() {
    return (
      <div>
        <select ref="mood">
          <option defaultValue="Select Mood" disabled selected>Select Mood</option>
          <option>Angry</option>
          <option>Carefree</option>
          <option>Chill</option>
          <option>Uplifting</option>
          <option>Contemplative</option>
          <option>Ecstatic</option>
          <option>Eerie</option>
          <option>Happy</option>
          <option>Love</option>
          <option>Peaceful</option>
          <option>Sad</option>
          <option>Serious</option>
          <option>Somber</option>
          <option>Tense</option>
        </select>
      </div>
    );
  }
}
