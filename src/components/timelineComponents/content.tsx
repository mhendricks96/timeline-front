import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
  IonCard,
  IonCardTitle,
  IonCardContent,
  // useIonViewWillEnter,
} from "@ionic/react";
import { useState, useEffect } from "react";
import useResourceBeers from "../../hooks/useResourceBeers";

const Content: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const { resourcesBeers } = useResourceBeers();
  // console.log(resourcesBeers)
  const beerTitles: any[] = []

  const pushData = () => {
    const max = data.length;
    const min = max;
    const newData = beerTitles;
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

  useEffect(() => {
    if (resourcesBeers){

      for (let i = 0; i < resourcesBeers.length; i++) {
        let beerTitle: string = resourcesBeers[i].title
        let beerDescription: string = resourcesBeers[i].description
        beerTitles.push([beerTitle, beerDescription]); 
      }
    }
    pushData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourcesBeers]);

  return (
    <div>
      <IonList>
        {data.map((item, index) => {
          let title = item[0];
          let description = item[1];
          return (
            <IonItem key={index}>
              <IonCard>
                <IonCardTitle>{title}</IonCardTitle>
                <IonCardContent>{description}</IonCardContent>
              </IonCard>
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
