import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import moment from 'moment';

import { Calls } from '../api/calls.js';

import Call from './Call.jsx';

import _ from 'lodash';

// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const call = {
      clientName: ReactDOM.findDOMNode(this.refs.clientNameInput).value.trim(),
      endpointCalled: ReactDOM.findDOMNode(this.refs.endpointCalledInput).value.trim(),
      result: ReactDOM.findDOMNode(this.refs.resultInput).value.trim(),
      timestamp: moment().valueOf(),
    };

    Calls.insert(call);

    // Clear form
    ReactDOM.findDOMNode(this.refs.clientNameInput).value = '';
    ReactDOM.findDOMNode(this.refs.endpointCalledInput).value = '';
    ReactDOM.findDOMNode(this.refs.resultInput).value = '';
  }

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

          <form className="new-call" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="clientNameInput"
              placeholder="Client Name"
            />
            <input
              type="text"
              ref="endpointCalledInput"
              placeholder="Endpoint"
            />
            <input
              type="text"
              ref="resultInput"
              placeholder="Result"
            />
          <input type="submit" value="Submit" />
          </form>
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
  Meteor.subscribe('calls');
  return {
    calls: Calls.find({}, { sort: { timestamp: -1 } }).fetch(),
  };
}, App);
