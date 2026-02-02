import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ReviewResult, ReviewSection } from '../services/api';

interface ReviewResultsProps {
  result: ReviewResult;
  onReset: () => void;
}

interface CollapsibleSectionProps {
  section: ReviewSection;
  defaultExpanded?: boolean;
}

function CollapsibleSection({ section, defaultExpanded = false }: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium text-gray-900">{section.title}</span>
        </div>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            section.issue_count > 0
              ? 'bg-amber-100 text-amber-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {section.issue_count} issue{section.issue_count !== 1 ? 's' : ''}
        </span>
      </button>

      {isExpanded && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{section.content_markdown}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReviewResults({ result, onReset }: ReviewResultsProps) {
  const [showRaw, setShowRaw] = useState(false);

  const downloadMarkdown = () => {
    const blob = new Blob([result.review_markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `review-${result.manuscript_name.replace(/\.[^/.]+$/, '')}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    if (navigator.share) {
      try {
        const file = new File(
          [result.review_markdown],
          `review-${result.manuscript_name}.md`,
          { type: 'text/markdown' }
        );

        await navigator.share({
          title: `Review: ${result.manuscript_name}`,
          text: `Manuscript review with ${result.issues_found} issues found.`,
          files: [file],
        });
      } catch {
        downloadMarkdown();
      }
    } else {
      downloadMarkdown();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.review_markdown);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const hasSections = result.sections && result.sections.length > 0;

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Review Complete</h2>
            <p className="text-sm text-gray-500 mt-1">{result.manuscript_name}</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{result.word_count.toLocaleString()}</p>
              <p className="text-gray-500">Words</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${result.issues_found > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                {result.issues_found}
              </p>
              <p className="text-gray-500">Issues</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={downloadMarkdown}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download .md
          </button>

          <button
            onClick={shareResults}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>

          <button
            onClick={copyToClipboard}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            New Review
          </button>
        </div>
      </div>

      {/* Sectioned results (if available) */}
      {hasSections && (
        <div className="space-y-3">
          {result.sections!.map((section) => (
            <CollapsibleSection
              key={section.id}
              section={section}
              defaultExpanded={false}
            />
          ))}
        </div>
      )}

      {/* Fallback to full markdown (for backward compatibility or if no sections) */}
      {!hasSections && (
        <>
          {/* View toggle */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {showRaw ? 'Show formatted' : 'Show raw markdown'}
            </button>
          </div>

          {/* Review content */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-x-auto">
            {showRaw ? (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                {result.review_markdown}
              </pre>
            ) : (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{result.review_markdown}</ReactMarkdown>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
