import React, { useState, useCallback, useEffect } from 'react';
import { marked } from 'marked';
import SiteHeader from './components/Header';
import HomePage from './components/Hero';
import LawyerFinder from './components/LawyerFinder';
import LegalDrafter from './components/LegalDrafter';
import NewsSummarizer from './components/NewsSummarizer';
import CaseStrategist from './components/CaseStrategist';
import NotaryFinder from './components/NotaryFinder';
import WebAnalyzer from './components/WebAnalyzer';
import SiteFooter from './components/Footer';
import QuotaErrorModal from './components/QuotaErrorModal';
import AIGuideModal from './components/AIGuideModal';
import { generateReportStream, summarizeNews, generateStrategy, routeUserIntent, findNotaries, prepareDraftFromTask, analyzeWebPage } from './services/geminiService';
import { initDB, getAllLawyers, addLawyers, clearAllLawyers } from './services/dbService';
import { Lawyer, Checkpoint, AppState, useLanguage, Source, StrategyTask, IntentRoute, PageKey, Notary, SaveStatus, AutoSaveData } from './types';
import { REPORT_TYPES } from './constants';


// --- AI ASSISTANT PAGE COMPONENT (NOW WITH TABS) ---

const AIAssistantHero: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="text-center pt-16 pb-12 sm:pt-24 sm:pb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 tracking-tight">
                {t('aiHero.title')}
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{t('aiHero.subtitle')}</p>
        </div>
    );
};

