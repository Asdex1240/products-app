import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export class SecureStorageAdapter {
    static async setItem(key: string, value: string){
      try {
        await SecureStore.setItemAsync(key, value);

      } catch (error) {
        console.log({ error });
        Alert.alert('Error storing the auth token');
      }
    }

    static async getItem(key:string){
      try {
        return await SecureStore.getItemAsync(key);
      } catch (error) {
        Alert.alert('Error getting the auth token');
        return null;
      }
    }

    static async deleteItem(key: string){
      try {
        await SecureStore.deleteItemAsync(key);
      } catch (error) {
        console.log({ error });
        Alert.alert('Error deleting the auth token');
      }
    }
}