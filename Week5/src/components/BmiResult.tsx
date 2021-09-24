import { IonRow, IonCol, IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import React from 'react';
import './BmiResult.css';

const BmiResult: React.FC <{onCalculated: number; onBodyType: string | undefined}> = props => {
    return (
        <IonRow>
          <IonCol>
            <IonCard id="result" className={
              props.onBodyType === "Normal" ? "ion-card-success" :
              props.onBodyType === "Gemuk" || props.onBodyType === "Kurus" ? "ion-card-warning":
              "ion-card-danger"
            }>
              <IonCardContent className="ion-text-center">
                <h2>{props.onCalculated}</h2>
                <h1>{props.onBodyType}</h1>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
    )
}

export default BmiResult;
