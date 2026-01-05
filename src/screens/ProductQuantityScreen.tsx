import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export function ProductQuantityScreen() {
  const navigation = useNavigation();
  const route = useRoute() as any;
  const product = route.params?.product;
  const boxSize = route.params?.boxSize || 15; // Tamaño de caja por defecto
  const category = route.params?.category || 'Pintado';
  
  const [quantity, setQuantity] = useState('');
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleContinue = () => {
    if (quantity.trim() && parseInt(quantity) > 0) {
      const numQuantity = parseInt(quantity);
      const boxesNeeded = Math.ceil(numQuantity / boxSize);
      const remainder = (boxesNeeded * boxSize) - numQuantity;
      
      (navigation as any).navigate('Summary', {
        product,
        quantity: numQuantity,
        boxSize,
        boxesNeeded,
        remainder,
        category: category || 'Pintado'
      });
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
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-500 text-sm flex-1">
              {currentDate}
            </Text>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              className="bg-white/10 p-3 rounded-xl"
            >
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="text-white text-4xl font-semibold mb-2">
                Cantidad
              </Text>
              <Text className="text-gray-400 text-base">
                ¿Cuántos {product?.name} vas a realizar?
              </Text>
            </View>
          </View>
        </View>

        {/* Imagen del producto */}
        {product?.image && (
          <View className="items-center mb-6">
            <View className="bg-white/10 rounded-2xl p-6">
              <Image
                source={product.image}
                className="w-48 h-48"
                resizeMode="contain"
              />
            </View>
          </View>
        )}

        {/* Input de cantidad */}
        <View className="mb-6">
          <Text className="text-white text-lg font-medium mb-3">
            Cantidad a producir
          </Text>
          <TextInput
            className="bg-white/10 text-white text-4xl font-semibold p-6 rounded-2xl border-2 border-white/20 text-center"
            placeholder="0"
            placeholderTextColor="#888"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={{ color: '#fff' }}
          />
        </View>

        {/* Información de la caja */}
        <View className="bg-white/5 rounded-2xl p-4 mb-6">
          <Text className="text-gray-400 text-sm mb-1">Tamaño de caja seleccionada</Text>
          <Text className="text-white text-2xl font-bold">{boxSize} unidades</Text>
        </View>

        {/* Botón de continuar */}
        <TouchableOpacity 
          className={`p-5 rounded-xl items-center ${
            quantity.trim() && parseInt(quantity) > 0 ? 'bg-[#4FC3F7]' : 'bg-gray-800'
          }`}
          disabled={!quantity.trim() || parseInt(quantity) <= 0}
          onPress={handleContinue}
        >
          <Text className={`font-bold text-xl ${
            quantity.trim() && parseInt(quantity) > 0 ? 'text-black' : 'text-gray-500'
          }`}>
            VER RESUMEN
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

