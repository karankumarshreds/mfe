import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

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
        <MarketingApp />
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
