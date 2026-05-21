import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default function CountryCard({ country }) {

  return (

    <View style={styles.card}>

      <Image
        source={{
          uri: country?.flags?.png,
        }}
        style={styles.flag}
      />

      <Text style={styles.countryName}>
        {country?.name?.common}
      </Text>

    </View>

  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3,
  },

  flag: {
    width: 60,
    height: 40,
    borderRadius: 5,
    marginRight: 15,
  },

  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },

});