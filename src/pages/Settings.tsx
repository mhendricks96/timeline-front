import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Settings.css';
import ToggleButtons from "../components/settingsComponents/toggleButtons";
import YearSelector from "../components/settingsComponents/yearSelector";

import { useAuth0 } from "@auth0/auth0-react";

const Settings: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <YearSelector />
        <ToggleButtons />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
