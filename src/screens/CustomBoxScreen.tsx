import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function CustomBoxScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [customSize, setCustomSize] = useState('');
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleContinue = () => {
    if (customSize.trim()) {
      const boxSize = parseInt(customSize);
      // Aquí puedes pasar el tamaño personalizado a la siguiente pantalla
      (navigation as any).navigate('Category', { boxSize });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ padding: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-gray-500 text-sm">
              {currentDate}
            </Text>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              className="p-2"
            >
              <Icon name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="text-white text-4xl font-semibold mb-2">
                Tamaño Personalizado
              </Text>
              <Text className="text-gray-400 text-base">
                Ingresa el tamaño de la caja
              </Text>
            </View>
          </View>
        </View>

        {/* Input de tamaño */}
        <View className="mb-6">
          <Text className="text-white text-lg font-medium mb-3">
            ¿Cuántas unidades?
          </Text>
          <TextInput
            className="bg-white/10 text-white text-2xl font-semibold p-5 rounded-2xl border-2 border-white/20"
            placeholder="Ej: 25, 30, 100..."
            placeholderTextColor="#888"
            value={customSize}
            onChangeText={setCustomSize}
            keyboardType="numeric"
            style={{ color: '#fff' }}
          />
        </View>

        {/* Botón de continuar */}
        <TouchableOpacity 
          className={`p-5 rounded-xl items-center ${
            customSize.trim() ? 'bg-[#FFA726]' : 'bg-gray-800'
          }`}
          disabled={!customSize.trim()}
          onPress={handleContinue}
        >
          <Text className={`font-bold text-xl ${
            customSize.trim() ? 'text-black' : 'text-gray-500'
          }`}>
            CONTINUAR
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

