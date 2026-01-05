import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BoxOption } from '../components/BoxOption';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function BoxSelectionScreen() {
  const navigation = useNavigation();
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'column' | 'grid'>('column');
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const boxes = [
    { id: '1', label: 'Caja 15', size: '15 unidades', icon: 'inventory-2', color: '#4FC3F7' }, // Azul brillante
    { id: '2', label: 'Caja 20', size: '20 unidades', icon: 'inventory-2', color: '#66BB6A' }, // Verde esmeralda
    { id: '3', label: 'Caja 50', size: '50 unidades', icon: 'inventory-2', color: '#FF6B9D' }, // Rosa fucsia
    { id: '4', label: 'Personalizada', size: 'Tamaño a medida', icon: 'tune', color: '#FFA726' }, // Naranja vibrante
  ];

  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 32 }}>
        {/* Imagen de caja arriba */}
        <View className="items-center mb-6">
          <Image
            source={require('../../assets/caja.png')}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>

        {/* Header con botón de vista */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-500 text-sm flex-1">
              {currentDate}
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setViewMode(viewMode === 'column' ? 'grid' : 'column')}
                className="bg-white/10 p-3 rounded-xl mr-3"
              >
                <Icon 
                  name={viewMode === 'column' ? 'grid-view' : 'view-list'} 
                  size={24} 
                  color="#fff" 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                className="bg-white/10 p-3 rounded-xl"
              >
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="text-white text-4xl font-semibold mb-2">Selecciona la caja</Text>
              <Text className="text-gray-400 text-base">Elige el tamaño de empaque</Text>
            </View>
          </View>
        </View>

        {/* Contenedor de opciones */}
        <View 
          className={viewMode === 'grid' ? 'flex-row flex-wrap justify-between' : 'flex-col'}
        >
          {boxes.map((item) => (
            <View
              key={item.id}
              className={viewMode === 'grid' ? 'w-[48%] mb-6' : 'w-full mb-8'}
            >
              <BoxOption
                label={item.label}
                size={item.size}
                icon={item.icon}
                color={item.color}
                isSelected={selectedBoxId === item.id}
                onPress={() => setSelectedBoxId(item.id)}
                viewMode={viewMode}
              />
            </View>
          ))}
        </View>

        {/* Botón de Confirmar */}
        <TouchableOpacity 
          className={`mt-10 p-5 rounded-xl items-center ${
            selectedBoxId ? 'bg-glaceado' : 'bg-gray-800'
          }`}
          disabled={!selectedBoxId}
          onPress={() => {
            if (selectedBoxId) {
              // Si es personalizada, ir a la pantalla de tamaño personalizado
              if (selectedBoxId === '4') {
                (navigation as any).navigate('CustomBox');
              } else {
                const selectedBox = boxes.find(b => b.id === selectedBoxId);
                const boxSize = selectedBox?.id === '1' ? 15 : selectedBox?.id === '2' ? 20 : selectedBox?.id === '3' ? 50 : 15;
                (navigation as any).navigate('Category', { boxSize });
              }
            }
          }}
        >
          <Text className={`font-bold text-xl ${
            selectedBoxId ? 'text-black' : 'text-gray-500'
          }`}>
            SIGUIENTE
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}