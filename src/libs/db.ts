import Realm, { Configuration } from 'realm';

import { Milk } from 'Schemas/MilkSchema';

const app = new Realm.App({ id: process.env.REALM_APP_ID });

const OpenRealmBehaviorConfiguration = {
  type: 'openImmediately',
};
export const makeDBConfig: any = (user) => {
  return {
    schema: [Milk.schema],
    sync: {
      user: user,
      partitionValue: `${user.id}`,
      newRealmFileBehavior: OpenRealmBehaviorConfiguration,
      existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
    },
  };
};

export default app;
