import 'react-native-gesture-handler';

import React from 'react';

import {
  NavigationContainer,
  DarkTheme,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  StatusBar,
  View,
} from 'react-native';

// ==========================
// IMPORTAR PANTALLAS
// ==========================

import SplashScreen from './screens/SplashScreen';

import LoginScreen from './screens/LoginScreen';

import RegisterScreen from './screens/RegisterScreen';

import HomeScreen from './screens/HomeScreen';

import DetailsScreen from './screens/DetailsScreen';

const Stack =
  createNativeStackNavigator();


// ==========================
// TEMA OSCURO
// ==========================

const MyTheme = {

  ...DarkTheme,

  colors: {

    ...DarkTheme.colors,

    background: '#09090D',

    card: '#09090D',

    border: '#09090D',

    primary: '#C9A84C',

    text: '#F0EBE0',
  },
};


// ==========================
// APP
// ==========================

export default function App() {

  return (

    <View
      style={{
        flex: 1,
        backgroundColor:
          '#09090D',
      }}
    >

      <StatusBar
        barStyle="light-content"
        backgroundColor="#09090D"
      />

      <NavigationContainer
        theme={MyTheme}
      >

        <Stack.Navigator

          // PANTALLA INICIAL
          initialRouteName="SplashScreen"

          screenOptions={{

            animation: 'fade',

            animationDuration: 120,

            contentStyle: {
              backgroundColor:
                '#09090D',
            },

            headerStyle: {
              backgroundColor:
                '#09090D',
            },

            headerShadowVisible:
              false,

            headerTintColor:
              '#C9A84C',

            headerTitleStyle: {
              fontWeight: '700',
              letterSpacing: 1,
            },

            navigationBarColor:
              '#09090D',

            statusBarColor:
              '#09090D',
          }}
        >

          {/* SPLASH */}

          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />


          {/* LOGIN */}

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
               headerShown: false,
            }}
          />


          {/* REGISTER */}

          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />


          {/* HOME */}

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              
            }}
          />


          {/* DETAILS */}

          <Stack.Screen
            name="DetailsScreen"
            component={
              DetailsScreen
            }
            options={{
              title:
                'Detalle del País',
            }}
          />

        </Stack.Navigator>

      </NavigationContainer>

    </View>
  );
}