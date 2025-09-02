import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import React from 'react'
import { KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native'

const RegisterScreen = () => {
  const { height } = useWindowDimensions()
  const backgroundColor = useThemeColor({}, 'background')

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
            />

            <ThemedTextInput
              placeholder='Correo electrónico'
              keyboardType='email-address'
              autoCapitalize='none'
              icon='mail-outline'
            />

            <ThemedTextInput
              placeholder='Contraseña'
              secureTextEntry
              autoCapitalize='none'
              icon='lock-closed-outline'
            />
          </View>
          <View style={{ marginTop: 10 }} ></View>
          <ThemedButton icon='arrow-forward-outline'>Crear Cuenta</ThemedButton>
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