import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Calls } from '../api/calls.js';

import Call from './Call.jsx';

// App component - represents the whole app
class App extends Component {
  renderCalls() {
    return this.props.calls.map((call) => (
      <Call key={call._id} call={call} />
    ));
  }
}

App.propTypes = {
  calls: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    calls: Calls.find({}).fetch(),
  };
}, App);
