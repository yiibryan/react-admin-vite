import React, { useCallback, useMemo, useState } from 'react';

import { setCurrentUser } from '@/redux/reducers/user';
import { useAppDispatch } from '@/redux/store';

import { getObject, setObject } from '@/utils/local-storage-utils';

import { CURRENT_USER_KEY } from '@/utils/constant';

export type AuthContextType = {
  isAuthenticated: boolean;
  onLoggedIn: (user: any) => void;
  onLoggedOut: () => void;
};

const initialAuth: AuthContextType = {
  isAuthenticated: true,
  onLoggedIn: () => {},
  onLoggedOut: () => {},
};

export const AuthContext = React.createContext(initialAuth);

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // use useMemo as workaround to run before render
  useMemo(() => {
    const currentUser = getObject(CURRENT_USER_KEY, null);
    if (currentUser) {
      dispatch(setCurrentUser({ user: currentUser }));
      setIsAuthenticated(true);
    }
  }, [dispatch]);

  const onLoggedIn = useCallback(
    (user: any) => {
      dispatch(setCurrentUser({ user }));
      setObject(CURRENT_USER_KEY, user);
      setIsAuthenticated(true);
    },
    [dispatch]
  );

  const onLoggedOut = useCallback(() => {
    setObject(CURRENT_USER_KEY, null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo<AuthContextType>(() => {
    return {
      isAuthenticated,
      onLoggedIn,
      onLoggedOut,
    };
  }, [isAuthenticated, onLoggedIn, onLoggedOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
