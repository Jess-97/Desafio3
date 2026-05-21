import React, {
  useState,
  useEffect,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function LoginScreen({
  navigation,
  route,
}) {

  // =========================
  // STATES
  // =========================

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [savedEmail,
    setSavedEmail] =
    useState('');

  const [savedPassword,
    setSavedPassword] =
    useState('');



  // =========================
  // RECIBIR DATOS DEL REGISTER
  // =========================

  useEffect(() => {

    if (route.params) {

      setSavedEmail(
        route.params.userEmail
      );

      setSavedPassword(
        route.params.userPassword
      );
    }

  }, [route.params]);



  // =========================
  // VALIDAR LOGIN
  // =========================

  const handleLogin = () => {

    if (
      email === '' ||
      password === ''
    ) {

      Alert.alert(
        'Error',
        'Completa todos los campos'
      );

      return;
    }


    if (
      email === savedEmail &&
      password === savedPassword
    ) {

      Alert.alert(
        'Correcto',
        'Inicio de sesión exitoso'
      );

      navigation.navigate('Home');

    } else {

      Alert.alert(
        'Error',
        'Correo o contraseña incorrectos'
      );
    }
  };



  return (

    <View style={styles.container}>

      <Text style={styles.logo}>
        🌍
      </Text>

      <Text style={styles.title}>
        Bienvenido
      </Text>

      <Text style={styles.subtitle}>
        Inicia sesión para continuar
      </Text>


      {/* EMAIL */}

      <TextInput
        placeholder="Correo"
        placeholderTextColor="#6B6B86"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />


      {/* PASSWORD */}

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#6B6B86"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />


      {/* BOTON LOGIN */}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleLogin}
      >

        <Text style={styles.buttonText}>
          Iniciar Sesión
        </Text>

      </TouchableOpacity>


      {/* REGISTER */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'RegisterScreen'
          )
        }
      >

        <Text style={styles.link}>
          ¿No tienes cuenta?{" "}
          <Text style={styles.linkBold}>
            Registrarse
          </Text>
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#09090D',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    fontSize: 70,
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    color: '#F0EBE0',
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    color: '#6B6B86',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
    fontSize: 15,
  },

  input: {
    backgroundColor: '#111118',
    borderWidth: 1,
    borderColor: '#252535',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#F0EBE0',
    fontSize: 15,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#C9A84C',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#09090D',
    fontWeight: '700',
    fontSize: 16,
  },

  link: {
    color: '#6B6B86',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 14,
  },

  linkBold: {
    color: '#C9A84C',
    fontWeight: '700',
  },

});