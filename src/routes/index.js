import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import App from '../containers/App';
import Home from '../containers/Home';
import Services from '../containers/Services';
import NotFound from '../containers/NotFound';

//
function Routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/home" component={Home}/>
        <Route path="/services" component={Services}/>
        <IndexRoute component={Home} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.any
};

export default Routes;
