import * as React from 'react';
import {Router} from './router';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <Router />;
}
