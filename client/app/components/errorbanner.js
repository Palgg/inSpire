import React from 'react';
import {hideElement} from '../util';

/**
 * A yellow error banner that uses Bootstrap's "warning" alert. Used to display HTTP request failures.
 */
export default class ErrorBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      errors: ""
    };

    window.InspireError = (errorText) => {
      this.setState({
        active: true,
        error: errorText
      });
      console.error(errorText);
    };
  }

  render() {
    // Don't display the error banner unless 'this.state.active' is true.
    return (
      <div className={"alert alert-warning " + hideElement(!this.state.active)} role="alert">
        Inspire was unable to complete a recent request: {this.state.error}<br />
        Please <a onClick={() => window.location.reload()}>refresh the web page</a> and try again.
      </div>
    );
  }
}
