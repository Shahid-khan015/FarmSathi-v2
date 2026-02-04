import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000/',
  },
  prod: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000/',
  },
};

const getEnvVars = () => {
  const releaseChannel = Constants.expoConfig?.extra?.releaseChannel;
  if (releaseChannel === 'prod') {
    return ENV.prod;
  }
  return ENV.dev;
};

export const config = getEnvVars();
