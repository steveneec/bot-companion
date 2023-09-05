import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeString(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

export async function loadString(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeKey(key: string) {
  try {
    const value = await AsyncStorage.removeItem(key);
    return value;
  } catch (error) {
    console.log(error);
    return -1;
  }
}
