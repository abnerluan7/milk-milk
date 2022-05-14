import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import Realm from 'realm';

import { makeDBConfig } from 'Libs/db';

import { getAllCheckLists, updateCheckListsServerSide } from 'Services/checklist';

import { CheckList, MilkContextType } from 'Types/Checklist';

import { Milk } from 'Schemas/MilkSchema';

import { reformatChecklist } from 'Helpers/FormatData';

import { useAuth } from './AuthProvider';

const MilkContext = React.createContext<MilkContextType>({} as MilkContextType);

const MilkProvider = (props) => {
  const netInfo = useNetInfo();

  const [milks, setMilks] = useState([]);
  const [checkLists, setCheckLists] = useState<CheckList[]>([]);
  const { user } = useAuth();

  const realmRef = useRef(null);

  const getCheckLists = async () => {
    const { data: checklists } = await getAllCheckLists();
    return checklists;
  };

  useFocusEffect(
    React.useCallback(() => {
      checkLists.map((checkList) => {
        if (!checkList.transmitted) {
          updateCheckListsServerSide(checkList)
            .then((response) => {
              if (response.data.id) {
                updateCheckListsFrontSide(checkList, true);
              }
            })
            .catch((err) => console.log(err.response));
        }
      });
    }, [netInfo.isInternetReachable, checkLists])
  );

  useEffect(() => {
    if (user == null) {
      console.error('Null user? Needs to log in!');
      return;
    }

    Realm.open(makeDBConfig(user)).then((realm) => {
      realmRef.current = realm;
      const syncMilks = realm.objects('Milk');
      let sortedMilks = syncMilks.sorted('number_of_cows_head');
      sortedMilks.addListener(() => {
        console.log('Got new data!');
        setMilks([...sortedMilks]);
        setCheckLists(reformatChecklist([...sortedMilks]));
      });
    });

    return () => {
      closeRealm();
    };
  }, [user]);

  const createChecklists = () => {
    const realm = realmRef.current;
    getCheckLists().then((checklists) => {
      checklists.map((checklist) => {
        checklist._partition = 'abner';
        checklist.transmitted = true;
        try {
          realm.write(() => {
            realm.create('Milk', new Milk(checklist));
          });
        } catch (error) {
          console.log(error);
          return;
        }
      });
    });
  };

  const updateCheckListsFrontSide = (checklist: CheckList, transmitted: boolean = false) => {
    const realm = realmRef.current;
    const checklistToUpdate = realm.objects('Milk').filtered('_id =' + checklist._id)[0];
    realm.write(() => {
      checklistToUpdate.transmitted = transmitted;
      checklistToUpdate.had_supervision = checklist.had_supervision;
    });
  };

  const deleteMilks = () => {
    const realm = realmRef.current;
    console.log(realm);
    realm.write(() => {
      milks.map((milk) => {
        realm.delete(milk);
        setMilks([...realm.objects('Milk').sorted('number_of_cows_head')]);
        setCheckLists(reformatChecklist([...realm.objects('Milk').sorted('number_of_cows_head')]));
      });
    });
  };

  const closeRealm = () => {
    const realm = realmRef.current;
    if (realm) {
      realm.close();
      realmRef.current = null;
      setMilks([]);
      setCheckLists([]);
    }
  };

  return (
    <MilkContext.Provider
      value={{
        closeRealm,
        createChecklists,
        checkLists,
        updateCheckListsFrontSide,
        deleteMilks,
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
