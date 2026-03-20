'use client';

import { useEffect, useState } from 'react';
import { food, user } from '@/utils/api';
import ProgressBar from '@/components/ProgressBar';
import QuickAddFood from '@/components/QuickAddFood';
import Insights from '@/components/Insights';

interface FoodEntry {
  _id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Goals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DailyData {
  entries: FoodEntry[];
  totals: { calories: number; protein: number; carbs: number; fat: number };
}

export default function DashboardPage() {
  const [goals, setGoals] = useState<Goals | null>(null);
  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddFood, setShowAddFood] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [goalsRes, foodRes] = await Promise.all([
        user.getGoals(),
        food.getDailyFood(),
      ]);
      setGoals(goalsRes.data);
      setDailyData(foodRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!goals || !dailyData) {
    return <div className="text-center py-10">Error loading data</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Today's Progress</h1>

      {/* Goals Progress Cards */}
      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🔥 Calories</h3>
          <p className="text-3xl font-bold mb-2">
            {dailyData.totals.calories} / {goals.calories} kcal
          </p>
          <ProgressBar
            current={dailyData.totals.calories}
            goal={goals.calories}
          />
          <p className="text-sm text-gray-600 mt-2">
            {goals.calories - dailyData.totals.calories > 0
              ? `${goals.calories - dailyData.totals.calories} kcal remaining`
              : `${Math.abs(goals.calories - dailyData.totals.calories)} kcal over`}
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">💪 Protein</h3>
          <p className="text-3xl font-bold mb-2">
            {dailyData.totals.protein.toFixed(1)} / {goals.protein} g
          </p>
          <ProgressBar
            current={dailyData.totals.protein}
            goal={goals.protein}
          />
          <p className="text-sm text-gray-600 mt-2">
            {goals.protein - dailyData.totals.protein > 0
              ? `${(goals.protein - dailyData.totals.protein).toFixed(1)} g remaining`
              : `${(Math.abs(goals.protein - dailyData.totals.protein)).toFixed(1)} g over`}
          </p>
        </div>
      </div>

      {/* Quick Insights */}
      <Insights
        dailyTotals={dailyData.totals}
        goals={goals}
      />

      {/* Food Checklist */}
      <div className="card">
        <h3 className="text-lg font-semibold">Food Checklist</h3>
        <ol className="mt-3 list-decimal list-inside text-sm text-gray-700 space-y-1">
          <li>Calories (kcal)</li>
          <li>Protein</li>
          <li>Carbohydrates (carbs)</li>
          <li>Fats</li>
          <li>Fiber</li>
          <li>Sugar</li>
          <li>Sodium (salt)</li>
          <li>Vitamins &amp; Minerals</li>
        </ol>

        <h4 className="text-sm font-semibold mt-4">Quick Check (simple version)</h4>
        <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Calories?</li>
          <li>Protein?</li>
          <li>High sugar?</li>
          <li>High oil/fat?</li>
          <li>Has fiber (veggies/fruits)?</li>
        </ul>
      </div>

      {/* Add Food Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddFood(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          + Add Food
        </button>
      </div>

      {/* Recent Entries */}
      {dailyData.entries.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Today's Entries</h3>
          <div className="space-y-2">
            {dailyData.entries.map((entry) => (
              <div
                key={entry._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{entry.foodName}</p>
                  <p className="text-sm text-gray-600">
                    {entry.calories} kcal | {entry.protein}g protein
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddFood && (
        <QuickAddFood
          onClose={() => {
            setShowAddFood(false);
            loadData();
          }}
        />
      )}
    </div>
  );
}
