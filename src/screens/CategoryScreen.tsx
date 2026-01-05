import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { CategoryCard } from '../components/CategoryCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function CategoriesScreen() {
  const navigation = useNavigation();
  const route = useRoute() as any;
  const boxSize = route.params?.boxSize || 15;
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Categorías reordenadas: Pintado, Fosteados, Inyectados, Horneados, Glaceados
  const categories = [
    { 
      name: 'Fosteados', 
      iconImage: require('../../assets/icon/fosteado.png'), 
      color: '#FFE6AA' // Amarillo crema
    },
    { 
      name: 'Inyectados', 
      iconImage: require('../../assets/icon/inyectado.png'), 
      color: '#FF6B9D' // Rosa fucsia
    },
    { 
      name: 'Horneados', 
      iconImage: require('../../assets/icon/hornado.png'), 
      color: '#FFA726' // Naranja vibrante
    },
    { 
        name: 'Pintado', 
        iconImage: require('../../assets/icon/pintado.png'),
        color: '#66BB6A' // Verde esmeralda
    },
    { 
      name: 'Glaceados', 
      iconImage: require('../../assets/icon/glaceado.png'), 
      color: '#4FC3F7' // Azul brillante
    },
  ];

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
                Tipo de Producto
              </Text>
              <Text className="text-gray-400 text-base">
                Selecciona una categoría
              </Text>
            </View>
          </View>
        </View>

        {/* Lista de Categorías */}
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            title={category.name}
            iconImage={category.iconImage}
            bgColor={category.color}
            onPress={() => (navigation as any).navigate('Product', { boxSize, category: category.name })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}