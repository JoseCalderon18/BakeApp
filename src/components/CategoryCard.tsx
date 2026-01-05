import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CategoryCardProps {
  title: string;
  iconImage: any;
  bgColor: string;
  onPress: () => void;
}

export const CategoryCard = ({ title, iconImage, bgColor, onPress }: CategoryCardProps) => {
  return (
    <TouchableOpacity
      className="flex-row items-center p-3 rounded-2xl mb-6 shadow-lg w-full"
      style={{ 
        backgroundColor: bgColor,
        shadowColor: bgColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="bg-black/10 p-3 rounded-xl mr-3">
        <Image
          source={iconImage}
          className="w-24 h-24"
          resizeMode="contain"
        />
      </View>
      <Text className="text-black text-lg font-bold flex-1">{title}</Text>
      <MaterialIcons name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );
};