const LegalAssistantPage: React.FC<any> = ({
    page,
    setPage,
    // Drafter Props
    handleGenerate, generatedDocument, isLoading, error, isComplete, topic, description, docType, setTopic, setDescription, setDocType,
    // Lawyer Finder Props
    savedLawyers, handleSaveLawyer, handleRemoveLawyer, handleClearAllSaved, handleNoteChange, lawyerFinderKeywords, setLawyerFinderKeywords,
    allLawyers, onLawyersFound, onClearAllDbLawyers,
    // Notary Finder Props
    handleFindNotaries, notaryFinderKeywords, setNotaryFinderKeywords, foundNotaries, isFindingNotaries, notaryError,
    // News Summarizer Props
    handleSummarizeNews, newsQuery, setNewsQuery, newsSummary, newsSources, isSummarizingNews, newsError,
    // Web Analyzer Props
    handleAnalyzeWebPage, webAnalyzerUrl, setWebAnalyzerUrl, webAnalyzerQuery, setWebAnalyzerQuery, webAnalyzerResult, webAnalyzerSources, isAnalyzingWeb, webAnalyzerError,
    // Case Strategist Props
    handleGenerateStrategy, strategyGoal, setStrategyGoal, strategyResult, isGeneratingStrategy, strategyError,
    onExecuteStrategyTask, isExecutingStrategyTask,
    // Global Error Props
    handleApiError,
    isQuotaExhausted,
}) => {
    const { t } = useLanguage();

    const tabs = [
        { id: 'legal_drafter', label: t('header.aiAssistant') },
        { id: 'lawyer_finder', label: t('header.lawyerFinder') },
        { id: 'notary_finder', label: t('header.notaryFinder') },
        { id: 'news_summarizer', label: t('header.newsSummarizer') },
        { id: 'web_analyzer', label: t('header.webAnalyzer') },
        { id: 'case_strategist', label: t('header.caseStrategist') },
    ];
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AIAssistantHero />

             {/* Tab Navigation */}
            <div className="border-b border-gray-700 mb-8 sticky top-20 bg-gray-900/80 backdrop-blur-sm z-40">
                <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setPage(tab.id)}
                            className={`whitespace-nowrap py-4 px-2 sm:px-4 border-b-2 font-medium text-sm transition-colors ${
                                page === tab.id
                                    ? 'border-blue-400 text-blue-300'
                                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
                {page === 'legal_drafter' && (
                    <LegalDrafter
                      onGenerate={handleGenerate}
                      generatedDocument={generatedDocument}
                      isLoading={isLoading}
                      error={error}
                      isComplete={isComplete}
                      topic={topic}
                      description={description}
                      docType={docType}
                      setTopic={setTopic}
                      setDescription={setDescription}
                      setDocType={setDocType}
                      isQuotaExhausted={isQuotaExhausted}
                      setPage={setPage}
                    />
                )}
                {page === 'lawyer_finder' && (
                    <LawyerFinder 
                        savedLawyers={savedLawyers}
                        onSaveLawyer={handleSaveLawyer}
                        onRemoveLawyer={handleRemoveLawyer}
                        onClearAllSaved={handleClearAllSaved}
                        onNoteChange={handleNoteChange}
                        keywords={lawyerFinderKeywords}
                        setKeywords={setLawyerFinderKeywords}
                        handleApiError={handleApiError}
                        isQuotaExhausted={isQuotaExhausted}
                        allLawyers={allLawyers}
                        onLawyersFound={onLawyersFound}
                        onClearAllDbLawyers={onClearAllDbLawyers}
                    />
                )}
                {page === 'notary_finder' && (
                     <NotaryFinder
                        onSearch={handleFindNotaries}
                        keywords={notaryFinderKeywords}
                        setKeywords={setNotaryFinderKeywords}
                        results={foundNotaries}
                        isLoading={isFindingNotaries}
                        error={notaryError}
                        isQuotaExhausted={isQuotaExhausted}
                     />
                )}
                {page === 'news_summarizer' && (
                    <NewsSummarizer
                      onSummarize={handleSummarizeNews}
                      query={newsQuery}
                      setQuery={setNewsQuery}
                      summary={newsSummary}
                      sources={newsSources}
                      isLoading={isSummarizingNews}
                      error={newsError}
                      isQuotaExhausted={isQuotaExhausted}
                    />
                )}
                {page === 'web_analyzer' && (
                    <WebAnalyzer
                      onAnalyze={handleAnalyzeWebPage}
                      url={webAnalyzerUrl}
                      setUrl={setWebAnalyzerUrl}
                      query={webAnalyzerQuery}
                      setQuery={setWebAnalyzerQuery}
                      result={webAnalyzerResult}
                      sources={webAnalyzerSources}
                      isLoading={isAnalyzingWeb}
                      error={webAnalyzerError}
                      isQuotaExhausted={isQuotaExhausted}
                    />
                )}
                 {page === 'case_strategist' && (
                    <CaseStrategist
                      onGenerate={handleGenerateStrategy}
                      goal={strategyGoal}
                      setGoal={setStrategyGoal}
                      result={strategyResult}
                      isLoading={isGeneratingStrategy}
                      error={strategyError}
                      isQuotaExhausted={isQuotaExhausted}
                      onExecuteTask={onExecuteStrategyTask}
                      isExecutingTask={isExecutingStrategyTask}
                    />
                )}
            </div>
        </div>
    );
}

// --- MAIN APP COMPONENT ---
const AUTOSAVE_KEY = 'dadgarAI-autosave';
const AUTOSAVE_DELAY = 1500; // ms

const App: React.FC = () => {
  const { language, t } = useLanguage();
  const [page, setPage] = useState<PageKey | 'home'>('home');

  // All application state is managed here
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [docType, setDocType] = useState(REPORT_TYPES[0].value);
  
  const [savedLawyers, setSavedLawyers] = useState<Lawyer[]>([]);
  const [allLawyers, setAllLawyers] = useState<Lawyer[]>([]);
  const [lawyerFinderKeywords, setLawyerFinderKeywords] = useState<string>('');

  const [notaryFinderKeywords, setNotaryFinderKeywords] = useState('');
  const [foundNotaries, setFoundNotaries] = useState<Notary[]>([]);
  const [isFindingNotaries, setIsFindingNotaries] = useState(false);
  const [notaryError, setNotaryError] = useState<string|null>(null);
  
  const [newsQuery, setNewsQuery] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsSources, setNewsSources] = useState<Source[]>([]);
  const [isSummarizingNews, setIsSummarizingNews] = useState(false);
  const [newsError, setNewsError] = useState<string|null>(null);
  
  const [webAnalyzerUrl, setWebAnalyzerUrl] = useState('');
  const [webAnalyzerQuery, setWebAnalyzerQuery] = useState('');
  const [webAnalyzerResult, setWebAnalyzerResult] = useState('');
  const [webAnalyzerSources, setWebAnalyzerSources] = useState<Source[]>([]);
  const [isAnalyzingWeb, setIsAnalyzingWeb] = useState(false);
  const [webAnalyzerError, setWebAnalyzerError] = useState<string|null>(null);

  const [strategyGoal, setStrategyGoal] = useState('');
  const [strategyResult, setStrategyResult] = useState<StrategyTask[]>([]);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [strategyError, setStrategyError] = useState<string|null>(null);
  const [isExecutingStrategyTask, setIsExecutingStrategyTask] = useState(false);

  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  
  // State for AI Guide
  const [isAIGuideOpen, setIsAIGuideOpen] = useState(false);
  const [aiGuidePrompt, setAIGuidePrompt] = useState('');
  const [aiGuideResults, setAIGuideResults] = useState<IntentRoute[]>([]);
  const [isRouting, setIsRouting] = useState(false);
  const [routingError, setRoutingError] = useState<string | null>(null);

  // Global Error State
  const [showQuotaErrorModal, setShowQuotaErrorModal] = useState<boolean>(false);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState<boolean>(false);

  // State for Auto-Save feature
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  // Global handler for API errors, checks for quota issues.
  const handleApiError = useCallback((err: unknown): string => {
    const errorMessage = err instanceof Error ? err.message : String(err);
    if (errorMessage.includes('(Quota Exceeded)')) {
      setShowQuotaErrorModal(true);
      setIsQuotaExhausted(true);
    }
    return errorMessage;
  }, []);


  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Load from local storage and DB on initial mount
  useEffect(() => {
    const loadData = async () => {
        try {
            await initDB();
            const dbLawyers = await getAllLawyers();
            setAllLawyers(dbLawyers);

            const savedLawyersItem = window.localStorage.getItem('savedLawyers');
            if (savedLawyersItem) setSavedLawyers(JSON.parse(savedLawyersItem));

            const checkpointsItem = window.localStorage.getItem('projectCheckpoints');
            if (checkpointsItem) {
                const loadedCheckpoints = JSON.parse(checkpointsItem);
                setCheckpoints(loadedCheckpoints);
            }

            // Load auto-saved data
            const autoSavedItem = window.localStorage.getItem(AUTOSAVE_KEY);
            if (autoSavedItem) {
                const savedData: AutoSaveData = JSON.parse(autoSavedItem);
                setTopic(savedData.topic || '');
                setDescription(savedData.description || '');
                setDocType(savedData.docType || REPORT_TYPES[0].value);
                setLawyerFinderKeywords(savedData.lawyerFinderKeywords || '');
                setNotaryFinderKeywords(savedData.notaryFinderKeywords || '');
                setNewsQuery(savedData.newsQuery || '');
                setWebAnalyzerUrl(savedData.webAnalyzerUrl || '');
                setWebAnalyzerQuery(savedData.webAnalyzerQuery || '');
                setStrategyGoal(savedData.strategyGoal || '');
                setAIGuidePrompt(savedData.aiGuidePrompt || '');
            }

        } catch (error) {
            console.error("Error loading data from storage", error);
        }
    };
    loadData();
  }, []);

  // Persist lawyers and checkpoints to local storage
  useEffect(() => {
    try { 
      window.localStorage.setItem('savedLawyers', JSON.stringify(savedLawyers)); 
      window.localStorage.setItem('projectCheckpoints', JSON.stringify(checkpoints));
    } catch (error) { console.error("Error saving general data", error); }
  }, [savedLawyers, checkpoints]);
  
  // Auto-save user input with debounce
  useEffect(() => {
    setSaveStatus('saving');
    const handler = setTimeout(() => {
        try {
            const dataToSave: AutoSaveData = {
                topic,
                description,
                docType,
                lawyerFinderKeywords,
                notaryFinderKeywords,
                newsQuery,
                webAnalyzerUrl,
                webAnalyzerQuery,
                strategyGoal,
                aiGuidePrompt,
            };
            window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(dataToSave));
            setSaveStatus('saved');
        } catch (error) {
            console.error("Error during auto-save:", error);
            setSaveStatus('idle'); // Revert on error
        }
    }, AUTOSAVE_DELAY);

    return () => {
        clearTimeout(handler);
    };
  }, [
    topic, description, docType, lawyerFinderKeywords, notaryFinderKeywords,
    newsQuery, webAnalyzerUrl, webAnalyzerQuery, strategyGoal, aiGuidePrompt
  ]);

  // Effect to manage the UI state of the save indicator
  useEffect(() => {
    if (saveStatus === 'saved') {
        const handler = setTimeout(() => {
            setSaveStatus('idle');
        }, 2000); // Show "Saved" for 2 seconds
        return () => clearTimeout(handler);
    }
  }, [saveStatus]);

  // --- All handlers remain here ---
  const handleCreateCheckpoint = useCallback(() => {
    const checkpointName = prompt('Enter a name for this checkpoint:', `Checkpoint ${new Date().toLocaleString()}`);
    if (!checkpointName) return;

    const currentState: AppState = {
      page,
      document: generatedDocument,
      form: { topic, description, docType },
      lawyers: savedLawyers,
      allLawyers: allLawyers,
      lawyerFinderKeywords,
      notaryFinderKeywords,
      foundNotaries,
      newsQuery,
      newsSummary,
      newsSources,
      strategyGoal,
      strategyResult,
      webAnalyzerUrl,
      webAnalyzerQuery,
      webAnalyzerResult,
      webAnalyzerSources,
      aiGuidePrompt,
      aiGuideResults,
    };

    const newCheckpoint: Checkpoint = {
      id: `ckpt-${Date.now()}`,
      timestamp: Date.now(),
      name: checkpointName,
      state: currentState,
    };

    setCheckpoints(prev => [newCheckpoint, ...prev]);
  }, [page, generatedDocument, topic, description, docType, savedLawyers, allLawyers, lawyerFinderKeywords, notaryFinderKeywords, foundNotaries, newsQuery, newsSummary, newsSources, strategyGoal, strategyResult, webAnalyzerUrl, webAnalyzerQuery, webAnalyzerResult, webAnalyzerSources, aiGuidePrompt, aiGuideResults]);

  const handleRestoreCheckpoint = useCallback((id: string) => {
    const checkpointToRestore = checkpoints.find(ckpt => ckpt.id === id);
    if (checkpointToRestore) {
      const state = checkpointToRestore.state;
      setPage(state.page as any);
      setGeneratedDocument(state.document);
      setTopic(state.form.topic);
      setDescription(state.form.description);
      setDocType(state.form.docType);
      setSavedLawyers(state.lawyers);
      setAllLawyers(state.allLawyers || []);
      setLawyerFinderKeywords(state.lawyerFinderKeywords);
      setNotaryFinderKeywords(state.notaryFinderKeywords || '');
      setFoundNotaries(state.foundNotaries || []);
      setNewsQuery(state.newsQuery || '');
      setNewsSummary(state.newsSummary || '');
      setNewsSources(state.newsSources || []);
      setStrategyGoal(state.strategyGoal || '');
      setStrategyResult(state.strategyResult || []);
      setWebAnalyzerUrl(state.webAnalyzerUrl || '');
      setWebAnalyzerQuery(state.webAnalyzerQuery || '');
      setWebAnalyzerResult(state.webAnalyzerResult || '');
      setWebAnalyzerSources(state.webAnalyzerSources || []);
      setAIGuidePrompt(state.aiGuidePrompt || '');
      setAIGuideResults(state.aiGuideResults || []);
      
      alert(`Restored checkpoint: "${checkpointToRestore.name}"`);
    }
  }, [checkpoints]);

  const handleDeleteCheckpoint = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this checkpoint? This action cannot be undone.')) {
        setCheckpoints(prev => prev.filter(ckpt => ckpt.id !== id));
    }
  }, []);

  const handleGenerate = useCallback(async (newTopic: string, newDescription: string, newDocType: string) => {
    setIsLoading(true);
    setGeneratedDocument('');
    setError(null);
    setTopic(newTopic);
    setDescription(newDescription);
    setDocType(newDocType);

    const promptMap = t('promptMap');
    const promptTemplate = promptMap[newDocType] || promptMap['petition'];
    const prompt = promptTemplate.replace('{topic}', newTopic).replace('{description}', newDescription);

    try {
      const stream = generateReportStream(prompt);
      for await (const chunk of stream) {
        setGeneratedDocument(prev => prev + chunk);
      }
    } catch (err) {
        const msg = handleApiError(err);
        setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [handleApiError, t]);

    const handleSummarizeNews = useCallback(async (query: string) => {
        setIsSummarizingNews(true);
        setNewsSummary('');
        setNewsSources([]);
        setNewsError(null);
        setNewsQuery(query);
        
        const prompt = t('newsSummarizer.prompt').replace('{query}', query);

        try {
            const result = await summarizeNews(prompt);
            const htmlSummary = await marked.parse(result.text);
            setNewsSummary(htmlSummary);
            setNewsSources(result.sources);
        } catch (err) {
            const msg = handleApiError(err);
            setNewsError(msg);
        } finally {
            setIsSummarizingNews(false);
        }
    }, [handleApiError, t]);
    
    const handleAnalyzeWebPage = useCallback(async (url: string, query: string) => {
        setIsAnalyzingWeb(true);
        setWebAnalyzerResult('');
        setWebAnalyzerSources([]);
        setWebAnalyzerError(null);
        setWebAnalyzerUrl(url);
        setWebAnalyzerQuery(query);
        
        const prompt = t('webAnalyzer.prompt').replace('{url}', url).replace('{query}', query);

        try {
            const result = await analyzeWebPage(prompt);
            const htmlResult = await marked.parse(result.text);
            setWebAnalyzerResult(htmlResult);
            setWebAnalyzerSources(result.sources);
        } catch (err) {
            const msg = handleApiError(err);
            setWebAnalyzerError(msg);
        } finally {
            setIsAnalyzingWeb(false);
        }
    }, [handleApiError, t]);


    const handleGenerateStrategy = useCallback(async (goal: string) => {
        setIsGeneratingStrategy(true);
        setStrategyResult([]);
        setStrategyError(null);
        setStrategyGoal(goal);
        
        const promptTemplate = t('caseStrategist.prompt');

        try {
            const result = await generateStrategy(goal, promptTemplate);
            setStrategyResult(result);
        } catch (err) {
            const msg = handleApiError(err);
            setStrategyError(msg);
        } finally {
            setIsGeneratingStrategy(false);
        }
    }, [handleApiError, t]);

  const handleExecuteStrategyTask = useCallback(async (task: StrategyTask) => {
    setIsExecutingStrategyTask(true);
    const promptTemplate = t('prepareDraftFromTask.prompt');
    const docTypeOptions = REPORT_TYPES.map(t => t.value).join(', ');

    try {
        const result = await prepareDraftFromTask(task, promptTemplate, docTypeOptions);
        // Validate docType from AI
        if (REPORT_TYPES.some(rt => rt.value === result.docType)) {
            setDocType(result.docType);
        } else {
            console.warn(`AI returned an invalid docType '${result.docType}'. Defaulting.`);
            setDocType(REPORT_TYPES[0].value); // Default to first type if invalid
        }
        setTopic(result.topic);
        setDescription(result.description);
        setPage('legal_drafter'); // Navigate to the drafter
        window.scrollTo(0, 0);
    } catch (err) {
        const msg = handleApiError(err);
        alert(`Error preparing draft: ${msg}`);
    } finally {
        setIsExecutingStrategyTask(false);
    }
  }, [handleApiError, t]);

  const handleFindNotaries = useCallback(async (query: string) => {
    setIsFindingNotaries(true);
    setFoundNotaries([]);
    setNotaryError(null);
    setNotaryFinderKeywords(query);

    const promptTemplate = t('notaryFinder.prompt');
    const prompt = promptTemplate.replace('{queries}', query);

    try {
        const result = await findNotaries(prompt);
        // This is a simplified handler that sets raw text for the component to parse
        // More complex logic could live here if needed
        return result.text; 
    } catch(err) {
        const msg = handleApiError(err);
        setNotaryError(msg);
        return null;
    } finally {
        setIsFindingNotaries(false);
    }
  }, [handleApiError, t]);

  const handleRouteIntent = useCallback(async (goal: string) => {
      setIsRouting(true);
      setAIGuideResults([]);
      setRoutingError(null);
      setAIGuidePrompt(goal);

      const promptTemplate = t('aiGuide.prompt');

      try {
          const results = await routeUserIntent(goal, promptTemplate);
          setAIGuideResults(results);
      } catch (err) {
          const msg = handleApiError(err);
          setRoutingError(msg);
      } finally {
          setIsRouting(false);
      }
  }, [handleApiError, t]);

  const handleSelectRoute = useCallback((pageKey: PageKey) => {
      setPage(pageKey);
      setIsAIGuideOpen(false);
  }, []);

  const handleSaveLawyer = useCallback((lawyerToSave: Lawyer) => {
    setSavedLawyers(prevLawyers => {
      if (!prevLawyers.some(l => l.name === lawyerToSave.name && l.website === lawyerToSave.website)) {
        return [...prevLawyers, lawyerToSave];
      }
      return prevLawyers;
    });
  }, []);

  const handleRemoveLawyer = useCallback((lawyerToRemove: Lawyer) => {
    setSavedLawyers(prevLawyers => prevLawyers.filter(l => l.name !== lawyerToRemove.name || l.website !== lawyerToRemove.website));
  }, []);
  
  const handleClearAllSaved = useCallback(() => {
      if (window.confirm('Are you sure you want to clear all saved lawyers?')) {
          setSavedLawyers([]);
      }
  }, []);

  const handleNoteChange = useCallback((index: number, note: string) => {
    setSavedLawyers(prevLawyers => {
      const newLawyers = [...prevLawyers];
      newLawyers[index].notes = note;
      return newLawyers;
    });
  }, []);
  
  const handleLawyersFound = useCallback(async (newLawyers: Lawyer[]) => {
    try {
      await addLawyers(newLawyers);
      const updatedLawyers = await getAllLawyers();
      setAllLawyers(updatedLawyers);
    } catch (error) {
      console.error("Error saving or refreshing lawyers from DB", error);
    }
  }, []);

  const handleClearAllDbLawyers = useCallback(async () => {
    if (window.confirm('Are you sure you want to clear the entire lawyer directory? This will remove all discovered lawyers from your local database.')) {
        try {
            await clearAllLawyers();
            setAllLawyers([]);
        } catch (error) {
            console.error("Error clearing lawyer directory", error);
            alert("Failed to clear the lawyer directory.");
        }
    }
  }, []);


  // JSX to render
  const renderPage = () => {
    const isAssistantPage = ['legal_drafter', 'lawyer_finder', 'news_summarizer', 'case_strategist', 'notary_finder', 'web_analyzer'].includes(page);

    if (isAssistantPage) {
        return <LegalAssistantPage 
            page={page}
            setPage={setPage}
            handleGenerate={handleGenerate}
            generatedDocument={generatedDocument}
            isLoading={isLoading}
            error={error}
            isComplete={!isLoading && !!generatedDocument}
            topic={topic}
            description={description}
            docType={docType}
            setTopic={setTopic}
            setDescription={setDescription}
            setDocType={setDocType}
            savedLawyers={savedLawyers}
            handleSaveLawyer={handleSaveLawyer}
            handleRemoveLawyer={handleRemoveLawyer}
            handleClearAllSaved={handleClearAllSaved}
            handleNoteChange={handleNoteChange}
            lawyerFinderKeywords={lawyerFinderKeywords}
            setLawyerFinderKeywords={setLawyerFinderKeywords}
            allLawyers={allLawyers}
            onLawyersFound={handleLawyersFound}
            onClearAllDbLawyers={handleClearAllDbLawyers}
            handleFindNotaries={handleFindNotaries}
            notaryFinderKeywords={notaryFinderKeywords}
            setNotaryFinderKeywords={setNotaryFinderKeywords}
            foundNotaries={foundNotaries}
            isFindingNotaries={isFindingNotaries}
            notaryError={notaryError}
            handleSummarizeNews={handleSummarizeNews}
            newsQuery={newsQuery}
            setNewsQuery={setNewsQuery}
            newsSummary={newsSummary}
            newsSources={newsSources}
            isSummarizingNews={isSummarizingNews}
            newsError={newsError}
            handleAnalyzeWebPage={handleAnalyzeWebPage}
            webAnalyzerUrl={webAnalyzerUrl}
            setWebAnalyzerUrl={setWebAnalyzerUrl}
            webAnalyzerQuery={webAnalyzerQuery}
            setWebAnalyzerQuery={setWebAnalyzerQuery}
            webAnalyzerResult={webAnalyzerResult}
            webAnalyzerSources={webAnalyzerSources}
            isAnalyzingWeb={isAnalyzingWeb}
            webAnalyzerError={webAnalyzerError}
            handleGenerateStrategy={handleGenerateStrategy}
            strategyGoal={strategyGoal}
            setStrategyGoal={setStrategyGoal}
            strategyResult={strategyResult}
            isGeneratingStrategy={isGeneratingStrategy}
            strategyError={strategyError}
            onExecuteStrategyTask={handleExecuteStrategyTask}
            isExecutingStrategyTask={isExecutingStrategyTask}
            handleApiError={handleApiError}
            isQuotaExhausted={isQuotaExhausted}
        />;
    }

    return <HomePage setPage={setPage} onOpenAIGuide={() => setIsAIGuideOpen(true)} />;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <SiteHeader 
        currentPage={page}
        setPage={setPage} 
        checkpoints={checkpoints}
        onCreateCheckpoint={handleCreateCheckpoint}
        onRestoreCheckpoint={handleRestoreCheckpoint}
        onDeleteCheckpoint={handleDeleteCheckpoint}
        saveStatus={saveStatus}
      />
      <main>
        {renderPage()}
      </main>
      <SiteFooter />
      <QuotaErrorModal 
        isOpen={showQuotaErrorModal}
        onClose={() => setShowQuotaErrorModal(false)}
      />
      <AIGuideModal 
        isOpen={isAIGuideOpen}
        onClose={() => setIsAIGuideOpen(false)}
        onRoute={handleRouteIntent}
        onSelectRoute={handleSelectRoute}
        prompt={aiGuidePrompt}
        setPrompt={setAIGuidePrompt}
        results={aiGuideResults}
        isLoading={isRouting}
        error={routingError}
      />
    </div>
  );
};

export default App;