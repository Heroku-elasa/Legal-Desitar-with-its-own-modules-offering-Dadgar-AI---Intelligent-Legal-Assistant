import React, { useState, useCallback, createContext, useContext } from 'react';
import { en, fa } from './constants';

// --- LANGUAGE & TRANSLATION SETUP ---
type Language = 'en' | 'fa';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}
const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    const translations = language === 'fa' ? fa : en;
    let result: any = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key;
    }
    return result || key;
  }, [language]);

  return React.createElement(LanguageContext.Provider, { value: { language, setLanguage, t } }, children);
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

// --- TYPE DEFINITIONS ---
export type PageKey = 'legal_drafter' | 'lawyer_finder' | 'news_summarizer' | 'case_strategist' | 'notary_finder' | 'web_analyzer';

// Type for auto-save status indicator
export type SaveStatus = 'idle' | 'saving' | 'saved';

// Interface for a lawyer profile from the AI search or in saved state
export interface Lawyer {
    name: string;
    specialty: string;
    city: string;
    contactInfo: string;
    address: string;
    website: string;
    websiteTitle: string;
    relevanceScore?: number;
    yearsOfExperience?: number;
    notes?: string;
}

// Interface for a Notary Public office
export interface Notary {
    officeName: string;
    city: string;
    address: string;
    contactInfo: string;
    website: string;
    websiteTitle: string;
    services?: string;
}

// Interface for a web source from Google Search grounding
export interface Source {
  web: { 
    uri: string; 
    title: string; 
  } 
}

// Interface for a single task in the generated strategy
export interface StrategyTask {
  taskName: string;
  description: string;
  effortPercentage: number;
  deliverableType: string;
  suggestedPrompt: string;
}

// Interface for a single AI-guided routing suggestion
export interface IntentRoute {
  module: PageKey;
  confidencePercentage: number;
  reasoning: string;
}

// Interface for the result of preparing a draft from a strategy task
export interface DraftPreparationResult {
  docType: string;
  topic: string;
  description: string;
}


// --- APP STATE & CHECKPOINT SETUP ---

// Interface for data to be auto-saved to localStorage
export interface AutoSaveData {
  topic: string;
  description: string;
  docType: string;
  lawyerFinderKeywords: string;
  notaryFinderKeywords: string;
  newsQuery: string;
  webAnalyzerUrl: string;
  webAnalyzerQuery: string;
  strategyGoal: string;
  aiGuidePrompt: string;
}

export interface AppState {
  page: 'home' | PageKey;
  document: string;
  form: {
    topic: string;
    description: string;
    docType: string;
  };
  lawyers: Lawyer[];
  allLawyers: Lawyer[];
  lawyerFinderKeywords: string;
  notaryFinderKeywords: string;
  foundNotaries: Notary[];
  newsQuery: string;
  newsSummary: string;
  newsSources: Source[];
  strategyGoal: string;
  strategyResult: StrategyTask[];
  webAnalyzerUrl: string;
  webAnalyzerQuery: string;
  webAnalyzerResult: string;
  webAnalyzerSources: Source[];
  aiGuidePrompt: string;
  aiGuideResults: IntentRoute[];
}
export interface Checkpoint {
  id: string;
  timestamp: number;
  name: string;
  state: AppState;
}