import React, { Component } from 'react';

import Call from './Call.jsx';

// App component - represents the whole app
export default class App extends Component {
  getCalls() {
    return [
      { _id: 1, text: 'This is call 1' },
      { _id: 2, text: 'This is call 2' },
      { _id: 3, text: 'This is call 3' },
    ];
  }

  renderCalls() {
    return this.getCalls().map((call) => (
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
