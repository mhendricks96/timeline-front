import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Timeline.css';
import CurrentYear from "../components/timelineComponents/currentYear"

const Timeline: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Timeline</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CurrentYear />
      </IonContent>
    </IonPage>
  );
};

export default Timeline;
