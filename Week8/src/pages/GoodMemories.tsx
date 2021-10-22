import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonButton,
  IonButtons,
  IonIcon,
  isPlatform,
  IonFab,
  IonFabButton,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import React, { useContext } from "react";
import MemoriesContext from "../data/memories-context";

export default function GoodMemories() {
  const memoriesCtx = useContext(MemoriesContext);
  const goodMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === "good"
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Good Memories</IonTitle>
          {!isPlatform("android") && (
            <IonButtons slot="end">
              <IonButton routerLink="/tabs/new">
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {goodMemories.length === 0 && (
            <IonRow>
              <IonCol>
                <h2>Good Memories</h2>
              </IonCol>
            </IonRow>
          )}
          {goodMemories.map(memory => (
            <IonRow key={memory.id}>
              <IonCol>
                <img src={memory.base64Url} alt={memory.title} />
                <IonCardHeader>
                  <IonCardTitle>{memory.title}</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        {isPlatform("android") && (
          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="secondary" routerLink="/tabs/new">
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
}
