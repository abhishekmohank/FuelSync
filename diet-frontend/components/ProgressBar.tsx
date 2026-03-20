'use client';

interface ProgressBarProps {
  current: number;
  goal: number;
}

export default function ProgressBar({ current, goal }: ProgressBarProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  const isOver = current > goal;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ${
          isOver ? 'bg-red-500' : 'bg-green-500'
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
