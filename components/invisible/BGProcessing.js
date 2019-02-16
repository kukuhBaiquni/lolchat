import firebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';
import type { Notification } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    console.log('from bg', message);
    const notification = new firebase.notifications.Notification()
    .android.setChannelId('chaty-01')
    .android.setPriority(firebase.notifications.Android.Priority.Max)
    .setNotificationId('notificationId')
    .setTitle('My notification title')
    .setBody('My notification body')
    .setData({
      key1: 'value1',
      key2: 'value2',
    });
    firebase.notifications().displayNotification(notification)
    return Promise.resolve('cimeng');
}
