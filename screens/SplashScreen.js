import React, {
  useEffect,
} from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function SplashScreen({
  navigation,
}) {

  useEffect(() => {

    const timer =
      setTimeout(() => {

        // IR AL LOGIN
        navigation.replace(
          'LoginScreen'
        );

      }, 2500);

    return () =>
      clearTimeout(timer);

  }, []);


  return (

    <View style={styles.container}>

      <Text style={styles.logo}>
        🌍
      </Text>

      <Text style={styles.title}>
        Countries App
      </Text>

      <ActivityIndicator
        size="large"
        color="#C9A84C"
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#09090D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 70,
    marginBottom: 10,
  },

  title: {
    color: '#F0EBE0',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
  },

});