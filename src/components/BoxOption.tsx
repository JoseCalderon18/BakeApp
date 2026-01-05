import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BoxOptionProps {
  label: string;
  size: string;
  icon: string;
  color: string;
  isSelected: boolean;
  onPress: () => void;
  viewMode?: 'column' | 'grid';
}

export const BoxOption = ({ label, size, icon, color, isSelected, onPress, viewMode = 'grid' }: BoxOptionProps) => {
  const isColumnMode = viewMode === 'column';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-2xl border-2 ${
        isSelected ? 'border-white' : 'border-transparent'
      } ${isColumnMode ? 'p-4' : 'p-6'}`}
      style={{ 
        backgroundColor: color,
        shadowColor: isSelected ? '#fff' : 'transparent',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isSelected ? 0.3 : 0,
        shadowRadius: 8,
        elevation: isSelected ? 8 : 2,
      }}
    >
      {isColumnMode ? (
        // Vista horizontal (columna) - icono al lado del texto
        <View className="flex-row items-center">
          <View className="bg-black/10 p-3 rounded-xl mr-4">
            <Icon name={icon} size={26} color="#000" />
          </View>
          <View className="flex-1">
            <Text className="text-black text-lg font-bold">
              {label}
            </Text>
            <Text className="text-black/70 text-sm">
              {size}
            </Text>
          </View>
          {isSelected ? (
            <Icon name="check-circle" size={26} color="#000" />
          ) : (
            <Icon name="radio-button-unchecked" size={26} color="#000" />
          )}
        </View>
      ) : (
        // Vista vertical (grid) - icono arriba
        <View className="items-center">
          <View className="bg-black/10 p-5 rounded-2xl mb-4">
            <Icon name={icon} size={40} color="#000" />
          </View>
          <Text className="text-black text-xl font-bold mb-2 text-center">
            {label}
          </Text>
          <Text className="text-black/70 text-base text-center">
            {size}
          </Text>
          <View className="mt-4">
            {isSelected ? (
              <View className="bg-black/20 px-5 py-2 rounded-full">
                <Icon name="check-circle" size={24} color="#000" />
              </View>
            ) : (
              <View className="bg-black/10 px-5 py-2 rounded-full">
                <Icon name="radio-button-unchecked" size={24} color="#000" />
              </View>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};