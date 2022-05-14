import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import Realm, { Configuration } from 'realm';
import { Milk } from 'Schemas/MilkSchema';
import { getAllCheckLists } from 'Services/checklist';
import { CheckList, MilkContextType } from 'Types/Checklist';

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
          console.log(checkList);
        }
      });
    }, [netInfo.isInternetReachable, checkLists])
  );

  useEffect(() => {
    if (user == null) {
      console.error('Null user? Needs to log in!');
      return;
    }
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };
    const config: Configuration = {
      schema: [Milk.schema],
      sync: {
        user: user,
        partitionValue: `${user.id}`,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    Realm.open(config).then((realm) => {
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
        realm.write(() => {
          realm.create('Milk', new Milk(checklist));
        });
      });
    });
  };

  const updateChecklist = (checklist: CheckList) => {
    const realm = realmRef.current;
    const checklistToUpdate = realm.objects('Milk').filtered('_id =' + checklist._id)[0];
    realm.write(() => {
      checklistToUpdate.transmitted = false;
      checklistToUpdate.had_supervision = !checklist.had_supervision;
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

  const reformatChecklist = (checklistsRealmFormat): CheckList[] => {
    const checklist: CheckList[] = [];
    checklistsRealmFormat.map((checklistRealmFormat) => {
      checklist.push({
        _id: checklistRealmFormat._id,
        type: checklistRealmFormat.type,
        amount_of_milk_produced: checklistRealmFormat.amount_of_milk_produced,
        farmer: {
          name: checklistRealmFormat.farmer,
          city: checklistRealmFormat.city,
        },
        from: {
          name: checklistRealmFormat.from_name,
        },
        to: {
          name: checklistRealmFormat.to_name,
        },
        number_of_cows_head: checklistRealmFormat.number_of_cows_head,
        had_supervision: checklistRealmFormat.had_supervision,
        created_at: checklistRealmFormat.created_at,
        updated_at: checklistRealmFormat.updated_at,
        __v: checklistRealmFormat.__v,
        _partition: checklistRealmFormat._partition,
        transmitted: checklistRealmFormat.transmitted,
      });
    });
    return checklist;
  };

  return (
    <MilkContext.Provider
      value={{
        closeRealm,
        createChecklists,
        checkLists,
        updateChecklist,
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
