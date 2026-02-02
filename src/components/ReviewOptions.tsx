import { useState } from 'react';
import { useReviewStore } from '../store/reviewStore';

interface ReviewOption {
  id: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}

const MAIN_OPTIONS: ReviewOption[] = [
  { id: 'typo', label: 'Typo Check', description: 'Spelling errors and typos', defaultChecked: true },
  { id: 'grammar', label: 'Grammar Check', description: 'Grammar issues in narrative', defaultChecked: true },
  { id: 'line_edit', label: 'Line Edit Polish', description: 'Adverbs, echoes, passive voice', defaultChecked: true },
  { id: 'characters', label: 'Character List & Arcs', description: 'Character appearances and development', defaultChecked: true },
  { id: 'plot_summary', label: 'Plot Summary', description: 'Scene-by-scene plot beats', defaultChecked: false },
  { id: 'plot_holes', label: 'Possible Plot Holes', description: 'Continuity and logic issues', defaultChecked: false },
  { id: 'developmental', label: 'Developmental Review', description: 'Tone, strengths, areas to improve', defaultChecked: true },
];

const ADVANCED_OPTIONS: ReviewOption[] = [
  { id: 'style_consistency', label: 'Style Consistency', description: 'Voice, POV, tense consistency', defaultChecked: false },
  { id: 'dialogue_voice', label: 'Character Dialogue Voice', description: 'Speech pattern analysis per character', defaultChecked: false },
  { id: 'pacing', label: 'Pacing & Tension', description: 'Tension curve analysis', defaultChecked: false },
  { id: 'themes', label: 'Theme Detection', description: 'Identify themes and motifs', defaultChecked: false },
];

export const DEFAULT_OPTIONS = [...MAIN_OPTIONS, ...ADVANCED_OPTIONS]
  .filter(opt => opt.defaultChecked)
  .map(opt => opt.id);

export default function ReviewOptions() {
  const { selectedOptions, toggleOption } = useReviewStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const renderOption = (option: ReviewOption) => (
    <label
      key={option.id}
      className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <input
        type="checkbox"
        checked={selectedOptions.includes(option.id)}
        onChange={() => toggleOption(option.id)}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
      />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-gray-900">{option.label}</span>
        <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
      </div>
    </label>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        {MAIN_OPTIONS.map(renderOption)}
      </div>

      <div className="border-t border-gray-200 pt-3">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Advanced Options
        </button>

        {showAdvanced && (
          <div className="mt-2 pl-2 space-y-1">
            {ADVANCED_OPTIONS.map(renderOption)}
          </div>
        )}
      </div>

      <div className="text-xs text-gray-400 pt-2">
        {selectedOptions.length} option{selectedOptions.length !== 1 ? 's' : ''} selected
      </div>
    </div>
  );
}
