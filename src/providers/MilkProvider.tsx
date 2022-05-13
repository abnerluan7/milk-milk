import React, { useContext, useState, useEffect, useRef } from 'react';
import Realm, { Configuration } from 'realm';
import { Milk } from 'Schemas/MilkSchema';

import { useAuth } from './AuthProvider';

const MilkContext = React.createContext(null);

const MilkProvider = (props) => {
  const [milks, setMilks] = useState([]);
  const { user } = useAuth();

  const realmRef = useRef(null);

  useEffect(() => {
    if (user == null) {
      console.error('Null user? Needs to log in!');
      return;
    }
    const config: Configuration = {
      schema: [Milk.schema],
      sync: {
        user: user,
        partitionValue: `${user.id}`,
      },
    };

    Realm.open(config).then((realm) => {
      realmRef.current = realm;

      const syncMilks = realm.objects('Milk');
      let sortedMilks = syncMilks.sorted('number_of_cows_head');

      sortedMilks.addListener(() => {
        console.log('Got new data!');
        setMilks([...sortedMilks]);
      });
    });

    return () => {
      closeRealm();
    };
  }, [user]);

  const closeRealm = () => {
    const realm = realmRef.current;
    if (realm) {
      realm.close();
      realmRef.current = null;
      setMilks([]);
    }
  };

  return (
    <MilkContext.Provider
      value={{
        closeRealm,
        milks,
      }}>
      {props.children}
    </MilkContext.Provider>
  );
};

const useMilks = () => {
  const milks = useContext(MilkContext);
  if (milks == null) {
    throw new Error('useMilks() called outside of a TasksProvider?');
  }
  return milks;
};

export { MilkProvider, useMilks };
