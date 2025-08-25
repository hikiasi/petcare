'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, X } from 'lucide-react';
import { usePets } from '@/hooks/usePets';

interface AddPetFormProps {
  onClose: () => void;
}

interface PetFormData {
  name: string;
  species: string;
  breed: string;
  birth_date: string;
  gender: 'male' | 'female' | 'unknown';
  weight: string;
  color: string;
  microchip_number: string;
  notes: string;
  photo_file?: File;
}

export function AddPetForm({ onClose }: AddPetFormProps) {
  const { addPet, loading } = usePets();
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    species: '',
    breed: '',
    birth_date: '',
    gender: 'unknown',
    weight: '',
    color: '',
    microchip_number: '',
    notes: '',
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const speciesOptions = [
    'Собака',
    'Кот',
    'Кошка',
    'Попугай',
    'Хомяк',
    'Кролик',
    'Рыбка',
    'Черепаха',
    'Игуана',
    'Змея',
    'Другое'
  ];

  const handleInputChange = (field: keyof PetFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, photo_file: 'Размер файла не должен превышать 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, photo_file: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo_file: undefined }));
    setPhotoPreview(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя питомца обязательно';
    }

    if (!formData.species) {
      newErrors.species = 'Выберите вид животного';
    }

    if (formData.weight && (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0)) {
      newErrors.weight = 'Введите корректный вес';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const petData = {
        name: formData.name.trim(),
        species: formData.species,
        breed: formData.breed.trim() || undefined,
        birth_date: formData.birth_date || undefined,
        gender: formData.gender,
        weight: formData.weight ? Number(formData.weight) : undefined,
        color: formData.color.trim() || undefined,
        microchip_number: formData.microchip_number.trim() || undefined,
        notes: formData.notes.trim() || undefined,
      };

      await addPet(petData, formData.photo_file);
      onClose();
    } catch (error) {
      console.error('Error adding pet:', error);
      setErrors({ name: 'Произошла ошибка при добавлении питомца' });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить питомца</DialogTitle>
          <DialogDescription>
            Создайте профиль для вашего питомца. Обязательные поля отмечены звездочкой.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Фото питомца */}
          <div className="space-y-2">
            <Label>Фото питомца</Label>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Предпросмотр"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={removePhoto}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
              )}
              
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="pet-photo"
                />
                <Label htmlFor="pet-photo" className="cursor-pointer">
                  <Button type="button" variant="outline" asChild>
                    <span>Выбрать фото</span>
                  </Button>
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG до 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя питомца *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Например: Барсик"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="species">Вид животного *</Label>
              <Select
                value={formData.species}
                onValueChange={(value) => handleInputChange('species', value)}
              >
                <SelectTrigger className={errors.species ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Выберите вид" />
                </SelectTrigger>
                <SelectContent>
                  {speciesOptions.map((species) => (
                    <SelectItem key={species} value={species}>
                      {species}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.species && (
                <p className="text-sm text-red-500">{errors.species}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed">Порода</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => handleInputChange('breed', e.target.value)}
                placeholder="Например: Лабрадор"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth_date">Дата рождения</Label>
              <Input
                id="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={(e) => handleInputChange('birth_date', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Пол</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Мужской ♂️</SelectItem>
                  <SelectItem value="female">Женский ♀️</SelectItem>
                  <SelectItem value="unknown">Не указан</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Вес (кг)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="Например: 5.2"
                className={errors.weight ? 'border-red-500' : ''}
              />
              {errors.weight && (
                <p className="text-sm text-red-500">{errors.weight}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Окрас</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="Например: Рыжий"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="microchip_number">Номер чипа</Label>
              <Input
                id="microchip_number"
                value={formData.microchip_number}
                onChange={(e) => handleInputChange('microchip_number', e.target.value)}
                placeholder="Например: 123456789012345"
              />
            </div>
          </div>

          {/* Заметки */}
          <div className="space-y-2">
            <Label htmlFor="notes">Заметки</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Дополнительная информация о питомце..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Добавление...' : 'Добавить питомца'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}