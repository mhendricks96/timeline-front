import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, useIonViewWillEnter } from '@ionic/react';
import './Friends.css';
import React, { useState } from "react";
import { FriendStore } from "../stateStore";
import { useStoreState } from "pullstate";
import { getFriends } from "../stateStore/Selectors";
import FriendsList from "../components/friendsComponents/friendsList"
import AddFriends from "../components/friendsComponents/addFriends"
import { useAuth0 } from "@auth0/auth0-react";
import useResourceFriends from "../hooks/useResourceFriends";

const Friends: React.FC = () => {
  const friends = useStoreState(FriendStore, getFriends);
  const { resourcesFriends } = useResourceFriends();
  const { isAuthenticated } =
    useAuth0();
  const [segment, setSegment] = useState<any>('friendsList');
  let component = null;

  switch (segment) {
    case "friendsList":
      component = <FriendsList />;
      break;

    case "addFriends":
      component = <AddFriends />;
      break;
  }

  useIonViewWillEnter(() => {
    FriendStore.update((s) => {
      s.friends = resourcesFriends;
    });
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          {isAuthenticated ? (
            <IonTitle className="ion-text-center">
              {/* {`${user?.username}'s` || ""} friends */}
              Friends
            </IonTitle>
          ) : (
            ""
          )}
        </IonToolbar>
      </IonHeader>
      
      {friends && isAuthenticated ? (
        <>
          <IonSegment
            value={segment}
            onIonChange={(e) => setSegment(e.detail.value)}
            color="tertiary"
          >
            <IonSegmentButton value="friendsList">
              <IonLabel>Your Friends</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="addFriends">
              <IonLabel>Add Friends</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {component}
        </>
      ) : (
        // <SkeletonFriends />
        'no data'
      )}
    </IonPage>
  );
};

export default Friends;
