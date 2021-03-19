import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp';

const MarketingApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    // reference to the html element
    mount(ref.current, {
      onNavigate: () => {
        console.log('Navigation noticed from the container application');
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
