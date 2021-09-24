import { Redirect, Route } from "react-router-dom";
import {
  IonAlert,
  IonApp,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "../pages/Home";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import BmrControls from "../components/BmrControls";
import BmrResult from "../components/BmrResult";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "../theme/variables.css";
import InputControl from "../components/InputControl";

type BMR = {
  sendetary: number,
  exercise1: number,
  exercise2: number,
  dailyExrecise: number,
  intenseExercise: number
}

const BmrCalc: React.FC = () => {
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const ageInputRef = useRef<HTMLIonInputElement>(null);

  const [calculatedBMR, setCalculatedBMR] = useState<number>();
  const [BMRValues, setBMRValues] = useState<BMR>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"cmkg" | "ftlbs">("cmkg");
  const [gender, setGender] = useState<string>("male");

  const calculateBMR = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;
    const enteredAge = ageInputRef.current!.value;
    let bmr: number = 0;

    if (
      !enteredWeight ||
      !enteredHeight ||
      !enteredAge ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0 ||
      +enteredAge <= 0
    ) {
      setError("Please enter a valid (non-negative) input number");
      return;
    }

    const weightConversion = calcUnits === "ftlbs" ? 2.2 : 1;
    const heightConversion = calcUnits === "ftlbs" ? 0.0328 : 1;

    const weight = +enteredWeight / weightConversion;
    const height = +enteredHeight / heightConversion;

    if (gender === "male") {
      bmr = 66 + (13.7 * +enteredWeight) + (5 * +enteredHeight) - (6.8 * +enteredAge);
    } else {
      bmr = 655 + (9.6 * +enteredWeight) + (1.8 * +enteredHeight) - (4.7 * +enteredAge);
    }

    const bmrValueObject = {
      sendetary : bmr * 1.2,
      exercise1 : bmr * 1.375,
      exercise2 : bmr * 1.55,
      dailyExrecise : bmr * 1.725,
      intenseExercise : bmr * 1.9,
  }

   setCalculatedBMR(bmr);
   setBMRValues(bmrValueObject);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
    ageInputRef.current!.value = "";
  };

  const selectCalcUnitHandler = (selectedValue: "cmkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Okay", handler: setError }]}
      />
      <IonPage>
        <IonContent className="ion-padding"
          scrollEvents={true}
          onIonScrollStart={() => {}}
          onIonScroll={() => {}}
          onIonScrollEnd={() => {}}>
          <IonGrid>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>BMR Calculator</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonGrid>
              <IonRow>
                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                  <InputControl
                    selectedValue={calcUnits}
                    onSelectValue={selectCalcUnitHandler}
                  />
                  <IonItem>
                    <IonLabel position="floating">Age</IonLabel>
                    <IonInput ref={ageInputRef}></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                  <IonList>
                    <IonRadioGroup value={gender} onIonChange={e => setGender(e.detail.value)}>
                      <IonListHeader>
                        <IonLabel>Gender</IonLabel>
                      </IonListHeader>
                      <IonGrid>
                        <IonRow>
                          <IonCol>
                            <IonItem>
                              <IonLabel>Male</IonLabel>
                              <IonRadio slot="start" value="male" />
                            </IonItem>
                          </IonCol>
                          <IonCol>
                            <IonItem>
                              <IonLabel>Female</IonLabel>
                              <IonRadio slot="start" value="female" />
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonRadioGroup>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                  <IonItem>
                    <IonLabel position="floating">
                      Tinggi badan ({calcUnits === "cmkg" ? "cm" : "ft"})
                    </IonLabel>
                    <IonInput ref={heightInputRef}></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                  <IonItem>
                    <IonLabel position="floating">
                      Berat badan ({calcUnits === "cmkg" ? "kg" : "lbs"})
                    </IonLabel>
                    <IonInput ref={weightInputRef}></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                  <BmrControls onCalculate={calculateBMR} onReset={resetInputs} />
                  {calculatedBMR && BMRValues && (
                    <BmrResult onCalculated={calculatedBMR} bmrValue={BMRValues} />
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default BmrCalc;
