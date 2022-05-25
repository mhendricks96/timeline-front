import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonAvatar,
  IonBadge,
  IonContent,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import { FriendStore } from "../../stateStore";
import { useStoreState } from "pullstate";
import {
  getFriends,
} from "../../stateStore/Selectors";
import useResourceFriends from "../../hooks/useResourceFriends";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../../contexts/auth.js";

const FriendsList: React.FC = () => {
  //global state variables
  const { user, isAuthenticated, isLoading } =
    useAuth0();
  const { login, django_user, error } = useAuth();

  const friends = useStoreState(FriendStore, getFriends);
  ///useResource Hooks
  const { resourcesFriends } = useResourceFriends();
  //Local State Variables
  const [openFriendModal, setOpenFriendModal] = useState<boolean>(false);
  const [chosenFriendPoop, setChosenFriendPoop] = useState<number>(0);
  const [chosenFriendName, setChosenFriendName] = useState<string>("");

  //function for pulldown refresh
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Begin async operation");

    setTimeout(() => {
      FriendStore.update((s) => {
        s.friends = resourcesFriends;
      });
      event.detail.complete();
    }, 2000);
  }

  // console.log(friends)

  // const openModal = (friend: any) => {
  //   let friendId: any = friend.id;

  //   for (let i = 0; i < poopProfiles.length; i++) {
  //     let user = poopProfiles[i].user;
  //     if (user === friendId) {
  //       setChosenFriendPoop(poopProfiles[i].poopInfo);
  //       setChosenFriendName(friend.username);
  //     }
  //   }
  //   setOpenFriendModal(true);
  // };

  return (
    <IonContent>
      {friends && friends.length > 0 ? (
        <>
          <IonRefresher
            slot="fixed"
            onIonRefresh={doRefresh}
            pullFactor={0.5}
            pullMin={100}
            pullMax={200}
          >
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonList>
            {friends.map(
              // eslint-disable-next-line array-callback-return
              (friend: any, index: React.Key | null | undefined) => {
                // taking user out so that they are not on their own friendsList
                if (friend.username !== user?.email) {
                  return (
                    <IonItem key={index}>
                      <IonAvatar>
                        <img
                          src={`https://avatars.dicebear.com/api/bottts/${friend.id}${friend.poopInfo}.svg?colorful=true`}
                          alt={"little robot avatar for each person"}
                        />
                      </IonAvatar>
                      <IonLabel>
                        <h1>{friend.username}</h1>
                      </IonLabel>
                      {/* {hasPoopProfile(friend)[0] === "poop info" ? (
                        <IonButton
                          fill="outline"
                          slot="end"
                          color="medium"
                          onClick={() => openModal(friend)}
                        >
                          View
                        </IonButton>
                      ) : (
                        ""
                      )} */}
                    </IonItem>
                  );
                }
              }
            )}
          </IonList>
          {/* <FriendCard
            chosenFriendPoop={chosenFriendPoop}
            chosenFriendName={chosenFriendName}
            openFriendModal={openFriendModal}
            setOpenFriendModal={setOpenFriendModal}
          /> */}
        </>
      ) : (
        <h1 className="ion-text-center">
          Looks like you need some bathroom buddies!
        </h1>
      )}
    </IonContent>
  );
};

export default FriendsList;
