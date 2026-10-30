import React, { useState } from 'react';
import { PageTemplate } from '../types';
import { PAGE_TEMPLATES } from '../data/templates';
import { FilePlus, Sparkles, X, Check, ArrowRight } from 'lucide-react';

interface TemplatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: PageTemplate) => void;
  currentTemplateId?: string;
  isFirstOpen?: boolean;
}

export const TemplatePickerModal: React.FC<TemplatePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  currentTemplateId,
  isFirstOpen = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Blank', 'Professional', 'Creative', 'Formal'];

  const filteredTemplates = selectedCategory === 'All'
    ? PAGE_TEMPLATES
    : PAGE_TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles size={18} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {isFirstOpen ? 'Choose a Page Design to Begin' : 'Select a Page Design'}
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Pick a layout to start writing. You can choose <strong>Blank</strong> or a designed template, then customize colors, boundaries, text, and images.
            </p>
          </div>
          {!isFirstOpen && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
              title="Close"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-100 bg-white">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">Filter:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat === 'Blank' ? 'Blank Page' : cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-slate-50/50">
          {filteredTemplates.map(template => {
            const isBlank = template.id === 'blank';
            const isSelected = currentTemplateId === template.id;

            return (
              <div
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className={`group relative flex flex-col rounded-xl border-2 transition-all cursor-pointer overflow-hidden bg-white hover:shadow-lg ${
                  isBlank 
                    ? 'border-blue-500 shadow-sm ring-2 ring-blue-500/20' 
                    : isSelected
                    ? 'border-blue-600 shadow-md'
                    : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                {/* Visual Page Preview Thumbnail */}
                <div 
                  className="h-44 w-full p-4 flex flex-col justify-between relative overflow-hidden transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: template.backgroundColor }}
                >
                  {/* Boundary Preview */}
                  <div 
                    className="absolute inset-3 pointer-events-none transition-all"
                    style={{
                      border: template.border.style === 'none' 
                        ? '1px dashed #e2e8f0' 
                        : template.border.style === 'double'
                        ? `3px double ${template.border.color}`
                        : template.border.style === 'certificate'
                        ? `3px solid ${template.border.color}`
                        : `${template.border.width || 2}px solid ${template.border.color}`,
                      borderRadius: `${template.border.radius}px`
                    }}
                  >
                    {template.border.style === 'certificate' && (
                      <div className="absolute inset-1 border border-amber-600/50" />
                    )}
                  </div>

                  {/* Thumbnail Content Mock */}
                  <div className="relative z-10 space-y-2">
                    {isBlank ? (
                      <div className="h-full flex flex-col items-center justify-center pt-8 text-center">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                          <FilePlus size={20} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">Clean Canvas</span>
                        <span className="text-[10px] text-slate-400">Zero prefilled text</span>
                      </div>
                    ) : (
                      <>
                        <div 
                          className="h-3 w-2/3 rounded" 
                          style={{ backgroundColor: template.accentColor }} 
                        />
                        <div className="h-1.5 w-full bg-slate-300/60 rounded" />
                        <div className="h-1.5 w-4/5 bg-slate-300/60 rounded" />
                        <div className="h-1.5 w-3/4 bg-slate-300/60 rounded" />
                      </>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="relative z-10 flex items-center justify-between mt-auto">
                    {isBlank && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                        Default
                      </span>
                    )}
                    <span 
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/80 backdrop-blur-xs text-slate-700 shadow-2xs ml-auto"
                    >
                      {template.category}
                    </span>
                  </div>
                </div>

                {/* Template Info Card */}
                <div className="p-4 flex-1 flex flex-col justify-between border-t border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                      {template.name}
                      {isSelected && <Check size={16} className="text-blue-600" />}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    <span>{isBlank ? 'Start with Blank' : 'Use this Design'}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>You can switch page designs or customize colors &amp; boundaries at any time.</span>
          <button
            onClick={() => onSelectTemplate(PAGE_TEMPLATES[0])}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <FilePlus size={15} />
            Quick Start with Blank
          </button>
        </div>
      </div>
    </div>
  );
};
