import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Mount function to render all the data onto index.html
const mount = (el) => {
  ReactDOM.render(<App />, el);
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
// contianer
export { mount };
