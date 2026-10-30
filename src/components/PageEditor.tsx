import React, { useRef, useEffect } from 'react';
import { PageBorder, DocumentImage, PageSize, PageOrientation } from '../types';
import { Trash2, Move, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface PageEditorProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  pageContainerRef: React.RefObject<HTMLDivElement | null>;
  content: string;
  onContentChange: (newHtml: string) => void;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  border: PageBorder;
  pageSize: PageSize;
  orientation: PageOrientation;
  images: DocumentImage[];
  onRemoveImage: (id: string) => void;
  onUpdateImageWidth: (id: string, newWidth: number) => void;
  headerText?: string;
  footerText?: string;
  showPageNumber?: boolean;
  watermarkText?: string;
  watermarkOpacity?: number;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({
  editorRef,
  pageContainerRef,
  content,
  onContentChange,
  backgroundColor,
  textColor,
  fontFamily,
  fontSize,
  border,
  pageSize,
  orientation,
  images,
  onRemoveImage,
  onUpdateImageWidth,
  headerText,
  footerText,
  showPageNumber = true,
  watermarkText,
  watermarkOpacity = 0.08,
  zoom,
  onZoomChange,
}) => {
  const isUpdatingRef = useRef(false);

  // Sync initial content or template change into contentEditable
  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== content) {
        editorRef.current.innerHTML = content;
      }
    }
  }, [content, editorRef]);

  const handleInput = () => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      onContentChange(editorRef.current.innerHTML);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  };

  // Calculate paper dimensions in pixels based on standard A4 (210mm x 297mm) or Letter (8.5in x 11in)
  // At 96 DPI: A4 is ~794px x 1123px; Letter is ~816px x 1056px
  const isA4 = pageSize === 'a4';
  const isLandscape = orientation === 'landscape';

  const baseWidth = isA4 ? 794 : 816;
  const baseHeight = isA4 ? 1123 : 1056;

  const pageWidth = isLandscape ? baseHeight : baseWidth;
  const pageMinHeight = isLandscape ? baseWidth : baseHeight;

  // Margin inset for boundary
  const borderInsetPx = (border.inset || 0) * 3.78; // convert mm to approx px

  return (
    <div className="flex-1 bg-[#edebe9] overflow-auto flex flex-col items-center p-6 md:p-10 relative">
      {/* Zoom / View Bar */}
      <div className="sticky top-2 z-20 mb-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-200/80 flex items-center gap-2 text-xs select-none">
        <button
          onClick={() => onZoomChange(Math.max(50, zoom - 10))}
          className="p-1 hover:bg-slate-100 rounded-full text-slate-600 hover:text-slate-900 transition-colors"
          title="Zoom out"
        >
          <ZoomOut size={13} />
        </button>
        <span className="font-mono text-slate-700 min-w-[42px] text-center font-medium">
          {zoom}%
        </span>
        <button
          onClick={() => onZoomChange(Math.min(175, zoom + 10))}
          className="p-1 hover:bg-slate-100 rounded-full text-slate-600 hover:text-slate-900 transition-colors"
          title="Zoom in"
        >
          <ZoomIn size={13} />
        </button>
        <div className="w-px h-3.5 bg-slate-200" />
        <button
          onClick={() => onZoomChange(100)}
          className="px-2 py-0.5 hover:bg-slate-100 rounded text-[11px] text-slate-600 font-medium"
          title="Reset zoom to 100%"
        >
          Fit 100%
        </button>
      </div>

      {/* The Printable Page Sheet */}
      <div
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
          transition: 'transform 0.1s ease-out',
        }}
        className="mb-20"
      >
        <div
          ref={pageContainerRef}
          id="office-printable-document"
          onClick={(e) => {
            // If clicking empty space on the paper, focus editor
            if (editorRef.current && (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'DIV')) {
              editorRef.current.focus();
            }
          }}
          className="office-sheet-page office-page-shadow relative flex flex-col transition-colors cursor-text select-text"
          style={{
            width: `${pageWidth}px`,
            minHeight: `${pageMinHeight}px`,
            backgroundColor: backgroundColor || '#ffffff',
            color: textColor || '#1e293b',
            fontFamily: fontFamily || 'Calibri, sans-serif',
            fontSize: `${fontSize}pt`,
            padding: '48px 56px',
            boxSizing: 'border-box',
          }}
        >
          {/* Watermark Overlay (if active) */}
          {watermarkText && (
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden select-none z-0"
              style={{ opacity: watermarkOpacity }}
            >
              <span
                className="font-black text-slate-900 tracking-widest text-center"
                style={{
                  fontSize: '76pt',
                  transform: 'rotate(-45deg)',
                  whiteSpace: 'nowrap',
                }}
              >
                {watermarkText}
              </span>
            </div>
          )}

          {/* Boundaries & Borders Frame (if enabled) */}
          {border.style !== 'none' && (
            <div
              className="absolute pointer-events-none transition-all z-10"
              style={{
                top: `${borderInsetPx}px`,
                bottom: `${borderInsetPx}px`,
                left: `${borderInsetPx}px`,
                right: `${borderInsetPx}px`,
                border: border.style === 'double'
                  ? `${Math.max(4, border.width)}px double ${border.color}`
                  : border.style === 'dashed'
                  ? `${border.width}px dashed ${border.color}`
                  : `${border.width}px solid ${border.color}`,
                borderRadius: `${border.radius}px`,
              }}
            >
              {/* Extra inner line for certificate award style */}
              {border.style === 'certificate' && (
                <div
                  className="absolute inset-1.5 border"
                  style={{
                    borderColor: border.color,
                    opacity: 0.6,
                    borderRadius: `${Math.max(0, border.radius - 2)}px`,
                  }}
                />
              )}
            </div>
          )}

          {/* Page Header */}
          {headerText && (
            <div className="relative z-10 border-b border-slate-300/60 pb-2 mb-6 flex justify-between items-center text-xs text-slate-400 select-none">
              <span>{headerText}</span>
              <span>Azeem Office Document</span>
            </div>
          )}

          {/* Inserted Images Section (if user added images from device/offline) */}
          {images && images.length > 0 && (
            <div className="relative z-10 space-y-4 mb-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  className={`relative group flex ${
                    img.alignment === 'center'
                      ? 'justify-center'
                      : img.alignment === 'right'
                      ? 'justify-end'
                      : img.alignment === 'full'
                      ? 'w-full'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className="relative group/card"
                    style={{
                      width: img.alignment === 'full' ? '100%' : `${img.width}%`,
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full object-contain transition-all ${
                        img.border ? 'border-2 border-slate-300' : ''
                      }`}
                      style={{
                        borderRadius: `${img.borderRadius || 0}px`,
                      }}
                    />

                    {/* Image Action Overlay (Hover) */}
                    <div className="no-print absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity bg-black/75 backdrop-blur-xs text-white rounded-lg p-1 flex items-center gap-1 shadow-md">
                      <button
                        onClick={() => onUpdateImageWidth(img.id, Math.max(20, img.width - 10))}
                        className="px-1.5 py-0.5 text-xs hover:bg-white/20 rounded font-mono"
                        title="Shrink image"
                      >
                        -
                      </button>
                      <span className="text-[10px] font-mono px-1">{img.width}%</span>
                      <button
                        onClick={() => onUpdateImageWidth(img.id, Math.min(100, img.width + 10))}
                        className="px-1.5 py-0.5 text-xs hover:bg-white/20 rounded font-mono"
                        title="Enlarge image"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveImage(img.id)}
                        className="p-1 text-red-300 hover:text-red-100 hover:bg-red-600/60 rounded"
                        title="Delete image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    {img.alt && (
                      <p className="text-center text-[11px] text-slate-500 italic mt-1">
                        {img.alt}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Main Editable Content Canvas */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            className="office-document-content relative z-10 flex-1 outline-none min-h-[550px] w-full cursor-text select-text focus:outline-none"
            style={{
              color: textColor,
              fontFamily: fontFamily,
              fontSize: `${fontSize}pt`,
            }}
          />

          {/* Page Footer & Page Numbering */}
          <div className="relative z-10 mt-auto pt-6 border-t border-slate-300/40 flex justify-between items-center text-xs text-slate-400 select-none">
            <span>{footerText || 'Created with Azeem Office'}</span>
            {showPageNumber && (
              <span className="font-mono text-[11px]">Page 1 of 1</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
