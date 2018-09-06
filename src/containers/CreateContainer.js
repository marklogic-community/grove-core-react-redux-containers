import React from 'react';
import { connect } from 'react-redux';

import { CreateView } from 'muir-core-react-components';

import { bindActionCreators } from 'redux';

import { actions, selectors } from 'muir-crud-redux';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'documents');

let CreateContainer = class CreateContainer extends React.Component {
  render() {
    return <CreateView {...this.props} />;
  }
};

const mapStateToProps = (state, ownProps) => {
  const sel = boundSelectors;
  return {
    ...ownProps,
    error: sel.error(state),
    pending: sel.pending(state),
    docUri: sel.docUri(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onCreateExecute: actions.createDoc
    },
    dispatch
  );

CreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContainer);

export default CreateContainer;
