import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import moment from 'moment';

import { Calls } from '../api/calls.js';

import Call from './Call.jsx';

import _ from 'lodash';

var QUERY_INCREMENT = 50;
Session.set('queryLimit', QUERY_INCREMENT);

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

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
  var threshold;
  var target = $('#showMoreResults');
  console.log(target);
  if (!target.length) return;

  threshold = $(window).scrollTop() + $(window).height() - target.height();

  console.log(target.offset().top <= threshold);
  console.log(target.offset().top, threshold);

  if (target.offset().top <= threshold && !target.data('visible')) {
    console.log('target became visible (inside viewable area)');
    target.data('visible', true);
    Session.set('queryLimit', Session.get('queryLimit') + QUERY_INCREMENT);
    console.log(Session.get('queryLimit'));
  } else if (target.data('visible')) {
    console.log('target became invisible (below viewable arae)');
    target.data('visible', false);
  }
}

// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);

App.propTypes = {
  calls: PropTypes.array.isRequired,
};

export default createContainer(() => {
  console.log('createContainer', Session.get('queryLimit'));

  Tracker.autorun(() => {
    console.log('autorun', Session.get('queryLimit'));
    Meteor.subscribe('calls', Session.get('queryLimit'));
  });

  return {
    calls: Calls.find({}, { sort: { timestamp: -1 } }).fetch(),
  };
}, App);
