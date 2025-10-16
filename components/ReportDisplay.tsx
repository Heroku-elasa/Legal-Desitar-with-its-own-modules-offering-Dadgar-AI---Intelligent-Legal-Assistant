import React, { useRef, useEffect, useState, useMemo } from 'react';
import { marked } from 'marked';
import { useLanguage } from '../types';

interface DocumentDisplayProps {
  generatedDocument: string;
  isLoading: boolean;
  error: string | null;
}

const getDocumentStyles = () => `
    @font-face {
        font-family: 'Iransans';
        font-weight: 400;
        src: url('https://sevinsazeh.com/wp-content/uploads/2024/03/IRANSansWebFaNum.woff2') format('woff2'),
             url('https://sevinsazeh.com/wp-content/uploads/2024/03/IRANSansWebFaNum.woff') format('woff');
    }
    @font-face {
        font-family: 'Iransans';
        font-weight: 700;
        src: url('https://sevinsazeh.com/wp-content/uploads/2024/03/IRANSansWebFaNum_Bold.woff2') format('woff2'),
             url('https://sevinsazeh.com/wp-content/uploads/2024/03/IRANSansWebFaNum_Bold.woff') format('woff');
    }
    body { font-family: 'Iransans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.8; background-color: #f3f4f6; padding: 2rem; margin: 0; color: #111827; }
    .document-page { background-color: #ffffff; color: #111827; padding: 2.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); max-width: 8.5in; min-height: 10in; margin: 0 auto; }
    .document-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 2rem; }
    .document-logo { display: flex; align-items: center; gap: 0.75rem; }
    .document-logo svg { height: 2.5rem; width: 2.5rem; color: #3b82f6; }
    .document-logo span { font-size: 1.125rem; font-weight: 700; color: #374151; }
    .document-header-info { text-align: right; font-size: 0.875rem; color: #4b5563; }
    body[dir="rtl"] .document-header-info { text-align: left; }
    .document-body { color: #111827; max-width: none; }
    .document-body h1, .document-body h2, .document-body h3, .document-body h4 { color: #111827; font-family: 'Iransans', 'Inter', sans-serif; }
    .document-body p, .document-body li { color: #374151; line-height: 2; }
    body[dir="rtl"] { direction: rtl; }
    body[dir="rtl"] .document-body { text-align: right; }
    body[dir="rtl"] .document-body p, body[dir="rtl"] .document-body li { text-align: justify; }
    h1, h2 { border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    code { font-family: monospace; background-color: #f4f4f4; padding: 0.2em 0.4em; border-radius: 3px; }
    pre { background-color: #f4f4f4; padding: 1em; border-radius: 5px; overflow-x: auto; text-align: left; direction: ltr; }
    pre code { background-color: transparent; padding: 0; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    body[dir="ltr"] td { text-align: left; }
    body[dir="rtl"] td { text-align: right; }
    th { background-color: #f2f2f2; }
    blockquote { color: #666; margin: 0; padding-inline-start: 1em; border-inline-start: 0.25em solid #dfe2e5; }
    ul { padding-inline-start: 20px; }
`;

