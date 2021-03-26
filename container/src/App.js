import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';
// components
import Progress from './components/Progress';
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

// used instead of the component itself
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  if (isSignedIn) {
    alert('User just logged in');
  }
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;

/**
 * @Suspense a react component
 * Takes in a prop fallback which can be any JSX which will be shown
 * to the user while the lazy loading is taking place
 * @lazy a function helps us do lazy loading
 * ////// meaning? /////
 * Work together to help us load the components (JS files) only when
 * the user goes to the page/component which ACTUALLY requires the
 * component(JS files) to be loaded
 */
