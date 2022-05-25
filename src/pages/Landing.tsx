import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth.js";
import { FriendStore } from "../stateStore";
import { useStoreState } from "pullstate";
import { getFriends } from "../stateStore/Selectors"
import { useAuth0 } from "@auth0/auth0-react";
import useResourceUsers from "../hooks/useResourceUsers";
import useResourceFriends from "../hooks/useResourceFriends";

const Landing: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const router = useIonRouter();
  const { login, django_user, error, loadingFriends } = useAuth();
  const { createResourceUsers } = useResourceUsers();
  const { resourcesFriends } = useResourceFriends();
  const [loading, setLoading] = useState<boolean>();


  const signIn = async (user: any, password: any) => {
    await login(user, password);
  }


  // useIonViewWillEnter(() => {
  //   if (isLoading){
  //     return <div>Loading ...</div>;
  //   }
  // })

  useEffect(() => {

    // if (isLoading){
    //   console.log('hi');
    //   setLoading(true);
    // } else {
    //   setLoading(false);
    // }

    if (isAuthenticated && !isLoading) {
      // if (django_user) {
      //   router.push("/timeline")
      //   console.log(user)
      // }
      try {
        // console.log(user)
        // login(user?.email, user?.sub)
        createResourceUsers({
          username: user?.email,
          email: user?.email,
          password: user?.sub,
        })
        signIn(user?.email, user?.sub)
        // signIn(user?.email, user?.sub)
        .then(() => {
          // console.log(django_user)
          FriendStore.update((s) => {
            s.friends = resourcesFriends;
          });
          // console.log((resourcesFriends))
          // console.log(user)
          router.push("/timeline")
        })
      } catch {
        signIn(user?.email, user?.sub)
        .then(() => {
          console.log(user)
          router.push("/timeline")
        })
      }
      // created my Django API to sign in if user already exists
    } else if (!isAuthenticated && !isLoading) {
      router.push("/userPage")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Welcome!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          some sort of loading screen
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Landing;