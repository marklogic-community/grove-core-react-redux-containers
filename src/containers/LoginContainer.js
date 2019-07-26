import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoginJumbotron } from '@marklogic-community/grove-core-react-components';
import { actions } from '@marklogic-community/grove-user-redux';

const mapStateToProps = (state, ownProps) => ({
  from: (ownProps.location && ownProps.location.state) || { pathname: '/' }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitLogin: actions.submitLogin
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginJumbotron);
