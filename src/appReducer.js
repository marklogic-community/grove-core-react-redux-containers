import { combineReducers } from 'redux';
import search from '@marklogic-community/grove-search-redux';
import documents from '@marklogic-community/grove-crud-redux';
import user, { actionTypes } from '@marklogic-community/grove-user-redux';

const coreAppReducer = (state, action) => {
  // empty out state on logout, so we don't leak info
  if (action.type === actionTypes.LOCAL_LOGOUT) {
    state = undefined;
  }

  return combineReducers({ search, documents, user })(state, action);
};

export default coreAppReducer;
