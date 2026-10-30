import React, { useState, useRef, useEffect } from 'react';
import { PageTemplate, PageBorder, DocumentImage, PageSize, PageOrientation } from './types';
import { PAGE_TEMPLATES } from './data/templates';
import { Toolbar } from './components/Toolbar';
import { PageEditor } from './components/PageEditor';
import { TemplatePickerModal } from './components/TemplatePickerModal';
import { ImageModal } from './components/ImageModal';
import { BorderModal } from './components/BorderModal';
import { ExportModal } from './components/ExportModal';
import { exportElementToPDF, triggerPrintPDF } from './utils/pdfGenerator';
import { 
  FileText, Download, Printer, LayoutTemplate, 
  Settings, Sparkles, Check, HelpCircle
} from 'lucide-react';

export default function App() {
  // Active template & document state
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate>(PAGE_TEMPLATES[0]); // default Blank
  const [documentTitle, setDocumentTitle] = useState<string>('Document1');
  const [content, setContent] = useState<string>(PAGE_TEMPLATES[0].initialContent);
  const [backgroundColor, setBackgroundColor] = useState<string>(PAGE_TEMPLATES[0].backgroundColor);
  const [textColor, setTextColor] = useState<string>(PAGE_TEMPLATES[0].textColor);
  const [fontFamily, setFontFamily] = useState<string>(PAGE_TEMPLATES[0].fontFamily);
  const [fontSize, setFontSize] = useState<number>(11);
  const [border, setBorder] = useState<PageBorder>(PAGE_TEMPLATES[0].border);
  const [pageSize, setPageSize] = useState<PageSize>('a4');
  const [orientation, setOrientation] = useState<PageOrientation>('portrait');
  const [images, setImages] = useState<DocumentImage[]>([]);
  const [zoom, setZoom] = useState<number>(100);

  // Modals state
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isBorderModalOpen, setIsBorderModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Refs for editor and printable page DOM
  const editorRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Calculate live word & char count
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
      setCharCount(text.length);
    }
  }, [content]);

  // Handle template selection
  const handleSelectTemplate = (template: PageTemplate) => {
    setSelectedTemplate(template);
    setContent(template.initialContent);
    setBackgroundColor(template.backgroundColor);
    setTextColor(template.textColor);
    setFontFamily(template.fontFamily);
    setBorder(template.border);
    setIsTemplateModalOpen(false);

    if (editorRef.current) {
      editorRef.current.innerHTML = template.initialContent;
    }
  };

  // Rich text formatting execution
  const executeFormat = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // Insert heading tag
  const handleInsertHeading = (tag: 'h1' | 'h2' | 'h3' | 'p') => {
    document.execCommand('formatBlock', false, tag);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // Insert new paragraph
  const handleInsertParagraph = () => {
    if (editorRef.current) {
      const p = document.createElement('p');
      p.innerHTML = 'Enter your text here...';
      editorRef.current.appendChild(p);
      setContent(editorRef.current.innerHTML);
      // focus and select
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(p);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  // Insert decorative banner title
  const handleInsertDecorativeTitle = () => {
    if (editorRef.current) {
      const banner = document.createElement('div');
      banner.style.background = 'linear-gradient(135deg, #185abd, #0284c7)';
      banner.style.color = '#ffffff';
      banner.style.padding = '18px 24px';
      banner.style.borderRadius = '6px';
      banner.style.marginBottom = '16px';
      banner.innerHTML = `<h1 style="color: white; margin: 0; font-size: 24pt;">MODERN DOCUMENT TITLE</h1><p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 10pt;">Subtitle / Organization Name</p>`;
      editorRef.current.prepend(banner);
      setContent(editorRef.current.innerHTML);
    }
  };

  // Image actions
  const handleInsertImage = (newImage: DocumentImage) => {
    setImages(prev => [...prev, newImage]);
  };

  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleUpdateImageWidth = (id: string, newWidth: number) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, width: newWidth } : img));
  };

  // PDF Export
  const handleDownloadPDF = async (filename: string, size: PageSize, quality: number) => {
    if (!pageContainerRef.current) return false;
    return await exportElementToPDF(pageContainerRef.current, {
      filename: filename || documentTitle || 'azeem-document.pdf',
      pageSize: size,
      orientation: orientation,
      quality: quality,
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 font-sans overflow-hidden">
      {/* Top Application Bar: Office Branding & Actions */}
      <header className="no-print bg-[#185abd] text-white px-4 py-2 flex items-center justify-between shadow-sm z-40 select-none">
        <div className="flex items-center gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white text-[#185abd] rounded flex items-center justify-center font-bold text-sm shadow-xs">
              <FileText size={18} />
            </div>
            <span className="font-bold text-sm tracking-tight text-white hidden sm:inline">
              Azeem Office
            </span>
          </div>

          <div className="h-4 w-px bg-white/30 mx-1 hidden sm:block" />

          {/* Editable Document Title */}
          <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition-colors">
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="bg-transparent text-white text-xs font-semibold focus:outline-none w-32 sm:w-48 placeholder-white/60"
              placeholder="Document Name"
            />
            <span className="text-[10px] text-blue-200 font-mono">.pdf</span>
          </div>
        </div>

        {/* Top Right Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Switch Design Button */}
          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs bg-white/15 hover:bg-white/25 text-white rounded transition-colors"
            title="Choose a page design or start blank"
          >
            <LayoutTemplate size={13} />
            <span className="hidden md:inline">Designs &amp; Blank</span>
          </button>

          {/* Print vector PDF */}
          <button
            onClick={() => triggerPrintPDF()}
            className="flex items-center gap-1 px-2.5 py-1 text-xs bg-white/15 hover:bg-white/25 text-white rounded transition-colors"
            title="Print or Save as Vector PDF"
          >
            <Printer size={13} />
            <span className="hidden md:inline">Print</span>
          </button>

          {/* Quick Help */}
          <button
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="p-1 text-white/80 hover:text-white hover:bg-white/20 rounded transition-colors"
            title="Help & Shortcuts"
          >
            <HelpCircle size={16} />
          </button>

          {/* Download PDF Primary Button */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-[#185abd] hover:bg-blue-50 font-bold text-xs rounded shadow-xs transition-all cursor-pointer transform hover:scale-[1.02]"
            title="Download PDF"
          >
            <Download size={14} className="text-[#185abd]" />
            <span>Download PDF</span>
          </button>
        </div>
      </header>

      {/* Main Formatting Toolbar */}
      <Toolbar
        backgroundColor={backgroundColor}
        onUpdateBackgroundColor={setBackgroundColor}
        border={border}
        onOpenBorderModal={() => setIsBorderModalOpen(true)}
        onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        onOpenImageModal={() => setIsImageModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        textColor={textColor}
        onTextColorChange={setTextColor}
        fontFamily={fontFamily}
        onFontFamilyChange={setFontFamily}
        onFormat={executeFormat}
        onInsertParagraph={handleInsertParagraph}
        onInsertHeading={handleInsertHeading}
        onInsertDecorativeTitle={handleInsertDecorativeTitle}
        onUndo={() => executeFormat('undo')}
        onRedo={() => executeFormat('redo')}
      />

      {/* Interactive Page Canvas Editor */}
      <PageEditor
        editorRef={editorRef}
        pageContainerRef={pageContainerRef}
        content={content}
        onContentChange={setContent}
        backgroundColor={backgroundColor}
        textColor={textColor}
        fontFamily={fontFamily}
        fontSize={fontSize}
        border={border}
        pageSize={pageSize}
        orientation={orientation}
        images={images}
        onRemoveImage={handleRemoveImage}
        onUpdateImageWidth={handleUpdateImageWidth}
        headerText={documentTitle}
        footerText="Generated with Azeem Office"
        showPageNumber={true}
        zoom={zoom}
        onZoomChange={setZoom}
      />

      {/* Bottom Status Bar */}
      <footer className="no-print bg-white border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500 select-none z-30">
        <div className="flex items-center gap-4">
          <span>Page 1 of 1</span>
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
          <span className="hidden sm:inline">English (US)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-400">
            Design: <strong className="text-slate-600 font-semibold">{selectedTemplate.name}</strong>
          </span>
          {border.style !== 'none' && (
            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Boundary: {border.style} ({border.width}px)
            </span>
          )}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Download size={12} />
            <span>PDF Ready</span>
          </button>
        </div>
      </footer>

      {/* Modals */}
      <TemplatePickerModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
        currentTemplateId={selectedTemplate.id}
      />

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsertImage={handleInsertImage}
      />

      <BorderModal
        isOpen={isBorderModalOpen}
        onClose={() => setIsBorderModalOpen(false)}
        currentBorder={border}
        onUpdateBorder={setBorder}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        documentTitle={documentTitle}
        pageSize={pageSize}
        onDownloadPDF={handleDownloadPDF}
        onPrintPDF={triggerPrintPDF}
      />

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-blue-600" />
              Azeem Office &bull; Quick Guide
            </h3>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li>&bull; <strong>Page Designs:</strong> Click "Page Design" to start with a <strong>Blank</strong> page or select a formal template.</li>
              <li>&bull; <strong>Text &amp; Background:</strong> Adjust text size, font, text colour, and page background colour from the toolbar.</li>
              <li>&bull; <strong>Boundaries:</strong> Click "Boundaries" to add double, solid, dashed, or certificate award borders.</li>
              <li>&bull; <strong>Images:</strong> Click "Insert Image" to upload photos from your device or pick offline seals, stamps &amp; dividers.</li>
              <li>&bull; <strong>Download PDF:</strong> Click the red "Download PDF" button anytime to save your file!</li>
            </ul>
            <div className="pt-2 text-right">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
