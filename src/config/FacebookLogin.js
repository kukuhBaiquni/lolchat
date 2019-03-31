import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

export async function facebookLogin() {
    try {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw new Error('User cancelled request');
        }

        // get the access token
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            console.log('Something went wrong obtaining the users access token');
        }

        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

        return firebaseUserCredential.user.toJSON()
    } catch (e) {
        console.log(e);
    }
}
