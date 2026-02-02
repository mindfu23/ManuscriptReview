import { useState, useEffect } from 'react';

interface ReviewProgressProps {
  message: string;
}

export default function ReviewProgress({ message }: ReviewProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress: fast at first, slows down as it approaches 90%
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev; // Cap at 90% until complete
        const increment = Math.max(1, (90 - prev) / 10);
        return Math.min(90, prev + increment);
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Koala thinking image */}
      <img
        src="/koala-mascot.png"
        alt="Koala thinking"
        className="w-20 h-20 object-contain animate-pulse"
      />

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 text-center mt-1">{Math.round(progress)}%</p>
      </div>

      {/* Progress message */}
      <p className="mt-3 text-sm text-gray-600">{message}</p>
    </div>
  );
}
