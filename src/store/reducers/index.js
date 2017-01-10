import { combineReducers } from 'redux';
import { servicesReducer } from './services';
// const context = require.context('./', false, /\.js$/);
// const keys = context.keys().filter(item => item !== './index.js');

// const reducers = keys.reduce((memo, key) => {
//   memo[key.match(/([^\/]+)\.js$/)[1]] = context(key); // eslint-disable-line no-param-reassign
//   return memo;
// }, {});
// function entities(state = initialState, action) {
//   if (action.response && action.response.entities) {
//     const d = {
//       entities: action.response.entities
//     }
//     return { ...state, ...d}
//   }
//   return state
// }

const rootReducer = combineReducers({
  service: servicesReducer
});

export default rootReducer;
