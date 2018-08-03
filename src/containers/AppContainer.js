import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions as userActions,
  selectors as userSelectors
} from 'muir-user-redux';

import { selectors as searchSelectors } from 'muir-search-redux';
import { bindSelectors } from '../utils/redux-utils';

const boundUserSelectors = bindSelectors(userSelectors, 'user');
const boundSearchSelectors = bindSelectors(searchSelectors, 'search');

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

AppContainer.propTypes = {
  currentUser: PropTypes.object,
  getAuthenticationStatus: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  error: PropTypes.string,
  becameUnauthorized: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: boundUserSelectors.isCurrentUserAuthenticated(state),
    currentUser: boundUserSelectors.currentUser(state),
    error: boundSearchSelectors.getSearchError(state),
    ...ownProps
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitLogout: userActions.submitLogout,
      getAuthenticationStatus: userActions.getAuthenticationStatus,
      becameUnauthorized: userActions.becameUnauthorized
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
