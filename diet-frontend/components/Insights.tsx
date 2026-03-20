'use client';

interface InsightsProps {
  dailyTotals: {
    calories: number;
    protein: number;
  };
  goals: {
    calories: number;
    protein: number;
  };
}

export default function Insights({ dailyTotals, goals }: InsightsProps) {
  const getInsights = () => {
    const insights = [];

    const proteinRemaining = goals.protein - dailyTotals.protein;
    if (proteinRemaining > 0) {
      insights.push(`💪 You need ${proteinRemaining.toFixed(0)}g more protein today`);
    } else if (proteinRemaining === 0) {
      insights.push('🎉 Great job hitting your protein goal!');
    } else {
      insights.push(`⚠️ You exceeded your protein goal by ${Math.abs(proteinRemaining).toFixed(0)}g`);
    }

    const caloriesRemaining = goals.calories - dailyTotals.calories;
    if (caloriesRemaining < 0) {
      insights.push(`🚨 You exceeded your calorie goal by ${Math.abs(caloriesRemaining).toFixed(0)} kcal`);
    } else if (caloriesRemaining <= 200) {
      insights.push(`⏰ You're close to your calorie goal (${caloriesRemaining.toFixed(0)} kcal remaining)`);
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-3">💡 Smart Insights</h3>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <li key={index} className="text-sm text-gray-700">
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}
