import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonAvatar,
  IonThumbnail,
  IonFab,
  IonFabButton,
  isPlatform,
  IonAlert,
  IonToast,
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
} from "@ionic/react";
import { addOutline, ban, banSharp, create, trash } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import FriendsContext from "../data/friend-context";

export const FRIENDS_DATA = [
  {
    id: "f1",
    name: "John Thor",
    pic: "https://awsimages.detik.net.id/community/media/visual/2021/09/20/thor-god-of-war-ragnarok_169.jpeg?w=700&q=90",
  },
  {
    id: "f2",
    name: "John Ness",
    pic: "https://cdn0-production-images-kly.akamaized.net/qu5zT969Hv6xj-AHYeYuYPrOt7E=/640x640/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2010443/original/080643400_1521450123-8._Phil_jones.jpg",
  },
  {
    id: "f3",
    name: "John Doe",
    pic: "https://i.pinimg.com/474x/91/15/0f/91150f74ed851a439b823893b6b75860.jpg",
  },
];

export default function Meet() {
  const callFriendHandler = () => {
    console.log("Calling...");
  };

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [startBlocking, setStartBlocking] = useState(false);
  const startBlockingFriendHandler = () => {
    setStartBlocking(true);
    slidingOptionsRef.current?.closeOpened();
  };

  const blockFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    setStartBlocking(false);
    setToastMessage("Blocked Friend!");
  };

  const removeFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Deleting...");
  };

  const editFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Editing...");
  };

  const startAddFriendHandler = () => {
    console.log("Adding friend..");
    setIsEditing(true);
    setSelectedFriend(null);
  };
  const friendsCtx = useContext(FriendsContext);

  const saveFriendHandler = () => {
    const enteredName = nameRef.current!.value;
    if (!enteredName) return;
    if (selectedFriend === null) {
      friendsCtx.addFriend(enteredName.toString(), "");
    }
    setIsEditing(false);
  };

  const [startDeleting, setStartDeleting] = useState(false);
  const startDeleteFriendHandler = () => {
    setStartDeleting(true);
    slidingOptionsRef.current?.closeOpened();
  };

  const [toastMessage, setToastMessage] = useState("");
  const deleteFriendHandler = () => {
    setStartDeleting(false);
    setToastMessage("Deleted Friend!");
  };

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    name: string;
  } | null>();
  const startEditFriendHandler = (friendId: string) => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Editing..");
    const friend = FRIENDS_DATA.find((f) => f.id === friendId);
    setSelectedFriend(friend);
    setIsEditing(true);
  };

  const cancelEditFriendHandler = () => {
    setIsEditing(false);
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={startDeleting}
        header="Are you sure?"
        message="Do you want to delete your friend?"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              setStartDeleting(false);
            },
          },
          { text: "Yes", handler: deleteFriendHandler },
        ]}
      />
      <IonAlert
        isOpen={startBlocking}
        header="Are you sure?"
        message="Do you want to block your friend?"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              setStartBlocking(false);
            },
          },
          { text: "Yes", handler: blockFriendHandler },
        ]}
      />
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => {
          setToastMessage("");
        }}
      />
      <IonPage>
        <IonModal isOpen={isEditing}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle> Meet </IonTitle>
              {!isPlatform("android") && (
                <IonButtons slot="end">
                  <IonButton>
                    <IonIcon icon={addOutline} />
                  </IonButton>
                </IonButtons>
              )}
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Friend Name</IonLabel>
                    <IonInput type="text" value={selectedFriend?.name} />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow className="ion-text-center">
                <IonCol>
                  <IonButton
                    fill="clear"
                    color="dark"
                    onClick={cancelEditFriendHandler}
                  >
                    Cancel
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    color="secondary"
                    expand="block"
                    onClick={saveFriendHandler}
                  >
                    Save
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
        <IonContent className="ion-padding">
          <IonList>
            {/* {FRIENDS_DATA.map(friend  */}
            {friendsCtx.friends.map((friend) => (
              <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                <IonItemOptions side="start">
                  <IonItemOption
                    color="danger"
                    onClick={startBlockingFriendHandler}
                  >
                    <IonIcon slot="icon-only" icon={ban} />
                  </IonItemOption>
                  <IonItemOption
                    color="warning"
                    onClick={startDeleteFriendHandler}
                  >
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonItemOption>
                </IonItemOptions>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="warning"
                    onClick={startEditFriendHandler.bind(null, friend.id)}
                  >
                    <IonIcon slot="icon-only" icon={create} />
                  </IonItemOption>
                </IonItemOptions>
                <IonItem lines="full" button onClick={callFriendHandler}>
                  <IonAvatar slot="start">
                    <img src={friend.photo} />
                  </IonAvatar>
                  <IonLabel>{friend.name}</IonLabel>
                </IonItem>
              </IonItemSliding>
            ))}
          </IonList>
          {isPlatform("android") && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddFriendHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
}
