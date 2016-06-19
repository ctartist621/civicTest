import React, { Component, PropTypes } from 'react';

// Call component - represents a single todo item
export default class Call extends Component {
  render() {
    return (
      <li>{this.props.call.text}</li>
    );
  }
}

Call.propTypes = {
  // This component gets the call to display through a React prop.
  // We can use propTypes to indicate it is required
  call: PropTypes.object.isRequired,
};
