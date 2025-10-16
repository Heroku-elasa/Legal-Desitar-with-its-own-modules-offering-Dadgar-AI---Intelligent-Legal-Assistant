
import React, { useState } from 'react';
import { REPORT_TYPES } from '../constants';
import { useLanguage } from '../types';
import { useAISuggestions, AISuggestionsDisplay } from './AISuggestions';

// FIX: Update types for state setters to allow functional updates. The original type
// (value: string) => void was too restrictive for functional updates like setDescription(prev => ...).
interface DraftingFormProps {
  onGenerate: (topic: string, description: string, docType: string) => void;
  isLoading: boolean;
  isComplete: boolean;
  topic: string;
  description: string;
  docType: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDocType: React.Dispatch<React.SetStateAction<string>>;
  isQuotaExhausted: boolean;
}

const DraftingForm: React.FC<DraftingFormProps> = ({ 
  onGenerate, 
  isLoading, 
  isComplete,
  topic,
  description,
  docType,
  setTopic,
  setDescription,
  setDocType,
  isQuotaExhausted
}) => {
  const { t } = useLanguage();
  const [isTopicFocused, setIsTopicFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const { suggestions: topicSuggestions, isLoading: isTopicSuggestionsLoading, setSuggestions: setTopicSuggestions } = useAISuggestions(
    topic,
    "Suggest a concise legal case topic based on the following user input",
    !isQuotaExhausted && isTopicFocused
  );

  const { suggestions: descriptionSuggestions, isLoading: isDescriptionSuggestionsLoading, setSuggestions: setDescriptionSuggestions } = useAISuggestions(
    topic,
    `Based on the legal case topic "${topic}", suggest three key points or short sentences to include in the case description`,
    !isQuotaExhausted && isDescriptionFocused && topic.trim().length > 5
  );

  const handleTopicSuggestionSelect = (suggestion: string) => {
    setTopic(suggestion);
    setTopicSuggestions([]);
  };

  const handleDescriptionSuggestionSelect = (suggestion: string) => {
    setDescription(prev => prev ? `${prev.trim()}\n- ${suggestion}` : `- ${suggestion}`);
    setDescriptionSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !description.trim()) {
      alert(t('generatorForm.validationError'));
      return;
    }
    onGenerate(topic, description, docType);
  };

  const handleUseExample = () => {
    const example = t(`reportExamples.${docType}`);
    if (example && typeof example === 'object' && 'topic' in example && 'description' in example) {
        setTopic(example.topic as string);
        setDescription(example.description as string);
    } else {
        console.warn(`No example found for docType: ${docType}`);
    }
  };


  return (
    <div className="bg-gray-800/50 rounded-lg p-8 shadow-lg backdrop-blur-sm border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">{t('generatorForm.title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="docType" className={`block text-sm font-medium text-gray-300 relative transition-colors duration-500 ${isComplete ? 'strikethrough-animated' : ''}`}>{t('generatorForm.docType')}</label>
          <select
            id="docType"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
          >
            {REPORT_TYPES.map(option => (
              <option key={option.value} value={option.value}>
                {t(`reportTypes.${option.value}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="topic" className={`block text-sm font-medium text-gray-300 relative transition-colors duration-500 ${isComplete ? 'strikethrough-animated' : ''}`}>{t('generatorForm.topic')}</label>
          <div className="relative">
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onFocus={() => setIsTopicFocused(true)}
              onBlur={() => setIsTopicFocused(false)}
              autoComplete="off"
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
              placeholder={t('generatorForm.topicPlaceholder')}
            />
            {isTopicFocused && (
              <AISuggestionsDisplay
                suggestions={topicSuggestions}
                isLoading={isTopicSuggestionsLoading}
                onSelect={handleTopicSuggestionSelect}
              />
            )}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="description" className={`block text-sm font-medium text-gray-300 relative transition-colors duration-500 ${isComplete ? 'strikethrough-animated' : ''}`}>{t('generatorForm.description')}</label>
            <button
                type="button"
                onClick={handleUseExample}
                className="text-xs text-blue-400 hover:underline focus:outline-none"
            >
                {t('generatorForm.useExample')}
            </button>
          </div>
          <div className="relative">
            <textarea
              id="description"
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setIsDescriptionFocused(true)}
              onBlur={() => setIsDescriptionFocused(false)}
              className="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
              placeholder={t('generatorForm.descriptionPlaceholder')}
            />
            {isDescriptionFocused && (
                <AISuggestionsDisplay
                  suggestions={descriptionSuggestions}
                  isLoading={isDescriptionSuggestionsLoading}
                  onSelect={handleDescriptionSuggestionSelect}
                />
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading || isQuotaExhausted}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isQuotaExhausted ? t('quotaErrorModal.title') : t('generatorForm.buttonText')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DraftingForm;
