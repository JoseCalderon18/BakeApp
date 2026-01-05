import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Lista de todas las imágenes de productos
const products = [
  { id: '1', name: 'Croissant Choco Blanco', image: require('../../assets/producto/croissant_choco_blanco.png') },
  { id: '2', name: 'Croissant Chocolate', image: require('../../assets/producto/croissant_chocolate.png') },
  { id: '3', name: 'Croissant', image: require('../../assets/producto/croissant.png') },
  { id: '4', name: 'Dunkin Banoffee', image: require('../../assets/producto/dunkin_banoffee.png') },
  { id: '5', name: 'Dunkin Bavarian Cream', image: require('../../assets/producto/dunkin_bavarian_cream_veganos.png') },
  { id: '6', name: 'Dunkin Black White', image: require('../../assets/producto/dunkin_black_white.png') },
  { id: '7', name: 'Dunkin Boston Choco', image: require('../../assets/producto/dunkin_boston_choco_veganos.png') },
  { id: '8', name: 'Dunkin Boston Cream', image: require('../../assets/producto/dunkin_boston_cream_veganos.png') },
  { id: '9', name: 'Dunkin Caramelo Salado', image: require('../../assets/producto/dunkin_caramelo_salado.png') },
  { id: '10', name: 'Dunkin Clásico', image: require('../../assets/producto/dunkin_clasico.png') },
  { id: '11', name: 'Dunkin Lotus', image: require('../../assets/producto/dunkin_lotus.png') },
  { id: '12', name: 'Dunkin Manzana Canela', image: require('../../assets/producto/dunkin_manzana_canela_veganos.png') },
  { id: '13', name: 'Dunkin Nocilla', image: require('../../assets/producto/dunkin_nocilla.png') },
  { id: '14', name: 'Dunkin Pistacho', image: require('../../assets/producto/dunkin_pistacho.png') },
  { id: '15', name: 'Dunkin Tarta Queso', image: require('../../assets/producto/dunkin_tarta_queso.png') },
  { id: '16', name: 'Dunkin Tortitas', image: require('../../assets/producto/dunkin_tortitas.png') },
  { id: '17', name: 'Dunkin Bombon Choco', image: require('../../assets/producto/dunkin-Bombon-Choco.png') },
  { id: '18', name: 'Dunkin Boston Fresa', image: require('../../assets/producto/dunkin-boston-fresa.png') },
  { id: '19', name: 'Dunkin Boston Mix', image: require('../../assets/producto/dunkin-Boston-Mix.png') },
  { id: '20', name: 'Dunkin Cake Bombon', image: require('../../assets/producto/dunkin-Cake-Bombon.png') },
  { id: '21', name: 'Dunkin Choco Topping', image: require('../../assets/producto/dunkin-Choco_topping.png') },
  { id: '22', name: 'Dunkin Choco Blanco', image: require('../../assets/producto/dunkin-Choco-Blanco.png') },
  { id: '23', name: 'Dunkin Coco', image: require('../../assets/producto/dunkin-coco.png') },
  { id: '24', name: 'Dunkin Dulce de Leche', image: require('../../assets/producto/dunkin-Dulce-de-Leche.png') },
  { id: '25', name: 'Dunkin Frambuesa', image: require('../../assets/producto/dunkin-Frambuesa.png') },
  { id: '26', name: 'Dunkin Fresa Topping', image: require('../../assets/producto/dunkin-Fresa_topping.png') },
  { id: '27', name: 'Dunkin Kit Kat', image: require('../../assets/producto/dunkin-Kit-Kat.png') },
  { id: '28', name: 'Dunkin Nutella', image: require('../../assets/producto/dunkin-Nutella.png') },
  { id: '29', name: 'Dunkin Oreo', image: require('../../assets/producto/dunkin-Oreo.png') },
  { id: '30', name: 'Muffin Choco', image: require('../../assets/producto/muffin_choco.png') },
  { id: '31', name: 'Rollo Canela', image: require('../../assets/producto/rollo_canela.png') },
  { id: '32', name: 'Tulipa Carrot Cake', image: require('../../assets/producto/tulipa_carrot_cake_600x484px.png') },
];

export function ProductScreen() {
  const navigation = useNavigation();
  const route = useRoute() as any;
  const boxSize = route.params?.boxSize || 15;
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity
      className="w-[48%] mb-6 rounded-2xl p-5 items-center"
      style={{ 
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      }}
      onPress={() => {
        (navigation as any).navigate('ProductQuantity', {
          product: item,
          boxSize: route.params?.boxSize || 15,
          category: route.params?.category || 'Personalizar'
        });
      }}
      activeOpacity={0.8}
    >
      <View className="bg-gray-50 rounded-xl p-4 mb-4 w-full items-center">
        <Image
          source={item.image}
          className="w-36 h-36"
          resizeMode="contain"
        />
      </View>
      <Text className="text-black text-base font-bold text-center" numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      {/* Header */}
      <View className="px-6 pt-6 pb-6">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-gray-500 text-sm">
            {currentDate}
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            className="p-2 bg-white/10 rounded-xl"
          >
            <Icon name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center">
          <View className="flex-1">
            <Text className="text-white text-4xl font-semibold mb-2">
              Productos
            </Text>
            <Text className="text-gray-400 text-base">
              Selecciona un producto
            </Text>
          </View>
        </View>
      </View>

      {/* Grid de productos */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 24 }}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

