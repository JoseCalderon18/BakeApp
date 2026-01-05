import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RecordCard } from '../components/RecordCard';

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

export function RecordsScreen() {
  const navigation = useNavigation();
  const [records, setRecords] = useState<Record[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDateObj, setSelectedDateObj] = useState<Date>(new Date());

  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    if (records.length > 0 || selectedDate) {
      filterRecords();
    }
  }, [records, selectedDate]);

  const loadRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('productRecords');
      if (storedRecords) {
        const parsedRecords = JSON.parse(storedRecords);
        
        // Validar que sea un array
        if (!Array.isArray(parsedRecords)) {
          console.error('Los registros no son un array válido');
          return;
        }
        
        // Filtrar y validar registros que tengan timestamp
        const validRecords = parsedRecords.filter((r: any) => r && r.timestamp);
        
        if (validRecords.length === 0) {
          setRecords([]);
          return;
        }
        
        // Ordenar de mayor a menor (más reciente primero)
        const sortedRecords = validRecords.sort((a: Record, b: Record) => {
          const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return timeB - timeA;
        });
        
        setRecords(sortedRecords as Record[]);
        
        // Obtener fechas únicas
        const dates = [...new Set(sortedRecords.map((r: Record) => r.date).filter((d): d is string => !!d))] as string[];
        setAvailableDates(dates);
        if (dates.length > 0 && !selectedDate) {
          const mostRecentDate = dates[0] as string;
          setSelectedDate(mostRecentDate);
          // Intentar parsear la fecha más reciente para inicializar el DatePicker
          try {
            // Formato: "15 de enero de 2024" -> convertir a Date
            const dateParts = mostRecentDate.split(' de ');
            if (dateParts.length >= 3) {
              const day = parseInt(dateParts[0]);
              const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
              const month = monthNames.indexOf(dateParts[1]);
              const year = parseInt(dateParts[2]);
              if (month !== -1 && !isNaN(day) && !isNaN(year)) {
                setSelectedDateObj(new Date(year, month, day));
              }
            }
          } catch (e) {
            // Si falla, usar la fecha actual
            setSelectedDateObj(new Date());
          }
        }
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error('Error al cargar registros:', error);
      setRecords([]);
    }
  };

  const filterRecords = () => {
    if (!records || records.length === 0) {
      setFilteredRecords([]);
      return;
    }
    
    if (selectedDate) {
      const filtered = records.filter(record => record && record.date === selectedDate);
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      const updatedRecords = records.filter(record => record.id !== id);
      setRecords(updatedRecords);
      
      // Actualizar AsyncStorage
      await AsyncStorage.setItem('productRecords', JSON.stringify(updatedRecords));
      
      // Actualizar fechas disponibles
      const dates = [...new Set(updatedRecords.map((r: Record) => r.date))] as string[];
      setAvailableDates(dates);
      
      // Si la fecha seleccionada ya no tiene registros, limpiar el filtro
      if (selectedDate && !dates.includes(selectedDate)) {
        setSelectedDate('');
      }
    } catch (error) {
      console.error('Error al eliminar registro:', error);
      Alert.alert('Error', 'No se pudo eliminar el registro. Por favor, intenta de nuevo.');
    }
  };

  const formatDateForFilter = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Funciones para el calendario
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Días del mes anterior para completar la primera semana
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false
      });
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        month,
        year,
        isCurrentMonth: true
      });
    }
    
    // Días del mes siguiente para completar la última semana
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const handleDaySelect = (day: number, month: number, year: number) => {
    const selectedDate = new Date(year, month, day);
    setSelectedDateObj(selectedDate);
    const formattedDate = formatDateForFilter(selectedDate);
    setSelectedDate(formattedDate);
    setDatePickerOpen(false);
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setCalendarMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];


  const renderRecord = ({ item }: { item: Record }) => (
    <RecordCard record={item} onDelete={handleDeleteRecord} />
  );

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
                Registros
              </Text>
              <Text className="text-gray-400 text-base">
                Historial de producciones
              </Text>
            </View>
          </View>
        </View>

        {/* Selector de fecha con calendario */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-400 text-sm">Filtrar por día</Text>
            {selectedDate && (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDate('');
                  setFilteredRecords(records);
                }}
                className="bg-white/10 px-3 py-1 rounded-full"
              >
                <Text className="text-white text-xs">Ver todos</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setDatePickerOpen(true)}
            className="bg-white/10 flex-row items-center justify-between p-4 rounded-xl"
          >
            <View className="flex-row items-center">
              <Icon name="calendar-today" size={24} color="#4FC3F7" />
              <Text className="text-white text-base font-semibold ml-3">
                {selectedDate || 'Seleccionar fecha'}
              </Text>
            </View>
            <Icon name="arrow-forward-ios" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Calendario Modal */}
        <Modal
          visible={datePickerOpen}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setDatePickerOpen(false)}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-dark-bg rounded-t-3xl p-6 pb-8">
              {/* Header del calendario */}
              <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity
                  onPress={() => changeMonth('prev')}
                  className="bg-white/10 p-2 rounded-xl"
                >
                  <Icon name="chevron-left" size={24} color="#fff" />
                </TouchableOpacity>
                
                <Text className="text-white text-xl font-bold">
                  {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                </Text>
                
                <TouchableOpacity
                  onPress={() => changeMonth('next')}
                  className="bg-white/10 p-2 rounded-xl"
                >
                  <Icon name="chevron-right" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Días de la semana */}
              <View className="flex-row mb-3">
                {dayNames.map((day) => (
                  <View key={day} className="flex-1 items-center">
                    <Text className="text-gray-400 text-xs font-semibold">{day}</Text>
                  </View>
                ))}
              </View>

              {/* Días del calendario */}
              <View className="flex-row flex-wrap">
                {getDaysInMonth(calendarMonth).map((dayInfo, index) => {
                  const isSelected = selectedDateObj &&
                    dayInfo.day === selectedDateObj.getDate() &&
                    dayInfo.month === selectedDateObj.getMonth() &&
                    dayInfo.year === selectedDateObj.getFullYear();
                  
                  const isToday = dayInfo.isCurrentMonth &&
                    dayInfo.day === new Date().getDate() &&
                    dayInfo.month === new Date().getMonth() &&
                    dayInfo.year === new Date().getFullYear();

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (dayInfo.isCurrentMonth) {
                          handleDaySelect(dayInfo.day, dayInfo.month, dayInfo.year);
                        }
                      }}
                      className={`w-[14.28%] aspect-square items-center justify-center mb-2 ${
                        !dayInfo.isCurrentMonth ? 'opacity-30' : ''
                      }`}
                    >
                      <View
                        className={`w-10 h-10 rounded-full items-center justify-center ${
                          isSelected
                            ? 'bg-[#4FC3F7]'
                            : isToday
                            ? 'bg-white/20 border-2 border-[#4FC3F7]'
                            : 'bg-transparent'
                        }`}
                      >
                        <Text
                          className={`text-sm font-semibold ${
                            isSelected
                              ? 'text-black'
                              : isToday
                              ? 'text-[#4FC3F7]'
                              : 'text-white'
                          }`}
                        >
                          {dayInfo.day}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Botones */}
              <View className="flex-row gap-3 mt-6">
                <TouchableOpacity
                  onPress={() => setDatePickerOpen(false)}
                  className="flex-1 bg-white/10 py-4 rounded-xl items-center"
                >
                  <Text className="text-white font-semibold">Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const today = new Date();
                    setSelectedDateObj(today);
                    const formattedDate = formatDateForFilter(today);
                    setSelectedDate(formattedDate);
                    setDatePickerOpen(false);
                  }}
                  className="flex-1 bg-[#4FC3F7] py-4 rounded-xl items-center"
                >
                  <Text className="text-black font-semibold">Hoy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Lista de registros */}
        {filteredRecords.length > 0 ? (
          <FlatList
            data={filteredRecords}
            renderItem={renderRecord}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListHeaderComponent={
              <Text className="text-white text-lg font-semibold mb-4">
                {selectedDate ? `Registros del ${selectedDate}` : 'Todos los registros'} ({filteredRecords.length})
              </Text>
            }
          />
        ) : (
          <View className="items-center py-12">
            <Icon name="inbox" size={64} color="#666" />
            <Text className="text-gray-500 text-lg mt-4 text-center">
              No hay registros guardados
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

