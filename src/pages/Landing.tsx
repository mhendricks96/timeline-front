import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";

// import { useAuth } from "../contexts/auth.js";
import useResourceUsers from "../hooks/useResourceUsers";

const Landing: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const router = useIonRouter();
  // const { login, django_user, error } = useAuth();
  const { createResourceUsers } = useResourceUsers();

  // console.log(user)
  useEffect(() => {
    if (isAuthenticated) {
      // if (django_user) {
      //   router.push("/timeline")
      //   console.log(user)
      // }
      // created my Django API to sign in if user already exists
      createResourceUsers({
        username: user?.email,
        email: user?.email,
        password: user?.sub,
      })
        .then(() => {
          console.log(user)
          router.push("/timeline")
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Welcome!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Landing;