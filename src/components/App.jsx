import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { startPasswordReset } from 'actions/password';
import ResetPasswordForm from './ResetPasswordForm';
import './App.css';

class App extends React.Component {
  @autobind
  handleSubmit(values) {
    this.props.startPasswordReset(values);
  }

  render() {
    return (
      <ResetPasswordForm onSubmit={this.handleSubmit} />
    );
  }
}

const mapDispatchToProps = {
  startPasswordReset
};

export default connect(null, mapDispatchToProps)(App);
