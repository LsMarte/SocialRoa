import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Home Screen
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className="bg-blue-500 p-3 rounded-lg"
      >
        <Text className="text-white font-bold">Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;