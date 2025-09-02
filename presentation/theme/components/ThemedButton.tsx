import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedText } from './ThemedText';

interface Props extends PressableProps  {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap
}

const ThemedButton = ({children, icon, ...rest}: Props) => {

  const primaryColor = useThemeColor({}, 'primary');
  const textColor = useThemeColor({}, 'text');

  return (
    <Pressable
      {...rest}  style={ ({pressed}) => [
        {
          backgroundColor: pressed ? primaryColor + '90' : primaryColor,
        },
        styles.button
      ]} 
    >
      <ThemedText style={{ color:'white' }} >{children}</ThemedText>
      {
        icon && (
          <Ionicons
            name={icon}
            size={24}
            color='white'
            style={{ marginHorizontal: 5 }}
          />
        )
      }
    </Pressable>
  )
}

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})