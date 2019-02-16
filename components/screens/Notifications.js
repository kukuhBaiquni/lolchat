import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import type { Notification } from 'react-native-firebase';

export default class Notifications extends Component {
  constructor(props) {
    super(props)
    this.onTokenRefreshListener = null;
    this.messageListener = null;
  }

  async componentDidMount() {
    const channel = new firebase.notifications.Android.Channel('chaty-01', 'Chaty', firebase.notifications.Android.Importance.Max).setDescription('Chaty otw');

    firebase.notifications().android.createChannel(channel);

    const fcmToken = await firebase.messaging().getToken();
    const enabled = await firebase.messaging().hasPermission();
    console.log(fcmToken);
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        // Process your token as required
        console.log('changed');
    });

    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        console.log(message);
    });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      console.log(notification);
    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      console.log(notification);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        console.log(action);
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        console.log(notification);
    });

    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        console.log(action);
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        console.log(notification);
    }

  }

  componentWillUnmount() {
    this.onTokenRefreshListener();
    this.messageListener();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  noticeMe() {
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
    // const date = new Date();
    // date.setSeconds(date.getSeconds() + 10);
    //
    // firebase.notifications().scheduleNotification(notification, {
    //   fireDate: date.getTime(),
    // })
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text onPress={() => this.noticeMe()}>LooooooooL</Text>
      </View>
    )
  }
}
