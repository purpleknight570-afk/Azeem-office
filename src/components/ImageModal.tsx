import React, { useState, useRef } from 'react';
import { DocumentImage } from '../types';
import { OFFLINE_IMAGES } from '../data/offlineImages';
import { Upload, Image as ImageIcon, X, Check, Sparkles } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertImage: (image: DocumentImage) => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  onInsertImage,
}) => {
  const [activeTab, setActiveTab] = useState<'device' | 'offline'>('device');
  const [selectedOffline, setSelectedOffline] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [altText, setAltText] = useState<string>('Document Image');
  const [width, setWidth] = useState<number>(60); // 60%
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'full'>('center');
  const [roundedCorners, setRoundedCorners] = useState<boolean>(true);
  const [hasBorder, setHasBorder] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewSrc(event.target.result as string);
          setAltText(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewSrc(event.target.result as string);
          setAltText(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsert = () => {
    const srcToUse = activeTab === 'device' ? previewSrc : selectedOffline;
    if (!srcToUse) return;

    const newImage: DocumentImage = {
      id: `img-${Date.now()}`,
      src: srcToUse,
      alt: altText || 'Document illustration',
      width: width,
      alignment: alignment,
      borderRadius: roundedCorners ? 8 : 0,
      border: hasBorder,
    };

    onInsertImage(newImage);
    // Reset state & close
    setPreviewSrc(null);
    setSelectedOffline(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <ImageIcon size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Insert Image</h2>
              <p className="text-xs text-slate-500">Upload an image from your device or pick from offline catalog</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white">
          <button
            onClick={() => setActiveTab('device')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'device'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload size={14} />
            From Your Device
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'offline'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles size={14} />
            Offline Library (Stamps, Dividers, Seals)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'device' ? (
            <div className="space-y-4">
              {!previewSrc ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/30 group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={22} />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-800">
                    Click to browse or drag &amp; drop your image
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports JPG, PNG, WEBP, SVG, and GIF from your device
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-center max-h-56 overflow-hidden">
                    <img
                      src={previewSrc}
                      alt="Device upload preview"
                      className="max-h-52 object-contain rounded"
                    />
                    <button
                      onClick={() => setPreviewSrc(null)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Image Description / Caption:</label>
                    <input
                      type="text"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Company Logo or Architecture Diagram"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {OFFLINE_IMAGES.map((group) => (
                <div key={group.category} className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {group.category}
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {group.items.map((item) => {
                      const isSelected = selectedOffline === item.svgUrl;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedOffline(item.svgUrl);
                            setAltText(item.name);
                          }}
                          className={`border rounded-lg p-3 cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-blue-300 bg-white'
                          }`}
                        >
                          <div className="h-16 w-full flex items-center justify-center mb-2">
                            <img
                              src={item.svgUrl}
                              alt={item.name}
                              className="max-h-14 max-w-full object-contain"
                            />
                          </div>
                          <span className="text-[11px] font-medium text-slate-800 line-clamp-1">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sizing & Formatting Controls */}
          {(previewSrc || selectedOffline) && (
            <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Image Size: {width}%
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Alignment:
                </label>
                <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs">
                  {(['left', 'center', 'right', 'full'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => setAlignment(align)}
                      className={`flex-1 py-1.5 capitalize transition-colors ${
                        alignment === align
                          ? 'bg-blue-600 text-white font-medium'
                          : 'bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-2 flex items-center gap-6 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roundedCorners}
                    onChange={(e) => setRoundedCorners(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <span>Rounded Corners</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBorder}
                    onChange={(e) => setHasBorder(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <span>Subtle Border Frame</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!previewSrc && !selectedOffline}
            className={`px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all ${
              previewSrc || selectedOffline
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check size={14} />
            Insert into PDF
          </button>
        </div>
      </div>
    </div>
  );
};
