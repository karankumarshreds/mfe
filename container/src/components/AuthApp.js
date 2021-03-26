import React, { useEffect, useRef } from 'react';
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      /* nav cb for child app */
      onNavigate: ({ pathname: nextPathname }) => {
        if (history.pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      /* another cb for child app */
      onSignIn,
    });
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref}></div>;
};

export default AuthApp;
