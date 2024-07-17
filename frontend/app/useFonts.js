//updated: newly added

import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

const useFonts = async () => {
  await Font.loadAsync({
    'OpenSans-Semibold': require('../assets/fonts/OpenSans-Semibold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Harmond-Bold': require("../assets/fonts/Harmond-ExtraBoldExpanded.otf"),
    'Harmond-Condensed': require("../assets/fonts/Harmond-SemiBoldCondensed.otf"),
    'NeueMetana-Bold': require('../assets/fonts/NeueMetana-Bold.otf'),
    'NeueMetana-Regular': require('../assets/fonts/NeueMetana-Regular.otf'),
  });
}; 

export const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await useFonts();
      setFontsLoaded(true);
    })();
  }, []);

  return fontsLoaded;
};
