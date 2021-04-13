import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const AskingNotificationPermissonToken = async () => {
  try {
    let token;
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return (token = '');
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  } catch (error) {
    console.log(`error while getting expo tokens, error:`, error)
  }
};

export default AskingNotificationPermissonToken;
