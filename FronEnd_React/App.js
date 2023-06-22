import { StyleSheet} from 'react-native';
import Navigation from './config/navigation/Navigation';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true)
//No muestra alertas en la aplicación movil 

export default function App() {
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
