import { create } from 'zustand';
import { ReviewResult } from '../services/api';

// Default selected options
const DEFAULT_OPTIONS = ['typo', 'grammar', 'line_edit', 'characters', 'developmental'];

interface ReviewState {
  // File state
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;

  // Review options state
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  toggleOption: (optionId: string) => void;

  // Review state
  isReviewing: boolean;
  reviewProgress: string;
  reviewResult: ReviewResult | null;
  error: string | null;

  // Actions
  startReview: () => void;
  setProgress: (progress: string) => void;
  setResult: (result: ReviewResult) => void;
  setError: (error: string) => void;
  reset: () => void;

  // Review history (stored in memory for session)
  reviewHistory: ReviewResult[];
  addToHistory: (result: ReviewResult) => void;
  clearHistory: () => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  // Initial state
  selectedFile: null,
  selectedOptions: DEFAULT_OPTIONS,
  isReviewing: false,
  reviewProgress: '',
  reviewResult: null,
  error: null,
  reviewHistory: [],

  // File actions
  setSelectedFile: (file) => set({ selectedFile: file, error: null }),

  // Review options actions
  setSelectedOptions: (options) => set({ selectedOptions: options }),
  toggleOption: (optionId) =>
    set((state) => ({
      selectedOptions: state.selectedOptions.includes(optionId)
        ? state.selectedOptions.filter((id) => id !== optionId)
        : [...state.selectedOptions, optionId],
    })),

  // Review actions
  startReview: () =>
    set({
      isReviewing: true,
      reviewProgress: 'Uploading manuscript...',
      reviewResult: null,
      error: null,
    }),

  setProgress: (progress) => set({ reviewProgress: progress }),

  setResult: (result) =>
    set((state) => ({
      isReviewing: false,
      reviewProgress: '',
      reviewResult: result,
      reviewHistory: [result, ...state.reviewHistory],
    })),

  setError: (error) =>
    set({
      isReviewing: false,
      reviewProgress: '',
      error,
    }),

  reset: () =>
    set({
      selectedFile: null,
      selectedOptions: DEFAULT_OPTIONS,
      isReviewing: false,
      reviewProgress: '',
      reviewResult: null,
      error: null,
    }),

  // History actions
  addToHistory: (result) =>
    set((state) => ({
      reviewHistory: [result, ...state.reviewHistory],
    })),

  clearHistory: () => set({ reviewHistory: [] }),
}));
