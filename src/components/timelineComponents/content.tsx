import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState, useEffect } from "react";
import useResourceBeers from "../../hooks/useResourceBeers";

const Content: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const { resourcesBeers } = useResourceBeers();
  console.log(resourcesBeers)
  const beerNames: string[] = []


  const pushData = () => {
    const max = data.length;
    const min = max;
    const newData = beerNames;
    for (let i = min; i < max; i++) {
      newData.push("Item" + i);
    }

    setData([...data, ...newData]);
  };
  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData();
      console.log("Loaded data");
      ev.target.complete();
      if (data.length === 1000) {
        setInfiniteDisabled(true);
      }
    }, 500);
  };

  // useIonViewWillEnter(() => {
  //   pushData();

  // });

  useEffect(() => {
    if (resourcesBeers){

      for (let i = 0; i < resourcesBeers.length; i++) {
        let beerName: string = resourcesBeers[i].name
        beerNames.push(beerName)
        beerNames.push(beerName)
        
      }
    }
    pushData();
  }, [resourcesBeers]);


  return (
    <div>
      <IonList>
        {data.map((item, index) => {
          return (
            <IonItem key={index}>
              <IonLabel>{item}</IonLabel>
            </IonItem>
          );
        })}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={loadData}
        threshold="100px"
        disabled={isInfiniteDisabled}
      >
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more data..."
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </div>
  );
};

export default Content;
