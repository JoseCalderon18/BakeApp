import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function SummaryScreen() {
  const navigation = useNavigation();
  const route = useRoute() as any;
  const { product, quantity, boxSize, boxesNeeded, remainder, category } = route.params;

  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const currentTime = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleSave = async () => {
    try {
      const record = {
        id: Date.now().toString(),
        productName: product.name,
        productId: product.id,
        category: category || 'Pintado',
        quantity,
        boxSize,
        boxesNeeded,
        remainder,
        date: currentDate,
        time: currentTime,
        timestamp: new Date().toISOString()
      };

      // Obtener registros existentes
      const existingRecords = await AsyncStorage.getItem('productRecords');
      const records = existingRecords ? JSON.parse(existingRecords) : [];
      
      // Agregar nuevo registro
      records.push(record);
      
      // Guardar
      await AsyncStorage.setItem('productRecords', JSON.stringify(records));
      
      // Navegar a home
      (navigation as any).navigate('Home');
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleConfirmSave = () => {
    Alert.alert(
      'Confirmar Registro',
      `¿Estás seguro de registrar esta producción?\n\n${product.name}\n${quantity} unidades\n${boxesNeeded} cajas de ${boxSize}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Registrar',
          onPress: handleSave,
          style: 'default'
        }
      ]
    );
  };

  const handleNewConsultation = () => {
    (navigation as any).navigate('BoxSelection');
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
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="text-white text-4xl font-semibold mb-2">
                Resumen
              </Text>
              <Text className="text-gray-400 text-base">
                Revisa los detalles de tu producción
              </Text>
            </View>
          </View>
        </View>

        {/* Imagen del producto */}
        <View className="items-center mb-6">
          <View className="bg-white/10 rounded-2xl p-6">
            <Image
              source={product.image}
              className="w-56 h-56"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Información del resumen */}
        <View className="mb-6">
          <View className="bg-white/5 rounded-2xl p-5 mb-4">
            <Text className="text-gray-400 text-sm mb-2">Producto</Text>
            <Text className="text-white text-2xl font-bold">{product.name}</Text>
          </View>

          <View className="bg-white/5 rounded-2xl p-5 mb-4">
            <Text className="text-gray-400 text-sm mb-2">Cantidad a producir</Text>
            <Text className="text-white text-3xl font-bold">{quantity} unidades</Text>
          </View>

          <View className="bg-white/5 rounded-2xl p-5 mb-4">
            <Text className="text-gray-400 text-sm mb-2">Tamaño de caja</Text>
            <Text className="text-white text-2xl font-bold">{boxSize} unidades</Text>
          </View>

          <View className="bg-[#4FC3F7]/20 rounded-2xl p-5 mb-4 border-2 border-[#4FC3F7]">
            <Text className="text-gray-400 text-sm mb-2">Total de cajas necesarias</Text>
            <Text className="text-[#4FC3F7] text-3xl font-bold">{boxesNeeded} cajas</Text>
          </View>

          {remainder > 0 && (
            <View className="bg-[#FFA726]/20 rounded-2xl p-5 border-2 border-[#FFA726]">
              <Text className="text-gray-400 text-sm mb-2">Unidades que sobrarán</Text>
              <Text className="text-[#FFA726] text-3xl font-bold">{remainder} unidades</Text>
            </View>
          )}
        </View>

        {/* Botones */}
        <View className="mt-6">
          <TouchableOpacity 
            className="bg-[#66BB6A] p-5 rounded-xl items-center mb-4"
            onPress={handleConfirmSave}
          >
            <Text className="text-black font-bold text-xl">
              REGISTRAR PRODUCCIÓN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-[#EF5350] p-5 rounded-xl items-center"
            onPress={handleNewConsultation}
          >
            <Text className="text-white font-bold text-xl">
              NUEVA CONSULTA
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

