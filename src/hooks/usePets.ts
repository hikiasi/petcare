'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

interface Pet {
  id: string;
  user_id: string;
  name: string;
  species: string;
  breed?: string;
  birth_date?: string;
  photo_url?: string;
  weight?: number;
  color?: string;
  gender?: 'male' | 'female' | 'unknown';
  is_sterilized?: boolean;
  microchip_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface AddPetData {
  name: string;
  species: string;
  breed?: string;
  birth_date?: string;
  gender?: 'male' | 'female' | 'unknown';
  weight?: number;
  color?: string;
  microchip_number?: string;
  notes?: string;
}

export function usePets() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка питомцев
  const fetchPets = async () => {
    if (!user) {
      setPets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPets(data || []);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Ошибка при загрузке питомцев');
    } finally {
      setLoading(false);
    }
  };

  // Добавление питомца
  const addPet = async (petData: AddPetData, photoFile?: File) => {
    if (!user) throw new Error('Пользователь не авторизован');

    try {
      setLoading(true);
      let photo_url: string | undefined;

      // Загрузка фото если есть
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('pet-photos')
          .upload(fileName, photoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('pet-photos')
          .getPublicUrl(fileName);

        photo_url = publicUrl;
      }

      // Создание записи питомца
      const { data, error } = await (supabase as any)
        .from('pets')
        .insert({
          ...petData,
          user_id: user.id,
          photo_url,
        })
        .select()
        .single();

      if (error) throw error;

      setPets(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error adding pet:', err);
      throw new Error('Ошибка при добавлении питомца');
    } finally {
      setLoading(false);
    }
  };

  // Обновление питомца
  const updatePet = async (petId: string, updates: Partial<AddPetData>, photoFile?: File) => {
    if (!user) throw new Error('Пользователь не авторизован');

    try {
      setLoading(true);
      let photo_url: string | undefined;

      // Загрузка нового фото если есть
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('pet-photos')
          .upload(fileName, photoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('pet-photos')
          .getPublicUrl(fileName);

        photo_url = publicUrl;
      }

      const updateData = photo_url ? { ...updates, photo_url } : updates;

      const { data, error } = await (supabase as any)
        .from('pets')
        .update(updateData)
        .eq('id', petId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setPets(prev => prev.map(pet => pet.id === petId ? data : pet));
      return data;
    } catch (err) {
      console.error('Error updating pet:', err);
      throw new Error('Ошибка при обновлении питомца');
    } finally {
      setLoading(false);
    }
  };

  // Удаление питомца
  const deletePet = async (petId: string) => {
    if (!user) throw new Error('Пользователь не авторизован');

    try {
      setLoading(true);

      const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', petId)
        .eq('user_id', user.id);

      if (error) throw error;

      setPets(prev => prev.filter(pet => pet.id !== petId));
    } catch (err) {
      console.error('Error deleting pet:', err);
      throw new Error('Ошибка при удалении питомца');
    } finally {
      setLoading(false);
    }
  };

  // Получение питомца по ID
  const getPetById = (petId: string) => {
    return pets.find(pet => pet.id === petId);
  };

  useEffect(() => {
    fetchPets();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    pets,
    loading,
    error,
    addPet,
    updatePet,
    deletePet,
    getPetById,
    refetch: fetchPets,
  };
}