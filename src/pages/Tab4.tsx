import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import "./Tab3.css";

import { useAuth0 } from "@auth0/auth0-react";
// import { Browser } from '@capacitor/browser';
import { IonButton } from "@ionic/react";
import UserInfo from "../components/userInfo";

const Tab4: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } =
    useAuth0();

  // console.log(user)

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">User Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          {isAuthenticated ? <UserInfo /> : <h1>Please Log In</h1>}
          {isAuthenticated ? (
            <IonButton expand="block" onClick={() => logout()}>Log Out</IonButton>
          ) : (
            <IonButton expand="block" onClick={() => loginWithRedirect()}>Log In</IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
