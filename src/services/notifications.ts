import admin, { ServiceAccount } from 'firebase-admin';
import firebaseConfig from '../utils/firebase-config'


export function sendNotifications(tokens: string[], title: string, body: string) {
  const firebase = !admin.apps.length? admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as ServiceAccount),
    databaseURL: `https://${firebaseConfig.project_id}.firebaseio.com`
  }): admin.app();

    // These registration tokens come from the client FCM SDKs.
    const registrationTokens = [...tokens];
  
    const message = {
      data: { title: title, body: body },
      tokens: registrationTokens,
    };
  
    firebase.messaging()
      .sendMulticast(message)
      .then((response) => {
        if (response.failureCount > 0) {
          const failedTokens: string[] = [];
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              failedTokens.push(registrationTokens[idx]);
            }
          });
          console.log("List of tokens that caused failures: " + failedTokens);
        }else{
          console.log("success notifications send")
        }
      })
      .catch(error => {
        console.log(error)
      })
  }