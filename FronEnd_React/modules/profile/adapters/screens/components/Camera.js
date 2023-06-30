import Loader from "../../../../../kernel/components/Loading";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function CameraComponent({
  isVisible,
  onClose,
  onPictureTaken,
}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let camera = null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    setIsLoading(true);
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setPhoto(data.uri);
      setIsPreview(true);
      // Crear objeto FormData para enviar la imagen a la API
      const formData = new FormData();
      formData.append("imagen", {
        uri: data.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      try {
        console.log("Entro al try para solicitud :D");
        const response = await fetch(
          "http://192.168.137.252:5000/detected_img",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const responseText = await response.text();

          console.log(responseText);

          // Aquí puedes realizar las acciones adicionales que deseas después de enviar la imagen
        } else {
          // Ocurrió un error al enviar la imagen a la API
          console.log(response);
          console.log("Error al enviar la imagen a la API");
        }
      } catch (error) {
        console.log("Error de red:", error);
      } finally {
        setIsLoading(false);
      }
    }
    // Resto del código de la función...
  };

  const closeCamera = () => {
    setIsPreview(false); // Cierra la vista previa de la imagen
    setPhoto(null); // Limpia la imagen capturada
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  if (isPreview) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photo }} style={styles.previewImage} />
        <TouchableOpacity style={styles.previewButton} onPress={closeCamera}>
          <Text style={styles.previewButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
       <ScrollView style={styles.mx}>

      
      {isLoading && <Loader />}
      <Camera
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        ref={(ref) => {
          camera = ref;
        }}
      >
        {isLoading ? (
          <View /> // Mostrar un componente vacío mientras isLoading es true
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Tomar Foto</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={closeCamera}>
              <Text style={styles.text}>Cerrar</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </Camera>
    
      </ScrollView>
      </View>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
   
  },
  mx: {
    flex: 1,
    margin:20
  },
  camera: {
    flex: 1,
    width: "100%",
    height: 500,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end", // Alinear en la parte inferior
    marginHorizontal: 20,
    marginBottom: 20, // Ajustar margen inferior
  },
  
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#84baec",
    width: 100,
    height: 50,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  previewButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#84baec",
    borderRadius: 10,
  },
  previewButtonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  
});
