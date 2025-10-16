import React, { useState, useCallback, useMemo } from 'react';
import { findLawyers } from '../services/geminiService';
import { Lawyer } from '../types';
import { useLanguage } from '../types';
import { useAISuggestions, AISuggestionsDisplay } from './AISuggestions';

const parseMarkdownLink = (text: string): { url: string; title: string } => {
    const markdownMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(text);
    if (markdownMatch) {
        return { title: markdownMatch[1], url: markdownMatch[2].trim() };
    }
    const url = text.trim();
    if (url.includes('.') && !url.includes(' ')) {
        return { title: url, url: url.startsWith('http') ? url : `https://${url}` };
    }
    return { title: text.trim(), url: '' };
};

const parseLawyerTable = (markdown: string): Lawyer[] => {
    const lawyers: Lawyer[] = [];
    const tableStartIndex = markdown.indexOf('| Name');
    if (tableStartIndex === -1) {
        console.warn("Could not find a markdown table header in the AI response.");
        return [];
    }
    const tableMarkdown = markdown.substring(tableStartIndex);
    const rows = tableMarkdown.split('\n').map(row => row.trim()).filter(row => row.startsWith('|') && row.endsWith('|'));
    if (rows.length < 2) return [];

    const headers = rows[0].split('|').map(h => h.trim().toLowerCase()).slice(1, -1);
    const headerMap: { [key: string]: number } = {};
    headers.forEach((header, index) => {
        if (header.includes('name')) headerMap.name = index;
        if (header.includes('specialty')) headerMap.specialty = index;
        if (header.includes('city')) headerMap.city = index;
        if (header.includes('address')) headerMap.address = index;
        if (header.includes('contact')) headerMap.contactInfo = index;
        if (header.includes('website')) headerMap.website = index;
        if (header.includes('experience')) headerMap.yearsOfExperience = index;
        if (header.includes('relevance')) headerMap.relevanceScore = index;
    });
    
    if (headerMap.name === undefined || headerMap.website === undefined) {
        console.warn("Could not find essential 'Name' or 'Website' headers.");
        return [];
    }

    const dataRows = rows.slice(1).filter(row => !row.includes('---'));
    dataRows.forEach(row => {
        const columns = row.split('|').map(col => col.trim()).slice(1, -1);
        const name = columns[headerMap.name] ?? '';
        if (!name) return;

        const rawLink = columns[headerMap.website] ?? '';
        const linkData = parseMarkdownLink(rawLink);
        if (!linkData.url) return;

        const rawScore = headerMap.relevanceScore !== undefined ? columns[headerMap.relevanceScore] : '0';
        const relevanceScore = parseInt(rawScore?.replace('%', '').trim() || '0', 10);

        const rawExperience = headerMap.yearsOfExperience !== undefined ? columns[headerMap.yearsOfExperience] : '0';
        const yearsOfExperience = parseInt(rawExperience?.trim() || '0', 10);

        lawyers.push({
            name,
            specialty: columns[headerMap.specialty] ?? 'N/A',
            city: columns[headerMap.city] ?? 'N/A',
            address: columns[headerMap.address] ?? 'N/A',
            contactInfo: columns[headerMap.contactInfo] ?? 'N/A',
            website: linkData.url,
            websiteTitle: linkData.title,
            relevanceScore: isNaN(relevanceScore) ? 0 : relevanceScore,
            yearsOfExperience: isNaN(yearsOfExperience) ? 0 : yearsOfExperience,
        });
    });

    return lawyers;
};

interface LawyerFinderProps {
  savedLawyers: Lawyer[];
  onSaveLawyer: (lawyer: Lawyer) => void;
  onRemoveLawyer: (lawyer: Lawyer) => void;
  onClearAllSaved: () => void;
  onNoteChange: (index: number, note: string) => void;
  keywords: string;
  setKeywords: (value: string) => void;
  handleApiError: (err: unknown) => string;
  isQuotaExhausted: boolean;
  allLawyers: Lawyer[];
  onLawyersFound: (lawyers: Lawyer[]) => void;
  onClearAllDbLawyers: () => void;
}

