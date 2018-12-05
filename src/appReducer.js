import { combineReducers } from 'redux';
import search from 'grove-search-redux';
import crud from 'grove-crud-redux';
import user, { actionTypes } from 'grove-user-redux';

const coreAppReducer = (state, action) => {
  // empty out state on logout, so we don't leak info
  if (action.type === actionTypes.LOCAL_LOGOUT) {
    state = undefined;
  }

  return combineReducers({ search, crud, user })(state, action);
};

export default coreAppReducer;
