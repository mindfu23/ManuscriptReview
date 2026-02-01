interface ReviewProgressProps {
  message: string;
}

export default function ReviewProgress({ message }: ReviewProgressProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Koala thinking image */}
      <img
        src="/koala-mascot.png"
        alt="Koala thinking"
        className="w-24 h-24 object-contain animate-pulse"
      />

      {/* Progress message */}
      <p className="mt-6 text-sm font-medium text-primary-700">{message}</p>

      {/* Animated eucalyptus leaves (dots) */}
      <div className="flex space-x-2 mt-3">
        <span className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  );
}
