import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const ProfileCard = ({ user }) => {
  return (
    <View className="bg-white rounded-lg shadow-lg p-6 m-4">
      <View className="flex-row items-center mb-4">
        <View className="w-16 h-16 bg-indigo-500 rounded-full items-center justify-center">
          <Text className="text-white text-2xl font-bold">
            {user?.name?.charAt(0) || '?'}
          </Text>
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold text-gray-800">
            {user?.name || 'Usuario'}
          </Text>
          <Text className="text-gray-600">
            {user?.email || 'email@example.com'}
          </Text>
        </View>
      </View>
      
      <Text className="text-gray-700 mb-4">
        {user?.bio || 'Descripción del usuario aquí...'}
      </Text>
      
      <View className="flex-row justify-between">
        <View className="items-center">
          <Text className="text-lg font-bold text-gray-800">
            {user?.posts || 0}
          </Text>
          <Text className="text-gray-600">Posts</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-gray-800">
            {user?.followers || 0}
          </Text>
          <Text className="text-gray-600">Seguidores</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-gray-800">
            {user?.following || 0}
          </Text>
          <Text className="text-gray-600">Siguiendo</Text>
        </View>
      </View>
      
      <TouchableOpacity className="bg-indigo-600 rounded-lg p-3 mt-4">
        <Text className="text-white text-center font-semibold">
          Seguir
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;
