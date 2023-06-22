import Loader from '../../../../../kernel/components/Loading';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from "@react-navigation/native";

export default function CameraComponent  ({  isVisible, onClose, onPictureTaken  }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let camera = null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleClose = () => {
    onClose();
  };

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
              onPress={handleClose}
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