const DocumentDisplay: React.FC<DocumentDisplayProps> = ({ generatedDocument, isLoading, error }) => {
  const { t, language } = useLanguage();
  const endOfReportRef = useRef<HTMLDivElement>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const [reportHtml, setReportHtml] = useState('');
  const currentDate = useMemo(() => new Date().toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US'), [language]);

  const isComplete = !isLoading && generatedDocument.length > 0 && !error;

  useEffect(() => {
    if (isLoading) {
      endOfReportRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [generatedDocument, isLoading]);

  useEffect(() => {
    let isMounted = true;
    const parseMarkdown = async () => {
      if (generatedDocument) {
        const html = await marked.parse(generatedDocument);
        if (isMounted) setReportHtml(html);
      } else {
        if (isMounted) setReportHtml('');
      }
    };
    parseMarkdown();
    return () => { isMounted = false; };
  }, [generatedDocument]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const downloadFile = (filename: string, content: string | Blob | ArrayBuffer, mimeType: string) => {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDocument);
    setIsExportMenuOpen(false);
  };
  
  const handleDownloadMD = () => {
    downloadFile('document.md', generatedDocument, 'text/markdown;charset=utf-8');
    setIsExportMenuOpen(false);
  };

  const handleDownloadDOCX = async () => {
    const reportHtmlString = await createHtmlContent(generatedDocument);
    try {
      const htmlToDocxModule = await import('html-to-docx');
      const htmlToDocx = htmlToDocxModule.default;
      
      if (typeof htmlToDocx !== 'function') {
        console.error('Failed to load html-to-docx function', htmlToDocxModule);
        throw new Error('Could not convert to DOCX. The library did not load correctly.');
      }

      const docxBlob = await htmlToDocx(reportHtmlString, '', {
        margins: { top: 720, right: 720, bottom: 720, left: 720 }
      });
      downloadFile('document.docx', docxBlob, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    } catch (e) {
      console.error("Error converting HTML to DOCX:", e);
      alert(e instanceof Error ? e.message : "An error occurred while trying to generate the DOCX file.");
    }
    setIsExportMenuOpen(false);
  };
  
  const createHtmlContent = async (markdownContent: string) => {
    const parsedHtml = await marked.parse(markdownContent);
    const styles = getDocumentStyles();
    const dir = language === 'fa' ? 'rtl' : 'ltr';
    const lang = language;

    return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <title>${t('reportDisplay.docTitle')}</title>
  <style>${styles}</style>
</head>
<body dir="${dir}">
  <div class="document-page">
    <div class="document-header">
        <div class="document-logo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52v16.5m-1.5-16.5v16.5m-3-16.5v16.5m-1.5-16.5v16.5m-3-16.5v16.5m-1.5-16.5v16.5M5.25 4.97c-1.01.143-2.01.317-3 .52m3-.52v16.5m1.5-16.5v16.5m3-16.5v16.5m1.5-16.5v16.5m3-16.5v16.5m1.5-16.5v16.5" />
            </svg>
            <span class="font-bold">${t('reportDisplay.headerTitle')}</span>
        </div>
        <div class="document-header-info">
            <p><strong>${t('reportDisplay.headerDate')}:</strong> ${currentDate}</p>
            <p><strong>${t('reportDisplay.headerCaseNo')}:</strong> ${t('reportDisplay.caseNoPlaceholder')}</p>
        </div>
    </div>
    <div class="document-body">
      ${parsedHtml}
    </div>
  </div>
</body>
</html>`;
  };

  const handleDownloadHTML = async () => {
    const htmlContent = await createHtmlContent(generatedDocument);
    downloadFile('document.html', htmlContent, 'text/html;charset=utf-8');
    setIsExportMenuOpen(false);
  };

  const handlePrint = async () => {
    const htmlContent = await createHtmlContent(generatedDocument);
    const printWindow = window.open('', '_blank');
    if(printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
    setIsExportMenuOpen(false);
  };

  return (
    <div className="min-h-[60vh] flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center" key={isComplete ? 'complete' : 'pending'}>
          {isComplete && (
            <svg className="h-5 w-5 text-green-400 ml-2 animate-fade-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {t('reportDisplay.title')}
        </h3>
        {isComplete && (
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setIsExportMenuOpen(prev => !prev)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md transition-colors flex items-center"
            >
              {t('reportDisplay.export')}
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isExportMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-20 border border-gray-600">
                <ul className="py-1 text-white">
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={handleCopy}>{t('reportDisplay.copy')}</li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={handleDownloadMD}>{t('reportDisplay.downloadMD')}</li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={handleDownloadDOCX}>{t('reportDisplay.downloadDOCX')}</li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={handleDownloadHTML}>{t('reportDisplay.downloadHTML')}</li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={handlePrint}>{t('reportDisplay.printPDF')}</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex-grow overflow-y-auto bg-gray-700 p-4 sm:p-8">
        <div className="document-page">
          {!isLoading && !error && isComplete && (
            <div className="document-header animate-fade-in">
                <div className="document-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52v16.5m-1.5-16.5v16.5m-3-16.5v16.5m-1.5-16.5v16.5m-3-16.5v16.5m-1.5-16.5v16.5M5.25 4.97c-1.01.143-2.01.317-3 .52m3-.52v16.5m1.5-16.5v16.5m3-16.5v16.5m1.5-16.5v16.5m3-16.5v16.5m1.5-16.5v16.5" />
                    </svg>
                    <span>{t('reportDisplay.headerTitle')}</span>
                </div>
                <div className="document-header-info">
                    <p><strong>{t('reportDisplay.headerDate')}:</strong> {currentDate}</p>
                    <p><strong>{t('reportDisplay.headerCaseNo')}:</strong> {t('reportDisplay.caseNoPlaceholder')}</p>
                </div>
            </div>
          )}

          <div className="document-body">
            {error && <div className="text-red-500 p-4 bg-red-100 rounded-md">{error}</div>}
            
            <div dangerouslySetInnerHTML={{ __html: reportHtml }} />

            {isLoading && (
              <div className="flex items-center justify-center pt-4">
                <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-blue-400"></div>
                <span className="ml-2 text-gray-500">{t('reportDisplay.generating')}</span>
              </div>
            )}

            {!isLoading && !generatedDocument && !error && (
                <div className="text-center text-gray-500 py-16">
                    <p>{t('reportDisplay.placeholder1')}</p>
                    <p>{t('reportDisplay.placeholder2')}</p>
                </div>
            )}
            <div ref={endOfReportRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDisplay;