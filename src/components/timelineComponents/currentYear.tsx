import { IonText } from '@ionic/react';
import React from 'react';

import { YearStore } from '../../stateStore';
import { useStoreState } from "pullstate";
import { getYear } from "../../stateStore/Selectors";

const CurrentYear : React.FC = () => {

  const year = useStoreState(YearStore, getYear);

  return (
    <IonText>
      <h1 className="ion-text-center">{year}</h1>
    </IonText>
  );
};

export default CurrentYear;