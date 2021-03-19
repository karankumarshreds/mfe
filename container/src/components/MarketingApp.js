import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

const MarketingApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // reference to the html element
    mount(ref.current, {
      // location === object given to us by the listen function
      // which we used to invoke this callback and has information
      // of where the router (child memory router) navigated to
      // destructuring @location's pathname and renaming it
      // Using this we will change/update our history object
      // which is nothing but our browser history (to update url)
      onNavigate: ({ pathname: nextPathname }) => {
        history.push(nextPathname);
      },
    });
  }, []);

  return <div ref={ref}></div>;
};

export default MarketingApp;

/**
 * @onNavigate is the callback function we are sending to the
 * child projects so that as soon as we change the browser url using the
 * browserRouter in the container application, we inform child project
 * to update it's memory router (which does not make any change to the
 * address bar of the browser) so that it can render the correct component
 * Similarly, vice versa, if the user clicks on the component on the child
 * project and the routing (at that point) is being handled by the child
 * project (which will not change the URL <because memory router> ), we would
 * want the child project to inform us so that WE (container) can change the
 * URL on its behalf!
 */
