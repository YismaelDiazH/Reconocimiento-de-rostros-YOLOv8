import Loader from '../../../../../kernel/components/Loading';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Camera } from 'expo-camera';
import { useNavigation } from "@react-navigation/native";

export default function CameraComponent  ({  isVisible, onClose, onPictureTaken  }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let camera = null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
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
      formData.append('file', {
        uri: data.uri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });
  
      try {
        const response = await fetch('http://127.0.0.1:5000/detected_img', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          // La imagen se envió correctamente a la API
  
          // Aquí puedes realizar las acciones adicionales que deseas después de enviar la imagen
  
        } else {
          // Ocurrió un error al enviar la imagen a la API
          console.log('Error al enviar la imagen a la API');
        }
      } catch (error) {
        console.log('Error de red:', error);
      }
  
      
  
      // Resto del código de la función...
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  
  const closeCamera = () => {
    setIsPreview(false); // Cierra la vista previa de la imagen
    setPhoto(null); // Limpia la imagen capturada
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      {!isLoading && (
        <Camera
          style={styles.camera}
          type={cameraType}
          ref={(ref) => {
            camera = ref;
          }}
        >
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={takePicture}
            >
              <Text style={styles.text}>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={closeCamera}
            >
              <Text style={styles.text}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#68179f',
    width: 100,
    height: 50,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
