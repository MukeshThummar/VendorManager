import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCurrentVersion = () => {
    const appVersion = Constants?.expoConfig?.extra?.appVersion;
    return appVersion;
};

const getStoredVersion = async () => {
    const version = await AsyncStorage.getItem('app_version');
    return version;
};

const setStoredVersion = async (version: string) => {
    await AsyncStorage.setItem('app_version', version);
};

export { getCurrentVersion, getStoredVersion, setStoredVersion };
