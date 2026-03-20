'use client';

import { useEffect, useState } from 'react';
import { food } from '@/utils/api';

interface FoodEntry {
  _id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

export default function FoodLogPage() {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFoodLog();
  }, [selectedDate]);

  const loadFoodLog = async () => {
    setIsLoading(true);
    try {
      const res = await food.getDailyFood(selectedDate);
      setEntries(res.data.entries);
    } catch (error) {
      console.error('Failed to load food log:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await food.deleteFood(id);
        loadFoodLog();
      } catch (error) {
        console.error('Failed to delete entry:', error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Food Log</h1>

      <div>
        <label className="block text-sm font-medium mb-2">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
      </div>

      {entries.length > 0 ? (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Food Name</th>
                  <th className="text-center py-2">Calories</th>
                  <th className="text-center py-2">Protein (g)</th>
                  <th className="text-center py-2">Carbs (g)</th>
                  <th className="text-center py-2">Fat (g)</th>
                  <th className="text-center py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{entry.foodName}</td>
                    <td className="text-center">{entry.calories}</td>
                    <td className="text-center">{entry.protein.toFixed(1)}</td>
                    <td className="text-center">{entry.carbs.toFixed(1)}</td>
                    <td className="text-center">{entry.fat.toFixed(1)}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card text-center py-6">
          <p className="text-gray-600">No food entries for this date</p>
        </div>
      )}
    </div>
  );
}
