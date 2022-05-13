import app from 'Libs/db';
import React, { useContext, useState, useEffect, useRef } from 'react';
import Realm from 'realm';
import { AuthContextType } from 'Types/Auth';

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);
  const realmRef = useRef(null);

  useEffect(() => {
    if (!user) {
      console.warn('NO USER Logged In');
      return;
    }

    const config = {
      sync: {
        user,
        partitionValue: `user=${user.id}`,
      },
    };

    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
    });

    return () => {
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
      }
    };
  }, [user]);

  const signIn = async (email: string, password: string) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
  };
  const signUp = async (email: string, password: string) => {
    await app.emailPasswordAuth.registerUser({ email, password });
  };

  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return auth;
};

export { AuthProvider, useAuth };
