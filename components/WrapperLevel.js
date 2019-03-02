import React, { Component } from 'react';
import { Navigator } from './Router';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { url } from '../config/ServerUrl';

class WrapperLevel extends Component {
  constructor(props) {
    super(props)
    // this.socket = io(url);
  }

  render() {
    return(
      <Navigator />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(WrapperLevel)
