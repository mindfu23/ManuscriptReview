import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ReviewProgress from '../components/ReviewProgress';
import ReviewResults from '../components/ReviewResults';
import { useReviewStore } from '../store/reviewStore';
import api from '../services/api';

type ReviewType = 'grammar' | 'style' | 'full';

export default function Home() {
  const [reviewType, setReviewType] = useState<ReviewType>('grammar');
  const {
    selectedFile,
    isReviewing,
    reviewProgress,
    reviewResult,
    error,
    startReview,
    setProgress,
    setResult,
    setError,
    reset,
  } = useReviewStore();

  const handleReview = async () => {
    if (!selectedFile) return;

    startReview();

    try {
      setProgress('Uploading manuscript...');
      await new Promise((resolve) => setTimeout(resolve, 500)); // Brief delay for UX

      setProgress('Analyzing content...');
      const result = await api.reviewManuscript(selectedFile, reviewType);

      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Review failed. Please try again.');
    }
  };

  // Show results if we have them
  if (reviewResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ReviewResults result={reviewResult} onReset={reset} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manuscript Review</h1>
        <p className="mt-2 text-gray-600">
          Get AI-powered feedback on your manuscript's grammar and style
        </p>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* File upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload your manuscript
          </label>
          <FileUpload />
        </div>

        {/* Review type selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: 'grammar', label: 'Grammar', desc: 'Check grammar in narrative prose' },
              { value: 'style', label: 'Style', desc: 'Analyze voice consistency' },
              { value: 'full', label: 'Full Review', desc: 'Complete analysis' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setReviewType(option.value as ReviewType)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  reviewType === option.value
                    ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="block font-medium text-gray-900">{option.label}</span>
                <span className="block text-xs text-gray-500 mt-1">{option.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Progress indicator */}
        {isReviewing && <ReviewProgress message={reviewProgress} />}

        {/* Submit button */}
        {!isReviewing && (
          <button
            onClick={handleReview}
            disabled={!selectedFile}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              selectedFile
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Start Review
          </button>
        )}
      </div>

      {/* Privacy note */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Your manuscript is processed securely and is not stored after review.
      </p>
    </div>
  );
}
