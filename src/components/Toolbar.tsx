import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Image as ImageIcon,
  Square, Palette, Type, Download, LayoutTemplate,
  ChevronDown, RotateCcw, RotateCw, Highlighter
} from 'lucide-react';
import { PageBorder } from '../types';

interface ToolbarProps {
  // Page / Document properties
  backgroundColor: string;
  onUpdateBackgroundColor: (color: string) => void;
  border: PageBorder;
  onOpenBorderModal: () => void;
  onOpenTemplateModal: () => void;
  onOpenImageModal: () => void;
  onOpenExportModal: () => void;

  // Typography & Editing actions
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
  fontFamily: string;
  onFontFamilyChange: (font: string) => void;
  onFormat: (command: string, value?: string) => void;
  onInsertParagraph: () => void;
  onInsertHeading: (level: 'h1' | 'h2' | 'h3' | 'p') => void;
  onInsertDecorativeTitle: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

const FONT_FAMILIES = [
  { name: 'Calibri / Modern Sans', value: 'Calibri, Plus Jakarta Sans, sans-serif' },
  { name: 'Times New Roman / Formal', value: '"Times New Roman", Times, serif' },
  { name: 'Arial / Clean', value: 'Arial, Helvetica, sans-serif' },
  { name: 'Georgia / Elegant Serif', value: 'Georgia, serif' },
  { name: 'Merriweather / Editorial', value: 'Merriweather, Georgia, serif' },
  { name: 'EB Garamond / Classic', value: '"EB Garamond", Garamond, serif' },
  { name: 'JetBrains Mono / Code', value: '"JetBrains Mono", monospace' },
];

const FONT_SIZES = [9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

const TEXT_COLORS = [
  '#000000', '#1e293b', '#185abd', '#2563eb', 
  '#dc2626', '#16a34a', '#b45309', '#7c3aed', '#64748b'
];

const BG_PRESETS = [
  { name: 'Pure White', color: '#ffffff' },
  { name: 'Warm Cream', color: '#fffdf5' },
  { name: 'Vintage Parchment', color: '#faf6eb' },
  { name: 'Soft Sage', color: '#f0fdf4' },
  { name: 'Ice Blue', color: '#f0f9ff' },
  { name: 'Lavender Tint', color: '#faf5ff' },
  { name: 'Light Slate', color: '#f8fafc' },
];

export const Toolbar: React.FC<ToolbarProps> = ({
  backgroundColor,
  onUpdateBackgroundColor,
  border,
  onOpenBorderModal,
  onOpenTemplateModal,
  onOpenImageModal,
  onOpenExportModal,
  fontSize,
  onFontSizeChange,
  textColor,
  onTextColorChange,
  fontFamily,
  onFontFamilyChange,
  onFormat,
  onInsertParagraph,
  onInsertHeading,
  onInsertDecorativeTitle,
  onUndo,
  onRedo,
}) => {
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs px-3 py-2 select-none z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-1.5 justify-between">
        {/* Left Section: Templates & History */}
        <div className="flex items-center gap-1">
          {/* Change Design / Template Button */}
          <button
            onClick={onOpenTemplateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100/80 rounded-lg text-xs font-semibold transition-colors border border-blue-200"
            title="Choose or switch page design (including Blank)"
          >
            <LayoutTemplate size={14} />
            <span>Page Design</span>
          </button>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          {/* Undo / Redo */}
          <button
            onClick={onUndo}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={onRedo}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw size={14} />
          </button>
        </div>

        {/* Center Section: Typography & Styles */}
        <div className="flex items-center gap-1 flex-wrap">
          {/* Headings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowHeadingMenu(!showHeadingMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200"
              title="Heading styles"
            >
              <Type size={13} className="text-blue-600" />
              <span>Heading</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {showHeadingMenu && (
              <div 
                className="absolute left-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in"
                onMouseLeave={() => setShowHeadingMenu(false)}
              >
                <button
                  onClick={() => { onInsertHeading('h1'); setShowHeadingMenu(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 font-bold"
                >
                  Heading 1 (Main Title)
                </button>
                <button
                  onClick={() => { onInsertHeading('h2'); setShowHeadingMenu(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 font-semibold"
                >
                  Heading 2 (Section)
                </button>
                <button
                  onClick={() => { onInsertHeading('h3'); setShowHeadingMenu(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 font-medium"
                >
                  Heading 3 (Sub-section)
                </button>
                <button
                  onClick={() => { onInsertHeading('p'); setShowHeadingMenu(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600"
                >
                  Normal Paragraph
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => { onInsertDecorativeTitle(); setShowHeadingMenu(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-50 font-semibold"
                >
                  + Decorative Banner Title
                </button>
              </div>
            )}
          </div>

          {/* Font Family */}
          <select
            value={fontFamily}
            onChange={(e) => onFontFamilyChange(e.target.value)}
            className="text-xs px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 max-w-[140px] focus:outline-none focus:ring-1 focus:ring-blue-500"
            title="Font family"
          >
            {FONT_FAMILIES.map(f => (
              <option key={f.value} value={f.value}>{f.name}</option>
            ))}
          </select>

          {/* Font Size */}
          <div className="flex items-center">
            <select
              value={fontSize}
              onChange={(e) => onFontSizeChange(Number(e.target.value))}
              className="text-xs px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              title="Font size"
            >
              {FONT_SIZES.map(s => (
                <option key={s} value={s}>{s} pt</option>
              ))}
            </select>
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          {/* Bold, Italic, Underline, Strikethrough */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/70 p-0.5">
            <button
              onClick={() => onFormat('bold')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Bold (Ctrl+B)"
            >
              <Bold size={13} />
            </button>
            <button
              onClick={() => onFormat('italic')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Italic (Ctrl+I)"
            >
              <Italic size={13} />
            </button>
            <button
              onClick={() => onFormat('underline')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Underline (Ctrl+U)"
            >
              <Underline size={13} />
            </button>
            <button
              onClick={() => onFormat('strikeThrough')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Strikethrough"
            >
              <Strikethrough size={13} />
            </button>
          </div>

          {/* Text Colour Picker */}
          <div className="relative">
            <button
              onClick={() => {
                setShowTextColorPicker(!showTextColorPicker);
                setShowBgColorPicker(false);
              }}
              className="flex items-center gap-1 p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Colour of text"
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-xs leading-none">A</span>
                <span 
                  className="w-3.5 h-1 rounded-full mt-0.5" 
                  style={{ backgroundColor: textColor }} 
                />
              </div>
              <ChevronDown size={10} className="text-slate-400" />
            </button>

            {showTextColorPicker && (
              <div 
                className="absolute left-0 mt-1 p-2.5 bg-white rounded-lg shadow-xl border border-slate-200 z-40 w-48"
                onMouseLeave={() => setShowTextColorPicker(false)}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Text Colour:</span>
                <div className="grid grid-cols-5 gap-1.5 mb-2">
                  {TEXT_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        onTextColorChange(c);
                        setShowTextColorPicker(false);
                      }}
                      className="w-6 h-6 rounded-md border border-slate-200 hover:scale-110 transition-transform"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-xs text-slate-600">Custom:</span>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => onTextColorChange(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Text Highlight */}
          <button
            onClick={() => onFormat('hiliteColor', '#fef08a')}
            className="p-1.5 text-slate-700 hover:bg-yellow-50 hover:text-amber-700 rounded-lg border border-slate-200 transition-colors"
            title="Highlight text"
          >
            <Highlighter size={14} />
          </button>

          {/* Background Colour Picker */}
          <div className="relative">
            <button
              onClick={() => {
                setShowBgColorPicker(!showBgColorPicker);
                setShowTextColorPicker(false);
              }}
              className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Page Background Colour"
            >
              <Palette size={13} className="text-amber-600" />
              <div 
                className="w-3.5 h-3.5 rounded border border-slate-300"
                style={{ backgroundColor }}
              />
              <span className="hidden sm:inline">Page Color</span>
              <ChevronDown size={10} className="text-slate-400" />
            </button>

            {showBgColorPicker && (
              <div 
                className="absolute left-0 mt-1 p-3 bg-white rounded-lg shadow-xl border border-slate-200 z-40 w-52"
                onMouseLeave={() => setShowBgColorPicker(false)}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Page Background Colour:</span>
                <div className="space-y-1 mb-2">
                  {BG_PRESETS.map(preset => (
                    <button
                      key={preset.color}
                      onClick={() => {
                        onUpdateBackgroundColor(preset.color);
                        setShowBgColorPicker(false);
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-slate-100 text-slate-700"
                    >
                      <span 
                        className="w-4 h-4 rounded border border-slate-300 shrink-0" 
                        style={{ backgroundColor: preset.color }} 
                      />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-xs text-slate-600">Custom Canvas:</span>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => onUpdateBackgroundColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          {/* Paragraph Alignment */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/70 p-0.5">
            <button
              onClick={() => onFormat('justifyLeft')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Align Left"
            >
              <AlignLeft size={13} />
            </button>
            <button
              onClick={() => onFormat('justifyCenter')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Align Center"
            >
              <AlignCenter size={13} />
            </button>
            <button
              onClick={() => onFormat('justifyRight')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Align Right"
            >
              <AlignRight size={13} />
            </button>
            <button
              onClick={() => onFormat('justifyFull')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Justify"
            >
              <AlignJustify size={13} />
            </button>
          </div>

          {/* Bulleted & Numbered Lists */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/70 p-0.5">
            <button
              onClick={() => onFormat('insertUnorderedList')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Bullet List"
            >
              <List size={13} />
            </button>
            <button
              onClick={() => onFormat('insertOrderedList')}
              className="p-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded transition-colors"
              title="Numbered List"
            >
              <ListOrdered size={13} />
            </button>
          </div>

          {/* Add Paragraph Shortcut */}
          <button
            onClick={onInsertParagraph}
            className="px-2 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 font-medium"
            title="Make a new paragraph"
          >
            + Paragraph
          </button>

          {/* Boundary / Border Button */}
          <button
            onClick={onOpenBorderModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              border.style !== 'none'
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
            title="Configure page boundaries and borders"
          >
            <Square size={13} className={border.style !== 'none' ? 'text-amber-600' : 'text-slate-500'} />
            <span>Boundaries</span>
            {border.style !== 'none' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            )}
          </button>

          {/* Insert Images (Device or Offline) */}
          <button
            onClick={onOpenImageModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg text-xs font-semibold border border-emerald-300 transition-colors"
            title="Insert images from device or offline library"
          >
            <ImageIcon size={14} className="text-emerald-600" />
            <span>Insert Image</span>
          </button>
        </div>

        {/* Right Section: Prominent "Download PDF" Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
            title="Download your document as PDF"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
