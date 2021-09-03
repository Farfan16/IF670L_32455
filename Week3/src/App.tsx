import { Redirect, Route } from 'react-router-dom';
import { IonAlert, IonApp, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { calculatorOutline, refreshOutline} from 'ionicons/icons';
import { useRef, useState } from 'react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControl from './components/InputControl';

const App: React.FC = () => {
  const [ calculatedBMI, setCalculatedBMI ] = useState<number>();
  const [ typeOfBMI, setTypeOfBMI ] = useState<string>();
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const [ error, setError ] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    let typeBMI : string = "";

    if(!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
      setError('Please enter a valid (non-negative) input number')
      return;
    }
    
    const weightConversion = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConversion = calcUnits === 'ftlbs' ? 0.0328 : 1;

    const weight = +enteredWeight / weightConversion;
    const height = +enteredHeight / heightConversion;


    const bmi = weight / ((height/100) * (height/100));

    if (bmi < 18.5) {
      typeBMI = "Kurus";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
      typeBMI = "Normal";
  } else if (bmi >= 25 && bmi <= 29.9) {
      typeBMI = "Gemuk";
  } else if (bmi >= 30) {
      typeBMI = "Obesitas";
  }

    console.log(bmi);

    setCalculatedBMI(bmi);
    setTypeOfBMI(typeBMI);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };
  
  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  return (

    <>
    <IonAlert 
      isOpen={!!error}
      message={error}
      buttons={[
        {text: 'Okay', handler: setError}
      ]}
    />
    <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonGrid>
        <IonRow>
          <IonCol>
            <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
            <IonItem>
              <IonLabel position="floating">Tinggi badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
              <IonInput ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Berat badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
              <IonInput ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
        {calculatedBMI && (<BmiResult onCalculated={calculatedBMI} onBodyType={typeOfBMI}/>)}
      </IonGrid>
    </IonApp>
  </>
  )
};

export default App;
