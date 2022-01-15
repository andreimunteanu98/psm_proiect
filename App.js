import { StyleSheet, View, Text } from 'react-native';

import Camera from './components/Camera';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Photo app</Text>
      </View>
      <Camera />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#7bff00',
    alignItems: 'center',
    paddingTop: 40,
    height: 70
  },
  headerTitle: {
    fontSize: 20,
    color: '#212121'
  }
});
