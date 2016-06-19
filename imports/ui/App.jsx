import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Calls } from '../api/calls.js';

import Call from './Call.jsx';

import _ from 'lodash';

// App component - represents the whole app
class App extends Component {
  renderCalls() {
    var calls = this.props.calls;
    calls = _.orderBy(calls, 'timestamp', 'desc');
    return calls.map((call) => (
      <Call key={call._id} call={call} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Call List</h1>
        </header>

        <ul>
          {this.renderCalls()}
        </ul>
      </div>
    );
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
