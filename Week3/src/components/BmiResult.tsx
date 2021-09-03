import { IonRow, IonCol, IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import React from 'react'

const BmiResult: React.FC <{onCalculated: number; onBodyType: string | undefined}> = props => {
    return (
        <IonRow>
          <IonCol>
            <IonCard>
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
