import React, { useState } from 'react';
import { Download, Printer, CheckCircle, FileText, X, Loader2 } from 'lucide-react';
import { PageSize } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  pageSize: PageSize;
  onDownloadPDF: (filename: string, size: PageSize, quality: number) => Promise<boolean>;
  onPrintPDF: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  documentTitle,
  pageSize: initialPageSize,
  onDownloadPDF,
  onPrintPDF,
}) => {
  const [filename, setFilename] = useState<string>(
    documentTitle.replace(/\.[^/.]+$/, '') || 'azeem-document'
  );
  const [size, setSize] = useState<PageSize>(initialPageSize);
  const [quality, setQuality] = useState<number>(2);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsExporting(true);
    setSuccess(false);

    try {
      const cleanName = filename.trim() || 'document';
      const result = await onDownloadPDF(cleanName, size, quality);
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1800);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full flex flex-col border border-slate-200 overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <Download size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Download Document as PDF</h2>
              <p className="text-xs text-slate-500">Export high-resolution, print-ready PDF file to your device</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isExporting}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {success ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">PDF Download Complete!</h3>
              <p className="text-xs text-slate-500 mt-1">Your document has been generated and saved to your device.</p>
            </div>
          ) : (
            <>
              {/* Filename */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  PDF Filename:
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                    placeholder="my-document"
                  />
                  <span className="bg-slate-100 border border-l-0 border-slate-300 text-slate-500 px-3 py-2 rounded-r-lg text-xs font-mono">
                    .pdf
                  </span>
                </div>
              </div>

              {/* Page Format & Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Paper Size:
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as PageSize)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="a4">A4 (210 &times; 297 mm)</option>
                    <option value="letter">US Letter (8.5 &times; 11 in)</option>
                    <option value="legal">US Legal (8.5 &times; 14 in)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Rendering Resolution:
                  </label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value={2}>High Resolution (2x DPI)</option>
                    <option value={3}>Ultra-Sharp Print (3x DPI)</option>
                    <option value={1}>Standard (Fast)</option>
                  </select>
                </div>
              </div>

              {/* Two Download / Print Action Options */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {isExporting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Generating PDF File...</span>
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      <span>Download PDF File Now</span>
                    </>
                  )}
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-[11px] text-slate-400 uppercase tracking-wider">or</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onPrintPDF();
                  }}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Print Directly / Vector "Save as PDF"</span>
                </button>
              </div>

              <div className="bg-blue-50/60 rounded-lg p-3 border border-blue-100 text-[11px] text-blue-800 flex items-start gap-2">
                <FileText size={15} className="shrink-0 mt-0.5 text-blue-600" />
                <span>
                  The downloaded PDF preserves your custom text sizes, text colors, background color, boundaries, paragraphs, headings, and images.
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
