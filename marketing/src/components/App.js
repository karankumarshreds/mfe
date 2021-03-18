import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Landing from './Landing';
import Pricing from './Pricing';

/**
 * This makes sure that all the elements using inline styles
 * have their classnames (which are randomly generated) by
 * material ui for styling start with 'ma' such that they do
 * not collide (className collision) with any other projct
 * when they are consumed by the consumer
 */
const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',
});

const App = () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
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
