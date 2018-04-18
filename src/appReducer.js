import { combineReducers } from 'redux';
import search from 'ml-search-redux';
import documents from 'ml-documents-redux';
import user, { actionTypes } from 'muir-user-redux';

const coreAppReducer = (state, action) => {
  // empty out state on logout, so we don't leak info
  if (action.type === actionTypes.LOCAL_LOGOUT) {
    state = undefined;
  }

  return combineReducers({ search, documents, user })(state, action);
};

export default coreAppReducer;
