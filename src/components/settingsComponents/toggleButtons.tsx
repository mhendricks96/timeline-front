import {
  IonToggle,
  IonList,
  IonItem,
  IonLabel,
  IonItemDivider,
  ToggleChangeEventDetail,
} from "@ionic/react";
import React, { useState } from "react";

const ToggleButtons: React.FC = () => {

  const [sportsOn, setSportsOn] = useState<boolean>(true);
  const [newsOn, setNewsOn] = useState<boolean>(true);
  const [entertainmentOn, setEntertainmentOn] = useState<boolean>(true);
  const [politicsOn, setPoliticsOn] = useState<boolean>(true);
  const [popOn, setPopOn] = useState<boolean>(true);

  const categories = [
    { label: "Sports", value: "sports", checked: sportsOn, toggle: setSportsOn },
    { label: "News", value: "news", checked: newsOn, toggle: setNewsOn },
    {
      label: "Entertainment",
      value: "entertainment",
      checked: entertainmentOn,
      toggle: setEntertainmentOn
    },
    { label: "Politics", value: "politics", checked: politicsOn, toggle: setPoliticsOn},
    { label: "Pop", value: "pop", checked: popOn, toggle: setPopOn },
  ];

  const handleToggle = (e: ToggleChangeEventDetail<any>) => {
    let value = e.value;
    let checked = e.checked;

    for (let i = 0; i < categories.length; i++){
      let category = categories[i]
      if (value === category.value){
        category.toggle(checked)
      }
    }
  };

  // console.log({
  //   "sports": sportsOn,
  //   "news": newsOn,
  //   "entertainment": entertainmentOn,
  //   "politics": politicsOn,
  //   "pop": popOn,
  // })

  return (
    <IonList>
      <IonItemDivider>Categories subscribed to</IonItemDivider>
      {categories.map((category, index) => {
        return (
          <IonItem key={index}>
            <IonLabel>{category.label}</IonLabel>
            <IonToggle
              color="primary"
              value={category.value}
              checked={category.checked}
              onIonChange={(e) => handleToggle(e.detail)}
            />
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default ToggleButtons;
