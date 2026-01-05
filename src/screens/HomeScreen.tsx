import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons'; 


type RootStackParamList = {
  Home: undefined;
  BoxSelection: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation();
  
  const handleCalculatePress = () => {
    console.log('Botón Calcular presionado');
    (navigation as any).navigate('BoxSelection');
  };
  return (
    <View className="flex-1 bg-dark-bg"> 
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center p-6">
          
          {/* Logo más pequeño y minimalista */}
          <View className="mb-6">
            <Image
              source={require('../../assets/dona.png')} 
              className="w-96 h-96" 
              resizeMode="contain"
            />
          </View>

          {/* Título minimalista */}
          <Text className="text-white text-5xl font-semibold mb-3 text-center">
            BakeApp
          </Text>
          
          {/* Subtítulo discreto */}
          <Text className="text-gray-400 text-base text-center mb-12">
            Gestiona tu repostería con facilidad
          </Text>

          {/* Botones pequeños y elegantes */}
          <View className="w-full max-w-xs">
            {/* Botón Calcular */}
            <TouchableOpacity 
              className="flex-row items-center justify-center py-5 px-7 rounded-xl mb-6"
              style={{ backgroundColor: '#4FC3F7' }}
              onPress={handleCalculatePress}
              activeOpacity={0.8}
            >
              <MaterialIcons name="calculate" size={26} color="#000" />
              <Text className="text-black text-lg font-medium ml-3">
                Calcular
              </Text>
            </TouchableOpacity>

            {/* Botón Ver Registros */}
            <TouchableOpacity 
              className="flex-row items-center justify-center py-5 px-7 rounded-xl"
              style={{ backgroundColor: '#66BB6A' }}
              onPress={() => (navigation as any).navigate('Records')}
            >
              <MaterialIcons name="history" size={26} color="#000" />
              <Text className="text-black text-lg font-medium ml-3">
                Ver Registros
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}