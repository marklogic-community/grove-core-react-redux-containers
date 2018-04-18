import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import {
  actions as userActions,
  selectors as userSelectors
} from 'muir-user-redux';
import { bindSelectors } from '../utils/redux-utils';

const boundUserSelectors = bindSelectors(userSelectors, 'user');

class AppContainer extends React.Component {
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.getAuthenticationStatus();
    }
  }

  render() {
    return this.props.render(this.props);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: boundUserSelectors.isCurrentUserAuthenticated(state),
    currentUser: boundUserSelectors.currentUser(state),
    ...ownProps
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitLogout: userActions.submitLogout,
      getAuthenticationStatus: userActions.getAuthenticationStatus
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
