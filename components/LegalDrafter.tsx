
import React from 'react';
import DraftingForm from './GeneratorForm';
import DocumentDisplay from './ReportDisplay';
import { PageKey, useLanguage } from '../types';

// FIX: Update types for state setters to match the expected React state dispatcher type.
// This allows passing them correctly to child components like DraftingForm.
interface LegalDrafterProps {
  onGenerate: (topic: string, description: string, docType: string) => void;
  generatedDocument: string;
  isLoading: boolean;
  error: string | null;
  isComplete: boolean;
  topic: string;
  description: string;
  docType: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDocType: React.Dispatch<React.SetStateAction<string>>;
  isQuotaExhausted: boolean;
  setPage: (page: PageKey) => void;
}

const LegalDrafter: React.FC<LegalDrafterProps> = ({ 
  onGenerate, 
  generatedDocument, 
  isLoading, 
  error, 
  isComplete, 
  topic, 
  description, 
  docType, 
  setTopic, 
  setDescription, 
  setDocType,
  isQuotaExhausted,
  setPage
}) => {
  const { t } = useLanguage();

  return (
    <section id="generator" className="py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="lg:sticky top-28 space-y-6">
          <div className="p-4 bg-gray-800/25 rounded-lg border border-gray-700 text-center">
              <p className="text-sm text-gray-400 mb-3">
                  {t('langCode') === 'fa' ? 'نیاز به یافتن یک متخصص دارید؟ مستقیماً به فهرست‌های ما بروید:' : 'Need to find a professional? Jump to our directories:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setPage('lawyer_finder')}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  {t('header.lawyerFinder')}
                </button>
                <button 
                  onClick={() => setPage('notary_finder')}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                  {t('header.notaryFinder')}
                </button>
              </div>
          </div>
          <DraftingForm 
            onGenerate={onGenerate} 
            isLoading={isLoading} 
            isComplete={isComplete}
            topic={topic}
            description={description}
            docType={docType}
            setTopic={setTopic}
            setDescription={setDescription}
            setDocType={setDocType}
            isQuotaExhausted={isQuotaExhausted}
          />
        </div>
        <div className="bg-gray-800/50 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700">
          <DocumentDisplay generatedDocument={generatedDocument} isLoading={isLoading} error={error} />
        </div>
      </div>
    </section>
  );
};

export default LegalDrafter;
