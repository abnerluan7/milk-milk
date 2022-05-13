import Realm from 'realm';

const app = new Realm.App({ id: process.env.REALM_APP_ID });

export default app;
