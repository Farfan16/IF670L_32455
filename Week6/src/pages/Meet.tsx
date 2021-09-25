import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonItem, IonLabel, IonList, IonIcon, IonButton, IonItemSliding, IonItemOptions, IonItemOption, IonAvatar } from "@ionic/react";
import { ban, banSharp, create, trash } from "ionicons/icons";
import React, { useRef } from "react";

export const FRIENDS_DATA = [
    {id: "f1", name: 'John Thor', pic: "https://awsimages.detik.net.id/community/media/visual/2021/09/20/thor-god-of-war-ragnarok_169.jpeg?w=700&q=90"},
    {id: "f2", name: 'John Ness', pic: "https://cdn0-production-images-kly.akamaized.net/qu5zT969Hv6xj-AHYeYuYPrOt7E=/640x640/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2010443/original/080643400_1521450123-8._Phil_jones.jpg"},
    {id: "f3", name: 'John Doe', pic: "https://i.pinimg.com/474x/91/15/0f/91150f74ed851a439b823893b6b75860.jpg"}
]

export default function Meet () {

    const callFriendHandler = () => {
        console.log("Calling...");
    };

    
    
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
    const blockFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Blocking...");
    };

    const removeFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Deleting...");
    };

    const editFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Editing...");
    };

    return <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
            <IonTitle> Ionic Mail </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonList>
                {FRIENDS_DATA.map(friend => (
                    <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                        <IonItemOptions side="start">
                            <IonItemOption color="danger" onClick={blockFriendHandler}>
                                <IonIcon slot="icon-only" icon={ban} />
                            </IonItemOption>
                            <IonItemOption color="warning" onClick={removeFriendHandler}>
                                <IonIcon slot="icon-only" icon={trash} />
                            </IonItemOption>
                        </IonItemOptions>
                        <IonItemOptions side="end">
                            <IonItemOption color="warning" onClick={editFriendHandler}>
                                <IonIcon slot="icon-only" icon={create} />
                            </IonItemOption>
                        </IonItemOptions>
                        <IonItem lines="full" button onClick={callFriendHandler}>
                        <IonAvatar slot="start">
                            <img src= {friend.pic} />
                        </IonAvatar>
                            <IonLabel>{friend.name}</IonLabel>
                        </IonItem>
                    </IonItemSliding>   
                ))}
            </IonList>
        </IonContent>
    </IonPage>;
};
