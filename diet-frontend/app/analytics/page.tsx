'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { food } from '@/utils/api';

interface ChartData {
  date: string;
  calories: number;
  protein: number;
}

export default function AnalyticsPage() {
  const [weeklyData, setWeeklyData] = useState<ChartData[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [weekRes, monthRes] = await Promise.all([
        food.getWeeklyFood(),
        food.getMonthlyFood(),
      ]);

      setWeeklyData(
        Object.entries(weekRes.data.dailyTotals).map(([date, totals]: any) => ({
          date,
          calories: totals.calories,
          protein: totals.protein,
        }))
      );

      setMonthlyData(
        Object.entries(monthRes.data.dailyTotals).map(([date, totals]: any) => ({
          date,
          calories: totals.calories,
          protein: totals.protein,
        }))
      );
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const data = view === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setView('weekly')}
          className={`px-4 py-2 rounded ${
            view === 'weekly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setView('monthly')}
          className={`px-4 py-2 rounded ${
            view === 'monthly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Monthly
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calories Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Calorie Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calories" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Protein Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Protein Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="protein" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
