import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';

import Landing from './Landing';
import Pricing from './Pricing';

const App = () => {
  return (
    <StylesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
};

export default App;
