import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react"
import { mailOutline, videocamOutline } from "ionicons/icons"
import { Route, Redirect } from "react-router"
import Mail from "./Mail"
import MailDetail from "./MailDetail"
import Meet from "./Meet"
import Settings from "./Settings"
import Spam from "./Spam"

const MailTabs: React.FC = () => (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/mail" />
        <Route exact path="/tabs/mail" component={Mail} />
        <Route exact path="/tabs/meet" component={Meet} />
        <Route exact path="/tabs/spam" component={Spam} /> 
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="mail" href="/tabs/mail">
          <IonIcon icon={mailOutline} />
          <IonLabel>Mail</IonLabel>
        </IonTabButton>
        <IonTabButton tab="meet" href="/tabs/meet">
          <IonIcon icon={videocamOutline} />
          <IonLabel>Meet</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
);

export default MailTabs;