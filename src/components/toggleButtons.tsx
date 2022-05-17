import {
  IonToggle,
  IonList,
  IonItem,
  IonLabel,
  IonItemDivider,
  ToggleChangeEventDetail,
} from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

const ToggleButtons: React.FC = () => {
  const [sportsOn, setSportsOn] = useState<boolean>(true);
  const [newsOn, setNewsOn] = useState<boolean>(true);
  const [entertainmentOn, setEntertainmentOn] = useState<boolean>(true);
  const [politicsOn, setPoliticsOn] = useState<boolean>(true);
  const [popOn, setPopOn] = useState<boolean>(true);

  const categories = [
    { label: "Sports", value: "sports", checked: sportsOn },
    { label: "News", value: "news", checked: newsOn },
    {
      label: "Entertainment",
      value: "entertainment",
      checked: entertainmentOn,
    },
    { label: "Politics", value: "politics", checked: politicsOn },
    { label: "Pop", value: "pop", checked: popOn },
  ];

  const handleToggle = (e: ToggleChangeEventDetail<any>) => {
    let value = e.value;
    let checked = e.checked;
    // console.log(value, checked);

    if (value === "sports") {
      setSportsOn(checked);
    }
    if (value === "news") {
      setNewsOn(checked);
    }
    if (value === "entertainment") {
      setEntertainmentOn(checked);
    }
    if (value === "politics") {
      setPoliticsOn(checked);
    }
    if (value === "pop") {
      setPopOn(checked);
    }
  };

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log({
    "sports": sportsOn,
    "news": newsOn,
    "entertainment": entertainmentOn,
    "politics": politicsOn,
    "pop": popOn,
  })

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
