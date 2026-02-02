import { useState } from 'react';
import { useReviewStore } from '../store/reviewStore';

interface ReviewOption {
  id: string;
  label: string;
  description?: string;
  defaultChecked: boolean;
}

// Line editor options (left column)
const LINE_EDITOR_OPTIONS: ReviewOption[] = [
  { id: 'typo', label: 'typos', defaultChecked: true },
  { id: 'grammar', label: 'grammar', defaultChecked: true },
  { id: 'line_edit', label: 'prose polish', description: 'adverbs, echoes, passive voice', defaultChecked: true },
];

// Developmental editor options (right column)
const DEV_EDITOR_OPTIONS: ReviewOption[] = [
  { id: 'characters', label: 'characters & arcs', defaultChecked: true },
  { id: 'plot_summary', label: 'plot summary', defaultChecked: false },
  { id: 'plot_holes', label: 'possible plot holes', defaultChecked: false },
  { id: 'developmental', label: 'developmental review', description: 'tone, strengths, next steps', defaultChecked: true },
];

// Advanced options (under developmental)
const ADVANCED_OPTIONS: ReviewOption[] = [
  { id: 'style_consistency', label: 'style', defaultChecked: false },
  { id: 'dialogue_voice', label: 'dialogue & voice', defaultChecked: false },
  { id: 'pacing', label: 'pacing', defaultChecked: false },
  { id: 'themes', label: 'theme', defaultChecked: false },
];

export const DEFAULT_OPTIONS = [...LINE_EDITOR_OPTIONS, ...DEV_EDITOR_OPTIONS, ...ADVANCED_OPTIONS]
  .filter(opt => opt.defaultChecked)
  .map(opt => opt.id);

export default function ReviewOptions() {
  const { selectedOptions, toggleOption } = useReviewStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const renderOption = (option: ReviewOption, indent = false) => (
    <label
      key={option.id}
      className={`flex items-center gap-2 py-0.5 cursor-pointer hover:text-gray-900 transition-colors ${indent ? 'pl-4' : ''}`}
    >
      <input
        type="checkbox"
        checked={selectedOptions.includes(option.id)}
        onChange={() => toggleOption(option.id)}
        className="h-3.5 w-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
      />
      <span className="text-sm text-gray-700">
        {option.label}
        {option.description && <span className="text-gray-400"> - {option.description}</span>}
      </span>
    </label>
  );

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-4">
        {/* Line editor column */}
        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-1">Line editor</h4>
          {LINE_EDITOR_OPTIONS.map(opt => renderOption(opt))}
        </div>

        {/* Developmental editor column */}
        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-1">Developmental editor</h4>
          {DEV_EDITOR_OPTIONS.map(opt => renderOption(opt))}

          {/* Advanced options under developmental */}
          <div className="mt-1">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors py-0.5"
            >
              <svg
                className={`w-2.5 h-2.5 transition-transform ${showAdvanced ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              advanced
            </button>

            {showAdvanced && (
              <div className="pl-3">
                {ADVANCED_OPTIONS.map(opt => renderOption(opt))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400 pt-1">
        {selectedOptions.length} selected
      </div>
    </div>
  );
}
