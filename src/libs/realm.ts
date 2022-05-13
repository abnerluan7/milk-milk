import Constants from 'expo-constants';
import Realm from 'realm';

const app = new Realm.App({ id: Constants.manifest.REALM_APP_ID });

export default app;
