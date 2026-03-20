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

interface GoalMetricCardProps {
  title: string;
  icon: string;
  current: number;
  goal: number;
  unit: string;
}

function GoalMetricCard({ title, icon, current, goal, unit }: GoalMetricCardProps) {
  const isDecimal = unit === 'g';
  const currentValue = isDecimal ? current.toFixed(1) : Math.round(current);
  const goalValue = isDecimal ? goal.toFixed(1) : Math.round(goal);
  const diff = goal - current;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">{icon} {title}</h3>
      <p className="text-3xl font-bold mb-2">
        {currentValue} / {goalValue} {unit}
      </p>
      <ProgressBar current={current} goal={goal} />
      <p className="text-sm text-gray-600 mt-2">
        {diff > 0
          ? `${isDecimal ? diff.toFixed(1) : Math.round(diff)} ${unit} remaining`
          : `${isDecimal ? Math.abs(diff).toFixed(1) : Math.round(Math.abs(diff))} ${unit} over`}
      </p>
    </div>
  );
}

interface PendingMetricCardProps {
  title: string;
  icon: string;
  note: string;
}

function PendingMetricCard({ title, icon, note }: PendingMetricCardProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">{icon} {title}</h3>
      <p className="text-3xl font-bold mb-2">Not tracked</p>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div className="h-full w-1/4 bg-gray-300" />
      </div>
      <p className="text-sm text-gray-600 mt-2">{note}</p>
    </div>
  );
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GoalMetricCard
          title="Calories"
          icon="🔥"
          current={dailyData.totals.calories}
          goal={goals.calories}
          unit="kcal"
        />

        <GoalMetricCard
          title="Protein"
          icon="💪"
          current={dailyData.totals.protein}
          goal={goals.protein}
          unit="g"
        />

        <GoalMetricCard
          title="Carbohydrates"
          icon="🌾"
          current={dailyData.totals.carbs}
          goal={goals.carbs}
          unit="g"
        />

        <GoalMetricCard
          title="Fats"
          icon="🥑"
          current={dailyData.totals.fat}
          goal={goals.fat}
          unit="g"
        />

        <PendingMetricCard
          title="Fiber"
          icon="🥬"
          note="Add more veggie and fruit entries to estimate this reliably."
        />

        <PendingMetricCard
          title="Sugar"
          icon="🍬"
          note="Sugar tracking will be enabled once detailed nutrition fields are added."
        />

        <PendingMetricCard
          title="Sodium (Salt)"
          icon="🧂"
          note="Sodium goals are not configured yet."
        />

        <PendingMetricCard
          title="Vitamins & Minerals"
          icon="💊"
          note="Micronutrient tracking is planned in a future update."
        />
      </div>

      {/* Quick Insights */}
      <Insights
        dailyTotals={dailyData.totals}
        goals={goals}
      />

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
