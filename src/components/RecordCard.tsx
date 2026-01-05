import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Record {
  id: string;
  productName: string;
  productId: string;
  category?: string;
  quantity: number;
  boxSize: number;
  boxesNeeded: number;
  remainder: number;
  date: string;
  time: string;
  timestamp: string;
}

interface RecordCardProps {
  record: Record;
  onDelete: (id: string) => void;
}

export const RecordCard = ({ record, onDelete }: RecordCardProps) => {
  const handleDelete = () => {
    Alert.alert(
      'Eliminar Registro',
      `¿Estás seguro de eliminar el registro de "${record.productName}"?\n\nEsta acción no se puede deshacer.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          onPress: () => onDelete(record.id),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View className="bg-white/5 rounded-2xl p-4 mb-3">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1 mr-3">
          <Text className="text-white text-lg font-bold">{record.productName}</Text>
          {record.category && (
            <Text className="text-gray-400 text-xs mt-1">{record.category}</Text>
          )}
        </View>
        <View className="flex-row items-center gap-2">
          <View className="bg-white/10 px-3 py-1.5 rounded-full">
            <Text className="text-gray-400 text-xs">{record.time}</Text>
          </View>
          <TouchableOpacity
            onPress={handleDelete}
            className="bg-[#EF5350] p-2 rounded-xl"
            activeOpacity={0.8}
          >
            <MaterialIcons name="delete" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Información ocupando todo el ancho */}
      <View className="flex-row items-center justify-between w-full">
        {/* Bollos totales - resaltado con color */}
        <View className="bg-[#66BB6A]/20 rounded-xl px-4 py-3 border-2 border-[#66BB6A] flex-1 mr-2">
          <Text className="text-[#66BB6A] text-xs mb-1">Bollos totales</Text>
          <Text className="text-[#66BB6A] text-xl font-bold">{record.quantity}</Text>
        </View>
        
        {/* Cajas totales - resaltado con color naranja */}
        <View className="bg-[#FFA726]/20 rounded-xl px-4 py-3 border-2 border-[#FFA726] flex-1 mx-1">
          <Text className="text-[#FFA726] text-xs mb-1">Num Cajas</Text>
          <Text className="text-[#FFA726] text-xl font-bold">{record.boxesNeeded}</Text>
        </View>
        
        <View className="bg-white/5 rounded-xl px-4 py-3 flex-1 ml-2">
          <Text className="text-gray-400 text-xs mb-1">Tamaño Caja</Text>
          <Text className="text-white text-xl font-bold">{record.boxSize}</Text>
        </View>
      </View>
    </View>
  );
};

