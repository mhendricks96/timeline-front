import {
  IonItem,
  IonButton,
  IonSearchbar,
  IonList,
  IonAvatar,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonBadge,
  IonText,
  IonContent,
} from "@ionic/react";
import { personAddOutline } from "ionicons/icons";
import { FriendStore } from "../../stateStore";
import { useAuth0 } from "@auth0/auth0-react";

import { getFriends } from "../../stateStore/Selectors";
import { useStoreState } from "pullstate";
import React, { useState, useEffect } from "react";
import useResourceUsers from "../../hooks/useResourceUsers";
import useResourceRequests from "../../hooks/useResourceRequests";
import useResourceSentRequests from "../../hooks/useResourceSentRequests";
// import PendingRequests from "./pendingRequests";

const AddFriends: React.FC = () => {
  //useResouce hooks to connect to api
  const { resourcesUsers } = useResourceUsers();
  const { resourcesSentRequests, createResourceSentRequests } =
    useResourceSentRequests();
  const { resourcesRequests } = useResourceRequests();

  const { user, isAuthenticated, isLoading } =
    useAuth0();

  // Global state variables
  const friends = useStoreState(FriendStore, getFriends);

  //local state variables
  const [possibleFriend, setPossibleFriend] = useState<any>();
  //local version of sent requests
  const [sentRequests, setSentRequests] = useState<any>();
  //list of users minus friends and self
  const [potentialFriends, setPotentialFriends] = useState<any>([]);
  //friend we are trying to add
  //state that shows incoming friend requests
  const [showRequests, setShowRequests] = useState<boolean>(false);

  const checkIfPendingDisabled = (user: any) => {
    let disabled: boolean | undefined = undefined;
    for (let i = 0; i < sentRequests.length; i++) {
      let request = sentRequests[i];
      if (request.to_user === user.username && request.rejected === null) {
        disabled = true;
        return disabled;
      } else {
        disabled = false;
      }
    }
    return disabled;
  };

  const checkIfPendingColor = (user: any) => {
    let color: string | undefined = undefined;
    for (let i = 0; i < sentRequests.length; i++) {
      let request = sentRequests[i];
      if (request.to_user === user.username && request.rejected === null) {
        color = "medium";
        return color;
      } else {
        color = "primary";
      }
    }
    return color;
  };

  const checkIfPendingString = (user: any) => {
    let string: string | undefined = undefined;
    for (let i = 0; i < sentRequests.length; i++) {
      let request = sentRequests[i];
      if (request.to_user === user.username && request.rejected === null) {
        string = "pending";
        return string;
      } else {
        string = "send request";
      }
    }
    return string;
  };

  const handleRequest = async (user: any) => {
    let newRequest = await createResourceSentRequests({
      to_user: user.username,
    });
    setSentRequests([...sentRequests, newRequest]);
  };

  useEffect(() => {
    // filtering through users
    if (resourcesUsers && friends && resourcesSentRequests && isAuthenticated) {
      let friendEmails: any[] = [];

      for (let i = 0; i < friends.length; i++) {
        let friend = friends[i];
        let email = friend.email;
        friendEmails.push(email);
        friendEmails.push(user?.email);
      }
      setPotentialFriends(
        resourcesUsers.filter((user: any) => !friendEmails.includes(user.email))
      );
      setSentRequests(resourcesSentRequests);
    }
  }, [resourcesUsers, friends, resourcesSentRequests, isAuthenticated,user?.email]);

  return (
    <IonContent>
      {possibleFriend ? (
        ""
      ) : (
        <>
          <IonText>
            <h2 className="ion-text-center">
              You cant just go snooping around people's crap!
            </h2>
            <p className="ion-text-center">
              Enter the username of a friend and we'll ask them how they feel
              about becoming buddies
            </p>
          </IonText>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            {resourcesRequests && resourcesRequests.length > 0 ? (
              <IonBadge color="danger">{resourcesRequests.length}</IonBadge>
            ) : (
              ""
            )}
            <IonFabButton
              color="medium"
              activated={showRequests}
              onClick={() => setShowRequests(!showRequests)}
            >
              <IonIcon icon={personAddOutline} />
            </IonFabButton>
          </IonFab>
        </>
      )}

      <IonItem>
        <IonSearchbar
          value={possibleFriend}
          onIonChange={(e) => setPossibleFriend(e.detail.value!)}
          showCancelButton="never"
        ></IonSearchbar>
      </IonItem>

      <h4 className="ion-text-center">Possible Friends</h4>

      {potentialFriends && sentRequests && isAuthenticated ? (
        <IonList>
          {
            // eslint-disable-next-line array-callback-return
            potentialFriends.map(
              // eslint-disable-next-line array-callback-return
              (user: any, index: React.Key | null | undefined) => {
                if (
                  possibleFriend &&
                  user.username  &&
                  user.username
                    .toLowerCase()
                    .includes(`${possibleFriend.toLowerCase()}`)
                ) {
                  return (
                    <IonItem key={index}>
                      {/* <IonAvatar>
                        <img
                          src={`https://avatars.dicebear.com/api/bottts/${user.id}${user.poopInfo}.svg?colorful=true`}
                          alt={"little robot avatar for each person"}
                        />
                      </IonAvatar> */}
                      <IonLabel>
                        <h1>{user.username}</h1>
                        <h3>{user.email}</h3>
                      </IonLabel>
                      <IonButton
                        fill="outline"
                        slot="end"
                        color={checkIfPendingColor(user)}
                        disabled={checkIfPendingDisabled(user)}
                        onClick={() => handleRequest(user)}
                      >
                        {checkIfPendingString(user) || "send request"}
                      </IonButton>
                    </IonItem>
                  );
                }
              }
            )
          }
        </IonList>
      ) : (
        ""
      )}
      {showRequests ? 'pending request component' : ""}
    </IonContent>
  );
};

export default AddFriends;
