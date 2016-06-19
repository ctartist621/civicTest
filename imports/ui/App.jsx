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
