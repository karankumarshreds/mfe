import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createMemoryHistory } from 'history';

// Mount function to render all the data onto index.html
/**
 * @onNavigate is the callback function passed back to this mount
 * function from the container application when it was being invoked
 * We would only have this funtion here if mount function is run from
 * container. Which means, this would be undefined it this application
 * is run in isolation
 */
const mount = (el, { onNavigate }) => {
  const history = createMemoryHistory();
  // history object has an event listener tied to it called listen
  // whenever some navigation occurs, this history object will call
  // or invoke any function provided to the listen method with an
  // argument/parameter(for the invoked function) which would contain
  // current pathname of the memoryhistory of this child application
  // This way container app would take that and update the browser
  // url for the user based on this current path name
  history.listen(onNavigate);
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
