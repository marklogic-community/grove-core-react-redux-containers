import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DetailView } from 'grove-core-react-components';

import { actions, selectors } from 'grove-crud-redux';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'documents');

const mapStateToProps = (state, ownProps) => {
  const sel = boundSelectors;
  const detail = sel.documentByUri(state, ownProps.uri);
  return {
    // TODO: move this label implementation to a samplePerson branch
    // because it is not generic, but it is useful for a quick Grove demo
    label: detail && detail.name,
    detail: detail,
    error: sel.errorByUri(state, ownProps.uri),
    contentType: sel.contentTypeByUri(state, ownProps.uri)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadDetail: actions.fetchDoc
    },
    dispatch
  );

const DetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);

export default DetailContainer;
