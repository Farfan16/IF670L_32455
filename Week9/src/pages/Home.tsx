import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { Geolocation } from "@capacitor/geolocation";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useState } from "react";

const Home: React.FC = () => {
  const [lat, setLat] = useState<number>(-6.257377926995551);
  const [lng, setLng] = useState<number>(106.61829861017398);

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if (e.latLng?.lat()) {
      setLat(e.latLng?.lat());
    }
    if (e.latLng?.lng()) {
      setLng(e.latLng?.lng());
    }
  };

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

    console.log("Current position: ", coordinates);
    console.log("Lat: ", coordinates.coords.latitude);
    console.log("Lng: ", coordinates.coords.longitude);
    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
  };

  const trackPosition = async () => {
    const data = await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 1000,
      },
      (position, err) => {
        if (position) {
          console.log(position);
        }
      }
    );
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={getCurrentPosition}>Current Position</IonButton>
        <IonButton onClick={trackPosition}>Track Position</IonButton>
        <LoadScript googleMapsApiKey="AIzaSyAROJQCp8YngOWqOHygx6oh24vQ5IdYBJE">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: lat, lng: lng }}
            zoom={10}
          >
            <Marker position={{ lat: lat, lng: lng }} />
          </GoogleMap>
        </LoadScript>
      </IonContent>
    </IonPage>
  );
};

export default Home;
