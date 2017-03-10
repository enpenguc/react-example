import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'dva/router';
import App from '../containers/App';
import Home from '../containers/Home';
import Services from '../containers/Services';
import NotFound from '../containers/NotFound';

//
// <Route path="/services" component={Services} />
// <Route path="/" component={App}>
//   <Route path="/home" component={Home} />
//   <IndexRoute component={Home} />
// </Route>
function Routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="home" component={Home} />
        <Route path="services" component={Services} />
        <IndexRoute component={Home} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.any // eslint-disable-line
};

export default Routes;
