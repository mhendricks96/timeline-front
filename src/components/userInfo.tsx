import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonThumbnail} from '@ionic/react';
import { useAuth0 } from '@auth0/auth0-react';

const UserInfo: React.FC = () => {

  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  // console.log(user)

  return (
    <IonCard>
        <IonCardHeader>
          <IonThumbnail>
            <img src={user?.picture} alt="the users puicture associated with account"/>
          </IonThumbnail>
          <IonCardSubtitle>{user?.email}</IonCardSubtitle>
          <IonCardTitle><p>{user?.name}</p></IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
        </IonCardContent>

    </IonCard>
  );
};

export default UserInfo;
