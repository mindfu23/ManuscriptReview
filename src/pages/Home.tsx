import FileUpload from '../components/FileUpload';
import ReviewOptions from '../components/ReviewOptions';
import ReviewProgress from '../components/ReviewProgress';
import ReviewResults from '../components/ReviewResults';
import { useReviewStore } from '../store/reviewStore';
import api from '../services/api';

export default function Home() {
  const {
    selectedFile,
    selectedOptions,
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
    if (!selectedFile || selectedOptions.length === 0) return;

    startReview();

    try {
      setProgress('Thoughtfully munching eucalyptus leaves...');
      const result = await api.reviewManuscript(selectedFile, selectedOptions);

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

  const canSubmit = selectedFile && selectedOptions.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">
        {/* Left column - File upload */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload your manuscript
            </label>
            <FileUpload />
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
              disabled={!canSubmit}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                canSubmit
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Feedback
            </button>
          )}
        </div>

        {/* Right column - Review options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Review Options
          </label>
          <ReviewOptions />
        </div>
      </div>

      {/* Privacy note */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Your manuscript is processed securely and is not stored after review.
      </p>
    </div>
  );
}
