import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const TailwindTest = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
          🎯 NativeWind Test
        </Text>
        
        {/* Test Colors */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-700">Colores:</Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="w-16 h-16 bg-red-500 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Red</Text>
            </View>
            <View className="w-16 h-16 bg-blue-500 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Blue</Text>
            </View>
            <View className="w-16 h-16 bg-green-500 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Green</Text>
            </View>
            <View className="w-16 h-16 bg-yellow-500 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Yellow</Text>
            </View>
            <View className="w-16 h-16 bg-purple-500 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Purple</Text>
            </View>
          </View>
        </View>

        {/* Test Spacing */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-700">Espaciado:</Text>
          <View className="bg-white rounded-lg p-4 shadow-lg">
            <Text className="p-2 bg-gray-200 rounded mb-2">Padding p-2</Text>
            <Text className="p-4 bg-gray-200 rounded mb-2">Padding p-4</Text>
            <Text className="p-6 bg-gray-200 rounded">Padding p-6</Text>
          </View>
        </View>

        {/* Test Flexbox */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-700">Flexbox:</Text>
          <View className="bg-white rounded-lg p-4 shadow-lg">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="bg-indigo-500 text-white px-3 py-2 rounded">Left</Text>
              <Text className="bg-indigo-500 text-white px-3 py-2 rounded">Center</Text>
              <Text className="bg-indigo-500 text-white px-3 py-2 rounded">Right</Text>
            </View>
            <View className="flex-row justify-center">
              <Text className="bg-green-500 text-white px-4 py-2 rounded">Centered</Text>
            </View>
          </View>
        </View>

        {/* Test Typography */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-700">Tipografía:</Text>
          <View className="bg-white rounded-lg p-4 shadow-lg">
            <Text className="text-xs text-gray-600 mb-2">Texto extra pequeño (text-xs)</Text>
            <Text className="text-sm text-gray-600 mb-2">Texto pequeño (text-sm)</Text>
            <Text className="text-base text-gray-600 mb-2">Texto base (text-base)</Text>
            <Text className="text-lg text-gray-600 mb-2">Texto grande (text-lg)</Text>
            <Text className="text-xl text-gray-600 mb-2">Texto extra grande (text-xl)</Text>
            <Text className="text-2xl font-bold text-gray-800">Texto 2xl bold</Text>
          </View>
        </View>

        {/* Test Buttons */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-700">Botones:</Text>
          <View className="space-y-3">
            <TouchableOpacity className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg">
              <Text className="text-white text-center font-semibold">Botón Azul</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-green-500 hover:bg-green-600 p-3 rounded-lg">
              <Text className="text-white text-center font-semibold">Botón Verde</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-500 hover:bg-red-600 p-3 rounded-lg">
              <Text className="text-white text-center font-semibold">Botón Rojo</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-300 p-3 rounded-lg">
              <Text className="text-gray-700 text-center font-semibold">Botón Outline</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Test Borders and Shadows */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-700">Bordes y Sombras:</Text>
          <View className="space-y-3">
            <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <Text className="text-gray-600">Sombra pequeña (shadow-sm)</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <Text className="text-gray-600">Sombra mediana (shadow-md)</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <Text className="text-gray-600">Sombra grande (shadow-lg)</Text>
            </View>
          </View>
        </View>

        {/* Status Message */}
        <View className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6">
          <Text className="text-green-800 font-semibold text-center">
            ✅ ¡NativeWind está funcionando correctamente!
          </Text>
          <Text className="text-green-700 text-center mt-2">
            Todas las clases de Tailwind CSS están disponibles
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TailwindTest;
