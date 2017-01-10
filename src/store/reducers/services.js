import { handleActions } from 'redux-actions';

const initialState = {};
// reducer
const reducer = handleActions({
  ['services/list'](state, action) {
    console.log('服务list：', state, action);
    return { ...state,
      ...action.data
    };
  },
  ['services/add/success'](state, action) {
    return { ...state,
      ...action.data
    };
  },
  ['services/add/failure'](state, action) {
    return { ...state,
      ...action.data
    };
  }
}, initialState);

export default reducer;
