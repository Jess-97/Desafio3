import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function RegisterScreen({
  navigation,
}) {

  // =========================
  // STATES
  // =========================

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [confirmPassword,
    setConfirmPassword] =
    useState('');



  // =========================
  // REGISTRO
  // =========================

  const handleRegister = () => {

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {

      Alert.alert(
        'Error',
        'Completa todos los campos'
      );

      return;
    }


    if (
      password !== confirmPassword
    ) {

      Alert.alert(
        'Error',
        'Las contraseñas no coinciden'
      );

      return;
    }


    if (
      password.length < 6
    ) {

      Alert.alert(
        'Error',
        'La contraseña debe tener mínimo 6 caracteres'
      );

      return;
    }


    Alert.alert(
      'Correcto',
      'Cuenta creada exitosamente'
    );


    // ENVIAR DATOS AL LOGIN

    navigation.navigate(
      'LoginScreen',
      {
        userEmail: email,
        userPassword: password,
      }
    );
  };



  return (

    <View style={styles.container}>

      <Text style={styles.logo}>
        🌍
      </Text>

      <Text style={styles.title}>
        Crear Cuenta
      </Text>

      <Text style={styles.subtitle}>
        Regístrate para continuar
      </Text>


      {/* NOMBRE */}

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#6B6B86"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />


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


      {/* CONFIRM PASSWORD */}

      <TextInput
        placeholder="Confirmar contraseña"
        placeholderTextColor="#6B6B86"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />


      {/* BOTON REGISTER */}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleRegister}
      >

        <Text style={styles.buttonText}>
          Registrarse
        </Text>

      </TouchableOpacity>


      {/* LOGIN */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'LoginScreen'
          )
        }
      >

        <Text style={styles.link}>
          ¿Ya tienes cuenta?{" "}
          <Text style={styles.linkBold}>
            Iniciar sesión
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