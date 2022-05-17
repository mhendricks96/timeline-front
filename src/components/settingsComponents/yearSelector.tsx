import { IonButton, IonDatetime } from '@ionic/react';
import React, { useState } from 'react';

import { YearStore } from '../../stateStore';
import { useStoreState } from "pullstate";
import { getYear } from "../../stateStore/Selectors";

const YearSelector : React.FC = () => {

  const year = useStoreState(YearStore, getYear);
  const [selectedYear, setSelectedYear] = useState<any>(year);

  const handleYearChange = (e: string | null | undefined) => {
    let newYear = e?.slice(0,4)
    setSelectedYear(newYear)
  }

  const confirmYearChange = () => {
    YearStore.update((s) => {
      s.year = selectedYear;
    });
  }

  return (
    <div>
      <h1 className="ion-text-center">What year would you like your Timeline?</h1>
      <h3 className="ion-text-center">You are currently in {year}</h3>
      <IonDatetime presentation="year" onIonChange={e => handleYearChange(e.detail.value)}></IonDatetime>
      <IonButton expand="block" onClick={confirmYearChange}>Visit {selectedYear}</IonButton>
    </div>
  );
};

export default YearSelector;
