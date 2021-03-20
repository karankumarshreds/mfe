import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';
import AuthApp from './components/AuthApp';

/**
 * This makes sure that all the elements using inline styles
 * have their classnames (which are randomly generated) by
 * material ui for styling start with 'ma' such that they do
 * not collide (className collision) with any other projct
 * when they are consumed by the consumer
 */
const generateClassName = createGenerateClassName({
  productionPrefix: 'cont',
});

const App = () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header />
        <Switch>
          <Route path="/auth" component={AuthApp} />
          <Route path="/" component={MarketingApp} />
        </Switch>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
