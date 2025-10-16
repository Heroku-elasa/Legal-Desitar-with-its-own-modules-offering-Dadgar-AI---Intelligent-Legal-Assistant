import React, { useState, useMemo } from 'react';
import { Notary, useLanguage } from '../types';
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

const parseNotaryTable = (markdown: string): Notary[] => {
    const notaries: Notary[] = [];
    const tableStartIndex = markdown.indexOf('| Office Name');
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
        if (header.includes('office name')) headerMap.officeName = index;
        if (header.includes('city')) headerMap.city = index;
        if (header.includes('address')) headerMap.address = index;
        if (header.includes('contact')) headerMap.contactInfo = index;
        if (header.includes('website')) headerMap.website = index;
        if (header.includes('services')) headerMap.services = index;
    });
    
    if (headerMap.officeName === undefined) {
        console.warn("Could not find essential 'Office Name' header.");
        return [];
    }

    const dataRows = rows.slice(1).filter(row => !row.includes('---'));
    dataRows.forEach(row => {
        const columns = row.split('|').map(col => col.trim()).slice(1, -1);
        const officeName = columns[headerMap.officeName] ?? '';
        if (!officeName) return;

        const rawLink = headerMap.website !== undefined ? columns[headerMap.website] : '';
        const linkData = parseMarkdownLink(rawLink ?? '');

        notaries.push({
            officeName,
            city: columns[headerMap.city] ?? 'N/A',
            address: columns[headerMap.address] ?? 'N/A',
            contactInfo: columns[headerMap.contactInfo] ?? 'N/A',
            website: linkData.url,
            websiteTitle: linkData.title,
            services: headerMap.services !== undefined ? columns[headerMap.services] : undefined,
        });
    });

    return notaries;
};


interface NotaryFinderProps {
  onSearch: (query: string) => Promise<string | null>;
  keywords: string;
  setKeywords: (value: string) => void;
  results: Notary[]; // This prop seems unused, internal state manages display
  isLoading: boolean;
  error: string | null;
  isQuotaExhausted: boolean;
}

type SortKey = 'officeName' | 'city';

