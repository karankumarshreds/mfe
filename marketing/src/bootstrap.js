import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to render all the data onto index.html
/**
 * @onNavigate is the callback function passed back to this mount
 * function from the container application when it was being invoked
 * We would only have this funtion here if mount function is run from
 * container. Which means, this would be undefined it this application
 * is run in isolation
 */
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      // if we don't add this, the container browser router will update
      // the first time and mount this application and the first time
      // the memory router of THIS application starts, it will be at '/'
      // by default which would require user to click on the button/link
      // twice. Hence, by doing this we are setting the initial path of
      // the memory router to be whatever is passed down by the container
      // while trying to mount this application
      initialEntries: [initialPath],
    });
  // history object has an event listener tied to it called listen
  // whenever some navigation occurs, this history object will call
  // or invoke any function provided to the listen method with an
  // argument/parameter(for the invoked function) which would contain
  // current pathname of the memoryhistory of this child application
  // This way container app would take that and update the browser
  // url for the user based on this current path name
  if (onNavigate) {
    // this is for us to talk the parent and send the route
    // information to parent
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, el);

  return {
    // this function is for the parent to talk and send route
    // information to us
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;
      // only if our route is not updated as per containers route
      if (pathname !== nextPathname) {
        // update our local route
        history.push(nextPathname);
      }
    },
  };
};

// If we are in the development mode AND in isolation
// call the mount funtion immediately
if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#_marketing-dev-root');
  // make sure we are running in isolation
  if (el) {
    // this will be passed only if we are running in dev && in isolation
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

// Otherwise, we would assume that we are being run by the
// container and we will export this mount function for the
// container to render it whereever
export { mount };
