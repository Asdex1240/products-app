import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native'

const RegisterScreen = () => {
  const { height } = useWindowDimensions()
  const backgroundColor = useThemeColor({}, 'background')

  const { register } = useAuthStore();

  const [isposting, setIsposting] = useState(false)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const onRegister = async() => {
    const { fullName, email, password } = form;
    
    if (fullName.length === 0 || email.length === 0  || password.length === 0) return;
    setIsposting(true);
    console.log(form)
    const wasSuccessful = await register(fullName, email, password);

    setIsposting(false);
    
    if (wasSuccessful) {
      router.replace('/');
      return
    }

    Alert.alert('Error', 'No se pudo crear la cuenta');
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1, backgroundColor: backgroundColor }}
    >
      <View style={{ 
        paddingTop: height * 0.35
       }}>
        <ScrollView style={{
          paddingHorizontal: 40
        }}>
          <ThemedText type='title'>Crear cuenta</ThemedText>
          <ThemedText style={{ color: 'grey' }} >Por favor, crea una cuenta para continuar</ThemedText>
          <View style={{ marginTop: 20 }}>
            
            <ThemedTextInput
              placeholder='Nombre completo'
              autoCapitalize='words'
              icon='person-outline'
              value={ form.fullName }
              onChangeText={ (value) => setForm({...form, fullName: value}) }
            />

            <ThemedTextInput
              placeholder='Correo electrónico'
              keyboardType='email-address'
              autoCapitalize='none'
              icon='mail-outline'
              value={ form.email }
              onChangeText={ (value) => setForm({...form, email: value}) }
            />

            <ThemedTextInput
              placeholder='Contraseña'
              secureTextEntry
              autoCapitalize='none'
              icon='lock-closed-outline'
              value={ form.password }
              onChangeText={ (value) => setForm({...form, password: value}) }
            />
          </View>
          <View style={{ marginTop: 10 }} ></View>
          <ThemedButton
            icon='arrow-forward-outline'
            disabled={ isposting }
            onPress={ onRegister }  
          >Crear Cuenta</ThemedButton>
          <View style={{ marginTop: 50 }} ></View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ThemedText>¿Ya tienes una cuenta? </ThemedText>
            <ThemedLink dismissTo href={'/auth/login'} >
              Ingresar
            </ThemedLink>
          </View>
        </ScrollView>


      </View>
    </KeyboardAvoidingView>
  )

}

export default RegisterScreen