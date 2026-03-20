'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { food } from '@/utils/api';

interface FoodFormData {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface QuickAddFoodProps {
  onClose: () => void;
}

export default function QuickAddFood({ onClose }: QuickAddFoodProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FoodFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [useImage, setUseImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const onSubmit = async (data: FoodFormData) => {
    setIsLoading(true);
    try {
      await food.addFood(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to add food:', error);
      alert('Failed to add food');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setIsDetecting(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        const res = await food.detectFood({ image: base64 });
        reset({
          foodName: res.data.foodName,
          calories: res.data.calories,
          protein: res.data.protein,
          carbs: res.data.carbs,
          fat: res.data.fat,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Failed to detect food:', error);
      alert('Failed to analyze image');
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add Food</h2>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setUseImage(false)}
            className={`flex-1 py-2 rounded ${
              !useImage ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => setUseImage(true)}
            className={`flex-1 py-2 rounded ${
              useImage ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Upload Image
          </button>
        </div>

        {useImage ? (
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isDetecting}
              className="w-full"
            />
            {isDetecting && <p className="text-sm text-gray-600 mt-2">Analyzing image...</p>}
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Food Name</label>
            <input
              {...register('foodName', { required: 'Food name is required' })}
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., Chicken Breast"
            />
            {errors.foodName && <p className="text-red-600 text-xs">{errors.foodName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Calories</label>
            <input
              {...register('calories', { required: 'Calories is required' })}
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="0"
            />
            {errors.calories && <p className="text-red-600 text-xs">{errors.calories.message}</p>}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Protein (g)</label>
              <input
                {...register('protein', { required: true })}
                type="number"
                className="w-full border rounded px-2 py-2"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Carbs (g)</label>
              <input
                {...register('carbs', { required: true })}
                type="number"
                className="w-full border rounded px-2 py-2"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fat (g)</label>
              <input
                {...register('fat', { required: true })}
                type="number"
                className="w-full border rounded px-2 py-2"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isDetecting}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Food'}
            </button>
          </div>
        </form>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-900">FOOD CHECKLIST</h3>
          <ol className="mt-2 list-decimal list-inside text-sm text-gray-700 space-y-1">
            <li>Calories (kcal)</li>
            <li>Protein</li>
            <li>Carbohydrates (carbs)</li>
            <li>Fats</li>
            <li>Fiber</li>
            <li>Sugar</li>
            <li>Sodium (salt)</li>
            <li>Vitamins &amp; Minerals</li>
          </ol>

          <h3 className="text-sm font-semibold text-gray-900 mt-4">QUICK CHECK (simple version)</h3>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Calories?</li>
            <li>Protein?</li>
            <li>High sugar?</li>
            <li>High oil/fat?</li>
            <li>Has fiber (veggies/fruits)?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