type SortKey = 'relevanceScore' | 'city' | 'experience_desc' | 'city_specialty';

const LawyerFinder: React.FC<LawyerFinderProps> = ({ 
    savedLawyers,
    onSaveLawyer,
    onRemoveLawyer,
    onClearAllSaved,
    onNoteChange,
    keywords,
    setKeywords,
    handleApiError,
    isQuotaExhausted,
    allLawyers,
    onLawyersFound,
    onClearAllDbLawyers
}) => {
    const { t } = useLanguage();
    const [maxResults, setMaxResults] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [rawTextResult, setRawTextResult] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<SortKey>('relevanceScore');
    const [cityFilter, setCityFilter] = useState<string>('');
    const [specialtyFilter, setSpecialtyFilter] = useState<string>('');
    const [minExperienceFilter, setMinExperienceFilter] = useState<string>('');
    
    const [isKeywordsFocused, setIsKeywordsFocused] = useState(false);
    const { suggestions, isLoading: areSuggestionsLoading, setSuggestions } = useAISuggestions(
        keywords,
        "Suggest common legal specialties or issues for finding a lawyer in Iran",
        !isQuotaExhausted && isKeywordsFocused
    );

    const handleSuggestionSelect = (suggestion: string) => {
        setKeywords(suggestion);
        setSuggestions([]);
    };

    const handleUseExample = () => {
        setKeywords(t('lawyerFinder.example.keywords'));
    };

    const handleSearch = async () => {
        if (!keywords.trim()) {
            setError(t('lawyerFinder.validationError'));
            return;
        }
        setError(null);
        setRawTextResult(null);
        setIsLoading(true);

        const prompt = t('lawyerFinder.prompt')
            .replace('{queries}', keywords)
            .replace('{maxResults}', maxResults.toString());

        try {
            const searchResult = await findLawyers(prompt);
            const parsed = parseLawyerTable(searchResult.text);
            
            if (parsed.length > 0) {
                onLawyersFound(parsed);
            } else if (searchResult.text) {
                setRawTextResult(searchResult.text);
            }
        } catch (err) {
            const msg = handleApiError(err);
            setError(msg);
        } finally { setIsLoading(false); }
    };
    
    const isLawyerSaved = useCallback((lawyer: Lawyer): boolean => {
        return savedLawyers.some(l => l.name === lawyer.name && l.website === lawyer.website);
    }, [savedLawyers]);

    const sortedLawyers = useMemo(() => {
        const filtered = allLawyers.filter(lawyer => {
            const cityLower = cityFilter.toLowerCase();
            const specialtyLower = specialtyFilter.toLowerCase();
            const minExp = parseInt(minExperienceFilter, 10);

            const lawyerCityLower = lawyer.city?.toLowerCase() || '';
            const lawyerSpecialtyLower = lawyer.specialty?.toLowerCase() || '';

            const cityMatch = !cityLower || lawyerCityLower.includes(cityLower);
            const specialtyMatch = !specialtyLower || lawyerSpecialtyLower.includes(specialtyLower);
            const experienceMatch = isNaN(minExp) || (lawyer.yearsOfExperience ?? 0) >= minExp;

            return cityMatch && specialtyMatch && experienceMatch;
        });

        return [...filtered].sort((a, b) => {
            switch (sortKey) {
                case 'relevanceScore': 
                    return (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
                case 'city': 
                    return (a.city ?? '').localeCompare(b.city ?? '');
                case 'experience_desc':
                    return (b.yearsOfExperience ?? 0) - (a.yearsOfExperience ?? 0);
                case 'city_specialty':
                    const cityCompare = (a.city ?? '').localeCompare(b.city ?? '');
                    if (cityCompare !== 0) return cityCompare;
                    return (a.specialty ?? '').localeCompare(b.specialty ?? '');
                default: 
                    return 0;
            }
        });
    }, [allLawyers, sortKey, cityFilter, specialtyFilter, minExperienceFilter]);

    return (
        <section id="lawyer-finder" className="py-16 sm:py-24 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">{t('lawyerFinder.title')}</h2>
                <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{t('lawyerFinder.subtitle')}</p>
            </div>

            <div className="max-w-3xl mx-auto bg-gray-800/50 rounded-lg p-8 shadow-lg backdrop-blur-sm border border-gray-700 space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="keywords-prompt" className="block text-sm font-medium text-gray-300">{t('lawyerFinder.keywordsLabel')}</label>
                        <button type="button" onClick={handleUseExample} className="text-xs text-blue-400 hover:underline focus:outline-none">
                            {t('generatorForm.useExample')}
                        </button>
                    </div>
                    <div className="relative">
                        <textarea id="keywords-prompt" rows={3} value={keywords} onChange={(e) => setKeywords(e.target.value)}
                            onFocus={() => setIsKeywordsFocused(true)}
                            onBlur={() => setIsKeywordsFocused(false)}
                            autoComplete="off"
                            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                            placeholder={t('lawyerFinder.keywordsPlaceholder')} />
                        {isKeywordsFocused && (
                            <AISuggestionsDisplay
                                suggestions={suggestions}
                                isLoading={areSuggestionsLoading}
                                onSelect={handleSuggestionSelect}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <label htmlFor="max-results" className="block text-sm font-medium text-gray-300">{t('lawyerFinder.maxResults')} ({maxResults})</label>
                    <input id="max-results" type="range" min="5" max="25" step="5" value={maxResults} onChange={(e) => setMaxResults(Number(e.target.value))}
                        className="mt-1 block w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                    <button onClick={handleSearch} disabled={isLoading || !keywords.trim() || isQuotaExhausted}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                        {isLoading ? t('lawyerFinder.finding') : isQuotaExhausted ? t('quotaErrorModal.title') : t('lawyerFinder.findButton')}
                    </button>
                </div>
            </div>
            
            {savedLawyers.length > 0 && (
                <div className="mt-12 space-y-8 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-white">{t('lawyerFinder.savedTitle')}</h3>
                        <button onClick={onClearAllSaved} className="px-3 py-1 bg-red-800/70 hover:bg-red-700 text-white text-sm font-semibold rounded-md transition-colors">{t('lawyerFinder.clearAll')}</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedLawyers.map((lawyer, index) => (
                            <div key={`${lawyer.website}-${index}`} className="bg-gray-800/50 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700 p-6 flex flex-col">
                                <a href={lawyer.website} target="_blank" rel="noopener noreferrer" className="hover:underline"><h4 className="text-lg font-bold text-teal-300">{lawyer.name}</h4></a>
                                <p className="text-sm text-gray-400 mb-2">{lawyer.specialty} - {lawyer.city}</p>
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <label htmlFor={`notes-${index}`} className="block text-sm font-medium text-gray-300 mb-2">{t('lawyerFinder.notesLabel')}</label>
                                    <textarea id={`notes-${index}`} rows={3}
                                        className="w-full bg-gray-900 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white transition-colors"
                                        placeholder={t('lawyerFinder.notesPlaceholder')} value={lawyer.notes || ''} onChange={(e) => onNoteChange(index, e.target.value)} />
                                </div>
                                <div className="mt-6">
                                     <button onClick={() => onRemoveLawyer(lawyer)} className="w-full text-center bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">{t('lawyerFinder.remove')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-12 space-y-8">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white">{t('lawyerFinder.crateTitle')}</h3>
                        <p className="text-sm text-gray-400">{t('lawyerFinder.crateSubtitle')}</p>
                    </div>
                     <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        ✨ {t('lawyerFinder.semanticSearchBadge')}
                    </div>
                    {allLawyers.length > 0 &&
                        <button onClick={onClearAllDbLawyers} className="px-3 py-1 bg-red-800/70 hover:bg-red-700 text-white text-sm font-semibold rounded-md transition-colors">{t('lawyerFinder.clearCrate')}</button>
                    }
                </div>

                {isLoading && (
                    <div className="text-center p-8"><div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-400 mx-auto"></div></div>
                )}
                {error && !error.includes('(Quota Exceeded)') && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
                
                {!isLoading && (
                    <div className="space-y-6">
                        {allLawyers.length > 0 ? (
                            <>
                                {/* Filter & Sort Controls */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end bg-gray-800/25 p-4 rounded-lg border border-gray-700">
                                    {/* City Filter */}
                                    <div>
                                        <label htmlFor="city-filter" className="block text-sm font-medium text-gray-400">{t('lawyerFinder.filterByCity')}</label>
                                        <input id="city-filter" type="text" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} placeholder="..."
                                            className="mt-1 w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                                        />
                                    </div>
                                    {/* Specialty Filter */}
                                    <div>
                                        <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-400">{t('lawyerFinder.filterBySpecialty')}</label>
                                        <input id="specialty-filter" type="text" value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} placeholder="..."
                                            className="mt-1 w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                                        />
                                    </div>
                                     {/* Experience Filter */}
                                    <div>
                                        <label htmlFor="experience-filter" className="block text-sm font-medium text-gray-400">{t('lawyerFinder.filterByExperience')}</label>
                                        <input id="experience-filter" type="number" min="0" value={minExperienceFilter} onChange={(e) => setMinExperienceFilter(e.target.value)} placeholder="e.g., 5"
                                            className="mt-1 w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                                        />
                                    </div>
                                    {/* Sort Dropdown */}
                                    <div className="flex justify-end">
                                        <div>
                                            <label htmlFor="sort-key" className="block text-sm font-medium text-gray-400 text-right">{t('lawyerFinder.sortBy')}:</label>
                                            <select id="sort-key" value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}
                                                className="mt-1 bg-gray-700 border-gray-600 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white">
                                                <option value="relevanceScore">{t('lawyerFinder.sort.relevance')}</option>
                                                <option value="experience_desc">{t('lawyerFinder.sort.experience_desc')}</option>
                                                <option value="city_specialty">{t('lawyerFinder.sort.city_specialty')}</option>
                                                <option value="city">{t('lawyerFinder.sort.city')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Results Grid */}
                                {sortedLawyers.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {sortedLawyers.map((lawyer) => (
                                            <div key={lawyer.website} className="bg-gray-800/50 rounded-lg p-6 flex flex-col border border-gray-700">
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="text-lg font-bold text-teal-300 truncate pr-2" title={lawyer.name}>{lawyer.name}</h4>
                                                        {lawyer.yearsOfExperience !== undefined && lawyer.yearsOfExperience > 0 && (
                                                            <div className="text-sm text-gray-300 bg-gray-700 px-2 py-1 rounded-md flex-shrink-0">{lawyer.yearsOfExperience} years</div>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-400 mb-3">{lawyer.specialty} - {lawyer.city}</p>
                                                    <div className="space-y-2 text-sm">
                                                        <p><strong className="text-gray-300">{t('lawyerFinder.address')}:</strong> {lawyer.address}</p>
                                                        <p><strong className="text-gray-300">{t('lawyerFinder.contact')}:</strong> {lawyer.contactInfo}</p>
                                                        <a href={lawyer.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block truncate">{lawyer.websiteTitle}</a>
                                                    </div>
                                                </div>
                                                <div className="mt-6 pt-4 border-t border-gray-700">
                                                    <button onClick={() => onSaveLawyer(lawyer)} disabled={isLawyerSaved(lawyer)} className="w-full text-center font-semibold py-2 px-4 rounded-md transition-colors bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed">{isLawyerSaved(lawyer) ? t('lawyerFinder.saved') : t('lawyerFinder.save')}</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-10 bg-gray-800/30 rounded-lg"><p>{t('lawyerFinder.noFilterResults')}</p></div>
                                )}
                            </>
                        ) : (
                            rawTextResult ? (
                                <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
                                    <h4 className="font-semibold text-white mb-2">{t('lawyerFinder.parseErrorTitle')}</h4>
                                    <pre className="whitespace-pre-wrap bg-gray-900/50 p-4 rounded-md text-sm text-gray-300">{rawTextResult}</pre>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-10 bg-gray-800/30 rounded-lg"><p>{t('lawyerFinder.crateEmpty')}</p></div>
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LawyerFinder;