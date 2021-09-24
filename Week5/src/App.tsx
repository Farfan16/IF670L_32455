import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import BmiCalc from "./pages/BmiCalc";
import BmrCalc from "./pages/BmrCalc";
import Home from "./pages/Home";


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Redirect exact from="/" to="/home" />
        <Route path="/bmi" component={BmiCalc} />
        <Redirect exact from="/" to="/home" />
        <Route path="/bmr" component={BmrCalc} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)

export default App;