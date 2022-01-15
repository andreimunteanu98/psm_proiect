import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

// main code of camera
export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
        const data = await camera.takePictureAsync();
        setImage(data.uri);
    }
  };

  const saveImage = async () => {
    await MediaLibrary.saveToLibraryAsync(image);
    alert("The image has been saved successfully!");
    setImage(null);
  };

  const removeImage = () => {
    setImage(null);
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, width: '100%' }}>
        <View style={styles.cameraContainer}>
            <Camera 
                ref={ref => setCamera(ref)}
                style={styles.camera} 
                type={type} 
                ratio={'1:1'}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                >
                    <View 
                        style={{
                            paddingTop: 10,
                            paddingLeft: 10
                        }}
                    >
                        <Button
                            title="Flip camera"
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}
                        />
                    </View>
                    <View
                        style={{
                            paddingTop: 10,
                            paddingRight: 10
                        }}
                    >
                        <Button
                            title="Take picture"
                            onPress={() => takePicture()}
                        />
                    </View>
                </View>
            </Camera>
        </View>
        {image && 
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor: '#7bff00'
                }}
            >
                <View 
                    style={{
                        paddingLeft: 10
                    }}
                >
                    <Button
                        title="Remove image"
                        onPress={() => removeImage()}
                    />
                </View>
                <View
                    style={{
                        paddingRight: 10
                    }}
                >
                    <Button
                        title="Save image"
                        onPress={() => saveImage()}
                    />
                </View>
            </View>
        }
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    camera: {
        flex: 1,
        aspectRatio: 1
    },
    controllers: {
        flex: 1
    }
}); 