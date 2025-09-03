import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  options: string[];
  selectedOptions: string[];

  onSelect: ( option: string ) => void;
}

const ThemeButtonGroup = ({ options, selectedOptions, onSelect }: Props) => {

  const primaryColor = useThemeColor({}, 'primary')

  return (
    <View style={ styles.container } >
      {
        options.map( option => (
          <TouchableOpacity
            onPress={ () => onSelect(option) }
            style={[
              styles.button,
              selectedOptions.includes(option) && {
                backgroundColor: primaryColor
              }
            ]}
            key={option}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[
                styles.buttonText,
                selectedOptions.includes(option) && styles.selectedButtonText
              ]}
            >{option[0].toUpperCase() + option.slice(1) }</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default ThemeButtonGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  button: {
    padding: 10,
    margin: 5,
    flex: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
  },

  selectedButtonText: {
    color: '#fff'
  }
})