import React, { Component, PropTypes } from 'react';
import moment from 'moment';

// Call component - represents a single todo item
export default class Call extends Component {
  render() {
    return (
      <li>{moment(this.props.call.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')} :: {this.props.call.clientName} :: {this.props.call.endpointCalled} :: {this.props.call.result}</li>
    );
  }
}

Call.propTypes = {
  // This component gets the call to display through a React prop.
  // We can use propTypes to indicate it is required
  call: PropTypes.object.isRequired,
};