const NotaryFinder: React.FC<NotaryFinderProps> = ({ 
    onSearch, keywords, setKeywords, isLoading, error, isQuotaExhausted 
}) => {
    const { t } = useLanguage();
    const [rawTextResult, setRawTextResult] = useState<string | null>(null);
    const [parsedResults, setParsedResults] = useState<Notary[]>([]);
    
    // State for filtering and sorting
    const [cityFilter, setCityFilter] = useState<string>('');
    const [officeNameFilter, setOfficeNameFilter] = useState<string>('');
    const [serviceFilter, setServiceFilter] = useState<string>('');
    const [sortKey, setSortKey] = useState<SortKey>('officeName');

    const [isKeywordsFocused, setIsKeywordsFocused] = useState(false);
    const { suggestions, isLoading: areSuggestionsLoading, setSuggestions } = useAISuggestions(
        keywords,
        "Suggest common services provided by a Notary Public office in Iran",
        !isQuotaExhausted && isKeywordsFocused
    );

    const handleSuggestionSelect = (suggestion: string) => {
        setKeywords(suggestion);
        setSuggestions([]);
    };
    
    const handleUseExample = () => {
        setKeywords(t('notaryFinder.example.keywords'));
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!keywords.trim()) {
            alert(t('notaryFinder.validationError'));
            return;
        }
        setRawTextResult(null);
        setParsedResults([]);
        
        const resultText = await onSearch(keywords);

        if (resultText) {
            const parsed = parseNotaryTable(resultText);
            if (parsed.length > 0) {
                setParsedResults(parsed);
            } else {
                setRawTextResult(resultText);
            }
        }
    };

    const filteredAndSortedResults = useMemo(() => {
        const filtered = parsedResults.filter(notary => {
            const cityLower = cityFilter.toLowerCase();
            const nameLower = officeNameFilter.toLowerCase();
            const serviceLower = serviceFilter.toLowerCase();
            
            const notaryCityLower = notary.city?.toLowerCase() || '';
            const notaryNameLower = notary.officeName?.toLowerCase() || '';
            const notaryServicesLower = notary.services?.toLowerCase() || '';

            const cityMatch = !cityLower || notaryCityLower.includes(cityLower);
            const nameMatch = !nameLower || notaryNameLower.includes(nameLower);
            const serviceMatch = !serviceLower || notaryServicesLower.includes(serviceLower);

            return cityMatch && nameMatch && serviceMatch;
        });

        return [...filtered].sort((a, b) => {
            switch(sortKey) {
                case 'city':
                    return (a.city ?? '').localeCompare(b.city ?? '');
                case 'officeName':
                default:
                    return (a.officeName ?? '').localeCompare(b.officeName ?? '');
            }
        });

    }, [parsedResults, cityFilter, officeNameFilter, serviceFilter, sortKey]);
    
    return (
        <section id="notary-finder" className="py-12 sm:py-16">
            <div className="max-w-4xl mx-auto">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">{t('notaryFinder.title')}</h2>
                    <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{t('notaryFinder.subtitle')}</p>
                </div>

                <div className="mt-10 bg-gray-800/50 rounded-lg p-8 shadow-lg backdrop-blur-sm border border-gray-700">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="notary-keywords" className="block text-sm font-medium text-gray-300">{t('notaryFinder.keywordsLabel')}</label>
                                <button type="button" onClick={handleUseExample} className="text-xs text-blue-400 hover:underline focus:outline-none">
                                    {t('generatorForm.useExample')}
                                </button>
                            </div>
                            <div className="relative">
                                <textarea
                                    id="notary-keywords"
                                    rows={3}
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    onFocus={() => setIsKeywordsFocused(true)}
                                    onBlur={() => setIsKeywordsFocused(false)}
                                    autoComplete="off"
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                                    placeholder={t('notaryFinder.keywordsPlaceholder')}
                                />
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
                             <button
                                type="submit"
                                disabled={isLoading || isQuotaExhausted}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? t('notaryFinder.finding') : isQuotaExhausted ? t('quotaErrorModal.title') : t('notaryFinder.findButton')}
                            </button>
                        </div>
                    </form>
                </div>

                 {(isLoading || error || parsedResults.length > 0 || rawTextResult) && (
                    <div className="mt-10 animate-fade-in">
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-white">{t('notaryFinder.resultsTitle')}</h3>
                        </div>
                        <div className="space-y-6">
                            {isLoading && (
                                <div className="flex items-center justify-center py-8">
                                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
                                    <span className="ml-3 text-gray-400">{t('notaryFinder.finding')}</span>
                                </div>
                            )}
                            {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
                            
                            {parsedResults.length > 0 && (
                                <>
                                 {/* Filter & Sort Controls */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end bg-gray-800/25 p-4 rounded-lg border border-gray-700">
                                    <div>
                                        <label htmlFor="notary-city-filter" className="block text-sm font-medium text-gray-400">{t('notaryFinder.filterByCity')}</label>
                                        <input id="notary-city-filter" type="text" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} placeholder="..."
                                            className="mt-1 w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="notary-name-filter" className="block text-sm font-medium text-gray-400">{t('notaryFinder.filterByOfficeName')}</label>
                                        <input id="notary-name-filter" type="text" value={officeNameFilter} onChange={(e) => setOfficeNameFilter(e.target.value)} placeholder="..."
                                            className="mt-1 w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="notary-service-filter" className="block text-sm font-medium text-gray-400">{t('notaryFinder.filterByService')}</label>
                                        <input id="notary-service-filter" type="text" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} placeholder="..."
                                            className="mt-1 w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <div>
                                            <label htmlFor="notary-sort-key" className="block text-sm font-medium text-gray-400 text-right">{t('notaryFinder.sortBy')}:</label>
                                            <select id="notary-sort-key" value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}
                                                className="mt-1 bg-gray-700 border-gray-600 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white">
                                                <option value="officeName">{t('notaryFinder.sort.officeName')}</option>
                                                <option value="city">{t('notaryFinder.sort.city')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {filteredAndSortedResults.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {filteredAndSortedResults.map((notary, index) => (
                                            <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                                                <h4 className="text-lg font-bold text-teal-300 truncate" title={notary.officeName}>{notary.officeName}</h4>
                                                <p className="text-sm text-gray-400 mb-3">{notary.city}</p>
                                                <div className="space-y-2 text-sm">
                                                    <p><strong className="text-gray-300">{t('notaryFinder.address')}:</strong> {notary.address}</p>
                                                    <p><strong className="text-gray-300">{t('notaryFinder.contact')}:</strong> {notary.contactInfo}</p>
                                                    {notary.services && <p><strong className="text-gray-300">{t('notaryFinder.services')}:</strong> {notary.services}</p>}
                                                    {notary.website && (
                                                        <a href={notary.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block truncate">{notary.websiteTitle}</a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-10 bg-gray-800/30 rounded-lg"><p>{t('notaryFinder.noFilterResults')}</p></div>
                                )}
                                </>
                            )}

                            {rawTextResult && (
                                <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
                                    <h4 className="font-semibold text-white mb-2">{t('notaryFinder.parseErrorTitle')}</h4>
                                    <p className="text-sm text-gray-400 mb-4">{t('notaryFinder.parseErrorSubtitle')}</p>
                                    <pre className="whitespace-pre-wrap bg-gray-900/50 p-4 rounded-md text-sm text-gray-300">{rawTextResult}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                 )}
            </div>
        </section>
    );
}

export default NotaryFinder;