'use client';

import { useEffect, useState } from 'react';
import { user } from '@/utils/api';
import { useForm } from 'react-hook-form';

interface Goals {
  _id: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function GoalsPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Goals>();
  const [goals, setGoals] = useState<Goals | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const res = await user.getGoals();
      setGoals(res.data);
      setValue('calories', res.data.calories);
      setValue('protein', res.data.protein);
      setValue('carbs', res.data.carbs);
      setValue('fat', res.data.fat);
    } catch (error) {
      console.error('Failed to load goals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: Goals) => {
    setIsSaving(true);
    setSuccess('');
    try {
      await user.updateGoals(data);
      setSuccess('Goals updated successfully!');
      loadGoals();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Failed to update goals:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Set Your Goals</h1>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="card max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Daily Calorie Goal (kcal)</label>
          <input
            {...register('calories', {
              required: 'Calories is required',
              min: { value: 500, message: 'Minimum 500 kcal' },
            })}
            type="number"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.calories && <p className="text-red-600 text-sm">{errors.calories.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Daily Protein Goal (grams)</label>
          <input
            {...register('protein', {
              required: 'Protein is required',
              min: { value: 20, message: 'Minimum 20g' },
            })}
            type="number"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.protein && <p className="text-red-600 text-sm">{errors.protein.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Daily Carbs Goal (grams)</label>
          <input
            {...register('carbs', {
              required: 'Carbs is required',
              min: { value: 20, message: 'Minimum 20g' },
            })}
            type="number"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.carbs && <p className="text-red-600 text-sm">{errors.carbs.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Daily Fat Goal (grams)</label>
          <input
            {...register('fat', {
              required: 'Fat is required',
              min: { value: 10, message: 'Minimum 10g' },
            })}
            type="number"
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.fat && <p className="text-red-600 text-sm">{errors.fat.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Update Goals'}
        </button>
      </form>
    </div>
  );
}
