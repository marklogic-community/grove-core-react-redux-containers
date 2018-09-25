import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions as userActions,
  selectors as userSelectors
} from 'muir-user-redux';

import { bindSelectors } from '../utils/redux-utils';

const boundUserSelectors = bindSelectors(userSelectors, 'user');
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    // Move fetch() to global so errors, presently just 401s, can be intercepted
    const fetch = global.fetch;
    global.fetch = function(url, options) {
      return fetch(url, options).then(response => {
        if (response.status === 401) {
          props.submitLogout(props.currentUser);
        }
        return response;
      });
    };
  }
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.getAuthenticationStatus();
    }
  }

  render() {
    return this.props.render(this.props);
  }
}

AppContainer.propTypes = {
  currentUser: PropTypes.object,
  getAuthenticationStatus: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  submitLogout: PropTypes.func
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
