import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createMemoryHistory } from 'history';

// Mount function to render all the data onto index.html
const mount = (el) => {
  const history = createMemoryHistory();
  ReactDOM.render(<App history={history} />, el);
};

// If we are in the development mode AND in isolation
// call the mount funtion immediately
if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#_marketing-dev-root');
  // make sure we are running in isolation
  if (el) {
    mount(el);
  }
}

// Otherwise, we would assume that we are being run by the
// container and we will export this mount function for the
// container to render it whereever
export { mount };
