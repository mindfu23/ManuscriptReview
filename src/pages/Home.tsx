import FileUpload from '../components/FileUpload';
import ReviewProgress from '../components/ReviewProgress';
import ReviewResults from '../components/ReviewResults';
import { useReviewStore } from '../store/reviewStore';
import api from '../services/api';

export default function Home() {
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
      setProgress('Thoughtfully munching eucalyptus leaves...');
      const result = await api.reviewManuscript(selectedFile, 'full');

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
      {/* Main content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* File upload */}
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
            disabled={!selectedFile}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              selectedFile
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Feedback
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
