import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#_auth-dev-root');
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };