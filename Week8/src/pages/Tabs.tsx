import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
import { happy, sad } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Bad from "./BadMemories";
import Good from "./GoodMemories";
import New from "./NewMemory";

export default function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/good" />
        <Route path="/tabs/bad" component={Bad} />
        <Route path="/tabs/good" component={Good} />
        <Route path="/tabs/new" component={New} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="good" href="/tabs/good">
          <IonIcon icon={happy} />
          <IonLabel>Good Memories</IonLabel>
        </IonTabButton>
        <IonTabButton tab="bad" href="/tabs/bad">
          <IonIcon icon={sad} />
          <IonLabel>Bad Memories</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
