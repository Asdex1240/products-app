import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
const CheckAuthenticationLayout = () => {

  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, [])
  
  if( status === 'checking' ){
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator/>
      </View>
    )
  }

  if( status === 'unauthenticated' ){
    return <Redirect href="/auth/login"/>
  }
}

export default CheckAuthenticationLayout
