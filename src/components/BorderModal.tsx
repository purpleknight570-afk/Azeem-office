import React, { useState } from 'react';
import { PageBorder, BorderStyle } from '../types';
import { Square, X, Check } from 'lucide-react';

interface BorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBorder: PageBorder;
  onUpdateBorder: (border: PageBorder) => void;
}

const BORDER_STYLES: { id: BorderStyle; name: string; description: string }[] = [
  { id: 'none', name: 'No Boundary', description: 'Clean borderless page' },
  { id: 'solid', name: 'Solid Line', description: 'Clean modern boundary' },
  { id: 'double', name: 'Double Line', description: 'Formal executive double border' },
  { id: 'dashed', name: 'Dashed Frame', description: 'Playful or drafted border' },
  { id: 'certificate', name: 'Certificate Frame', description: 'Classic credential award frame' },
  { id: 'modern-frame', name: 'Modern Rounded', description: 'Smooth rounded page boundary' },
];

const PRESET_COLORS = [
  '#0f172a', // Deep slate
  '#185abd', // Office blue
  '#2563eb', // Royal blue
  '#059669', // Emerald
  '#b45309', // Classic Gold/Amber
  '#dc2626', // Crimson red
  '#7c3aed', // Purple
  '#475569', // Slate gray
  '#cbd5e1', // Light silver
];

export const BorderModal: React.FC<BorderModalProps> = ({
  isOpen,
  onClose,
  currentBorder,
  onUpdateBorder,
}) => {
  const [style, setStyle] = useState<BorderStyle>(currentBorder.style);
  const [color, setColor] = useState<string>(currentBorder.color);
  const [width, setWidth] = useState<number>(currentBorder.width || 2);
  const [inset, setInset] = useState<number>(currentBorder.inset || 8);
  const [radius, setRadius] = useState<number>(currentBorder.radius || 0);

  if (!isOpen) return null;

  const handleApply = () => {
    onUpdateBorder({
      style,
      color,
      width: style === 'none' ? 0 : width,
      inset,
      radius: style === 'none' ? 0 : radius,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-xl w-full flex flex-col border border-slate-200 overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Square size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Page Boundary &amp; Border</h2>
              <p className="text-xs text-slate-500">Add stylish frames, certificates, and margins around your document</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Live Preview Box */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-100 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Live Boundary Preview</span>
            <div className="w-56 h-36 bg-white shadow-sm relative flex items-center justify-center p-3">
              {style !== 'none' && (
                <div
                  className="absolute pointer-events-none transition-all"
                  style={{
                    top: `${inset / 2}px`,
                    bottom: `${inset / 2}px`,
                    left: `${inset / 2}px`,
                    right: `${inset / 2}px`,
                    border: style === 'double'
                      ? `${Math.max(3, width)}px double ${color}`
                      : style === 'dashed'
                      ? `${width}px dashed ${color}`
                      : style === 'certificate'
                      ? `${width}px solid ${color}`
                      : `${width}px solid ${color}`,
                    borderRadius: `${radius}px`
                  }}
                >
                  {style === 'certificate' && (
                    <div 
                      className="absolute inset-1 border" 
                      style={{ borderColor: color, opacity: 0.6 }} 
                    />
                  )}
                </div>
              )}
              <span className="text-xs text-slate-400 select-none">Document Text</span>
            </div>
          </div>

          {/* Style Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Boundary Style:</label>
            <div className="grid grid-cols-3 gap-2">
              {BORDER_STYLES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setStyle(item.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    style === item.id
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-semibold text-slate-900">{item.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          {style !== 'none' && (
            <>
              {/* Color Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Boundary Color:</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        color === c ? 'scale-110 border-blue-600 ring-2 ring-blue-500/30' : 'border-white hover:scale-105'
                      }`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                  <div className="flex items-center gap-1.5 ml-2">
                    <span className="text-xs text-slate-500 font-medium">Custom:</span>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-7 h-7 rounded cursor-pointer border border-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span className="font-semibold">Border Width:</span>
                    <span className="font-mono">{width}px</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span className="font-semibold">Page Inset (Distance):</span>
                    <span className="font-mono">{inset}mm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    value={inset}
                    onChange={(e) => setInset(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span className="font-semibold">Corner Curvature:</span>
                    <span className="font-mono">{radius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <Check size={14} />
            Apply Boundary
          </button>
        </div>
      </div>
    </div>
  );
};
