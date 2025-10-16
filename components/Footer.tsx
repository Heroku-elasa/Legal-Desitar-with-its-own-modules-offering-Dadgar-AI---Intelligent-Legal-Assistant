import React from 'react';
import { useLanguage } from '../types';

const SiteFooter: React.FC = () => {
    const { t } = useLanguage();
    const quickLinks: { text: string; link: string }[] = t('footer.quickLinks');

    return (
        <footer id="footer" className="bg-gray-900 text-gray-400 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Column 1: Logo & Description */}
                    <div className="space-y-4 md:col-span-1">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                             <svg className="h-8 w-8 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52v16.5m-1.5-16.5v16.5m-3-16.5v16.5m-1.5-16.5v16.5m-3-16.5v16.5m-1.5-16.5v16.5M5.25 4.97c-1.01.143-2.01.317-3 .52m3-.52v16.5m1.5-16.5v16.5m3-16.5v16.5m1.5-16.5v16.5m3-16.5v16.5m1.5-16.5v16.5" />
                            </svg>
                            <span className="font-bold text-xl text-white">دادگر AI</span>
                        </div>
                        <p className="text-sm leading-relaxed">{t('footer.description')}</p>
                    </div>
                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white border-b-2 border-gray-700 pb-2">{t('footer.quickLinksTitle')}</h2>
                        <ul className="space-y-2 text-sm columns-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.link} className="hover:text-white transition-colors">{link.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Column 3: Contact Info */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white border-b-2 border-gray-700 pb-2">{t('footer.contactTitle')}</h2>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <span className="mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0">📧</span>
                                <a href={`mailto:${t('footer.email')}`} className="hover:text-white transition-colors font-inter">{t('footer.email')}</a>
                            </li>
                            <li className="flex items-start">
                                <span className="mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0">📍</span>
                                <span>{t('footer.address')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-black py-4 mt-8 border-t border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
                    <p>{t('footer.copyright')}</p>
                    <div className="mt-2 text-gray-500 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0">
                        <span>{t('footer.madeBy')}</span>
                        <span className="hidden sm:inline">|</span>
                        <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">{t('footer.poweredBy')}</a>
                         <span className="hidden sm:inline">|</span>
                        <span className="inline-flex items-center space-x-1 rtl:space-x-reverse opacity-70 cursor-not-allowed" title="Repository is private">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                            <span>{t('footer.viewOnGitHub')}</span>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;