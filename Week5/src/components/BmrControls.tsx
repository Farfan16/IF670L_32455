import { IonButton, IonCol, IonRow, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";

const BmrControls : React.FC<{onCalculate: () => void; onReset: () => void}> = (props) => {
    return(
        <IonRow>
            <IonCol size="12" size-md="6" className="ion-text-center">
                <IonButton onClick={props.onCalculate} className="text-center">
                <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                Calculate
                </IonButton>
            </IonCol>
            <IonCol size="12" size-md="6" onClick={props.onReset} className="ion-text-center">
                <IonButton>
                <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                Reset
                </IonButton>
            </IonCol>
        </IonRow>
    )
}

export default BmrControls;